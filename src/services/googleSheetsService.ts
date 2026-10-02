import { Order, Product, PaymentStatus } from '../types';

export interface DriveSpreadsheet {
  id: string;
  name: string;
  modifiedTime?: string;
  webViewLink?: string;
}

const SHEETS_API_BASE = 'https://sheets.googleapis.com/v4/spreadsheets';
const DRIVE_API_BASE = 'https://www.googleapis.com/drive/v3/files';

/**
 * Chuẩn hóa trạng thái thanh toán đơn hàng:
 * Luôn trả về đúng 1 trong 2 giá trị: "Chưa thanh toán" hoặc "Đã thanh toán".
 * Tuyệt đối không để giá trị "pending", không để trống.
 */
export const normalizePaymentStatus = (status?: string): PaymentStatus => {
  if (!status) return 'Chưa thanh toán';
  const clean = status.trim().toLowerCase();
  if (clean === 'đã thanh toán' || clean === 'completed') {
    return 'Đã thanh toán';
  }
  return 'Chưa thanh toán';
};

/**
 * Danh sách 12 cột chuẩn hóa trên Google Sheets (Cột K = Trạng Thái)
 */
export const ORDER_SHEET_HEADERS = [
  'Mã Đơn Hàng',            // Cột A
  'Thời Gian Đặt',           // Cột B
  'Tên Khách Hàng',         // Cột C
  'Số Điện Thoại',          // Cột D
  'Địa Chỉ Giao Hàng',       // Cột E
  'Chi Tiết Sản Phẩm',       // Cột F
  'Tạm Tính',               // Cột G
  'Phí Giao Hàng',          // Cột H
  'Tổng Tiền',              // Cột I
  'Phương Thức Thanh Toán',  // Cột J
  'Trạng Thái',             // Cột K (Chỉ 2 lựa chọn: Chưa thanh toán / Đã thanh toán)
  'Ghi Chú Đơn Hàng',       // Cột L
];

/**
 * Thiết lập Dropdown (Data Validation) cho cột K ("Trạng Thái") trên Google Sheets
 */
export const applyStatusDataValidation = async (
  accessToken: string,
  spreadsheetId: string,
  sheetId: number = 0
): Promise<void> => {
  const url = `${SHEETS_API_BASE}/${spreadsheetId}:batchUpdate`;
  const body = {
    requests: [
      {
        setDataValidation: {
          range: {
            sheetId,
            startRowIndex: 1, // Bắt đầu từ dòng 2 (bỏ qua dòng tiêu đề A1:L1)
            endRowIndex: 1000,
            startColumnIndex: 10, // Cột K (0-indexed: A=0, ..., K=10, L=11)
            endColumnIndex: 11,
          },
          rule: {
            condition: {
              type: 'ONE_OF_LIST',
              values: [
                { userEnteredValue: 'Chưa thanh toán' },
                { userEnteredValue: 'Đã thanh toán' },
              ],
            },
            inputMessage: 'Trạng thái đơn: Chọn "Chưa thanh toán" hoặc "Đã thanh toán"',
            strict: true,
            showCustomUi: true,
          },
        },
      },
    ],
  };

  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.warn('Lỗi cấu hình dropdown xác thực dữ liệu trên Sheets:', err);
  }
};

/**
 * List existing spreadsheets from user's Google Drive
 */
export const listSpreadsheets = async (accessToken: string): Promise<DriveSpreadsheet[]> => {
  const query = encodeURIComponent("mimeType='application/vnd.google-apps.spreadsheet' and trashed=false");
  const res = await fetch(`${DRIVE_API_BASE}?q=${query}&orderBy=modifiedTime desc&pageSize=15&fields=files(id,name,modifiedTime,webViewLink)`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Lỗi tải danh sách Google Sheets: ${errorText}`);
  }

  const data = await res.json();
  return data.files || [];
};

/**
 * Create a new standardized Google Spreadsheet for Mộc Điều
 */
export const createMocDieuSpreadsheet = async (
  accessToken: string,
  customTitle?: string
): Promise<{ spreadsheetId: string; spreadsheetUrl: string }> => {
  const title = customTitle || `Mộc Điều - Quản Lý Đơn Hàng & Kho Hạt Điều (${new Date().toLocaleDateString('vi-VN')})`;

  const payload = {
    properties: {
      title,
    },
    sheets: [
      {
        properties: {
          title: 'Đơn Hàng',
          gridProperties: { rowCount: 100, columnCount: 12, frozenRowCount: 1 },
        },
      },
      {
        properties: {
          title: 'Sản Phẩm',
          gridProperties: { rowCount: 50, columnCount: 9, frozenRowCount: 1 },
        },
      },
    ],
  };

  const res = await fetch(SHEETS_API_BASE, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Không thể tạo bảng tính: ${err}`);
  }

  const result = await res.json();
  const spreadsheetId = result.spreadsheetId;
  const spreadsheetUrl = result.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;

  // Add Headers with styling
  const orderHeaders = ORDER_SHEET_HEADERS;

  const productHeaders = [
    'Mã SP',
    'Tên Sản Phẩm',
    'Slug',
    'Khối Lượng',
    'Giá Bán (VND)',
    'Giá Khuyến Mãi (VND)',
    'Tồn Kho',
    'Danh Mục',
    'Nổi Bật',
  ];

  await updateSheetValues(accessToken, spreadsheetId, 'Đơn Hàng!A1:L1', [orderHeaders]);
  await updateSheetValues(accessToken, spreadsheetId, 'Sản Phẩm!A1:I1', [productHeaders]);

  // Áp dụng ngay quy tắc Dropdown xác thực cho cột K (Trạng Thái)
  await applyStatusDataValidation(accessToken, spreadsheetId);

  return { spreadsheetId, spreadsheetUrl };
};

/**
 * Append a newly placed customer order to Google Sheets
 * Đảm bảo: Cột "Trạng Thái" (Cột K) của đơn mới luôn tự động có giá trị: "Chưa thanh toán"
 * Tuyệt đối không để giá trị "pending", không để trống.
 */
export const appendOrderToSheet = async (
  accessToken: string,
  spreadsheetId: string,
  order: Order
): Promise<void> => {
  const itemsSummary = order.items
    .map(item => `${item.productName} (${item.weight}) x${item.quantity}`)
    .join('; ');

  // Luôn đảm bảo giá trị ghi vào cột K là "Chưa thanh toán" (hoặc "Đã thanh toán" nếu nhân viên đã xác nhận)
  const paymentStatus = normalizePaymentStatus(order.status);

  const rowData = [
    order.orderCode,
    new Date(order.createdAt).toLocaleString('vi-VN'),
    order.customerName,
    order.phone,
    `${order.address}${order.province ? `, ${order.province}` : ''}`,
    itemsSummary,
    order.subtotal,
    order.shippingFee,
    order.total,
    order.paymentMethod === 'cod' ? 'COD (Thanh toán khi nhận)' : 'Chuyển khoản VietQR',
    paymentStatus, // Cột K = Trạng Thái (Mặc định: "Chưa thanh toán")
    order.note || '',
  ];

  const url = `${SHEETS_API_BASE}/${spreadsheetId}/values/Đơn Hàng!A:L:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values: [rowData] }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.warn(`Không thể ghi đơn vào Google Sheets: ${err}`);
  }
};

/**
 * Sync all current orders to Google Sheets
 * Đồng bộ tất cả đơn hàng, chuyển đổi an toàn các đơn cũ (pending -> Chưa thanh toán)
 */
export const syncAllOrdersToSheet = async (
  accessToken: string,
  spreadsheetId: string,
  orders: Order[]
): Promise<void> => {
  const rows = orders.map(order => [
    order.orderCode,
    new Date(order.createdAt).toLocaleString('vi-VN'),
    order.customerName,
    order.phone,
    `${order.address}${order.province ? `, ${order.province}` : ''}`,
    order.items.map(item => `${item.productName} (${item.weight}) x${item.quantity}`).join('; '),
    order.subtotal,
    order.shippingFee,
    order.total,
    order.paymentMethod === 'cod' ? 'COD (Nhận hàng thanh toán)' : 'Chuyển khoản VietQR',
    normalizePaymentStatus(order.status), // Cột K = Trạng Thái ("Chưa thanh toán" / "Đã thanh toán")
    order.note || '',
  ]);

  const headerRow = ORDER_SHEET_HEADERS;
  const allValues = [headerRow, ...rows];

  await updateSheetValues(accessToken, spreadsheetId, `Đơn Hàng!A1:L${allValues.length}`, allValues);

  // Đảm bảo Dropdown 2 lựa chọn (Chưa thanh toán / Đã thanh toán) được thiết lập trên Cột K
  await applyStatusDataValidation(accessToken, spreadsheetId);
};

/**
 * Export product catalog to Google Sheets
 */
export const syncProductsToSheet = async (
  accessToken: string,
  spreadsheetId: string,
  products: Product[]
): Promise<void> => {
  const header = [
    'Mã SP',
    'Tên Sản Phẩm',
    'Slug',
    'Khối Lượng',
    'Giá Bán (VND)',
    'Giá Khuyến Mãi (VND)',
    'Tồn Kho',
    'Danh Mục',
    'Nổi Bật',
  ];

  const rows = products.map(p => [
    p.id,
    p.name,
    p.slug,
    p.weight,
    p.price,
    p.salePrice ?? '',
    p.stock,
    p.category,
    p.featured ? 'Có' : 'Không',
  ]);

  await updateSheetValues(accessToken, spreadsheetId, `Sản Phẩm!A1:I${rows.length + 1}`, [header, ...rows]);
};

/**
 * Read values helper
 */
export const readSheetValues = async (
  accessToken: string,
  spreadsheetId: string,
  range: string
): Promise<any[][]> => {
  const res = await fetch(`${SHEETS_API_BASE}/${spreadsheetId}/values/${encodeURIComponent(range)}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Lỗi đọc dữ liệu Sheets: ${err}`);
  }

  const data = await res.json();
  return data.values || [];
};

/**
 * Update values helper
 */
export const updateSheetValues = async (
  accessToken: string,
  spreadsheetId: string,
  range: string,
  values: any[][]
): Promise<void> => {
  const url = `${SHEETS_API_BASE}/${spreadsheetId}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Lỗi cập nhật dữ liệu Google Sheets: ${err}`);
  }
};
