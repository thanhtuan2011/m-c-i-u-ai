import React from 'react';
import { useStore } from '../context/StoreContext';
import { formatVND, formatDate } from '../utils/formatters';
import { CheckCircle2, ArrowRight, QrCode, Phone, Package, Truck, Copy } from 'lucide-react';

export const OrderSuccessPage: React.FC = () => {
  const { currentPath, getOrderByCode, navigateTo, settings, showToast } = useStore();

  const code = currentPath.replace('/order-success/', '');
  const order = getOrderByCode(code);

  const handleCopyCode = () => {
    if (order && navigator.clipboard) {
      navigator.clipboard.writeText(order.orderCode);
      showToast(`Đã sao chép mã đơn: ${order.orderCode}`, 'info');
    }
  };

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-serif text-2xl font-bold">Không tìm thấy thông tin đơn hàng</h1>
        <p className="text-xs text-[#6B645C]">Mã đơn hàng không tồn tại hoặc đã hết hạn phiên làm việc.</p>
        <button
          onClick={() => navigateTo('/products')}
          className="px-6 py-2.5 bg-[#8A5A3B] text-white rounded-lg text-xs font-semibold"
        >
          Quay lại cửa hàng
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      
      {/* Success banner */}
      <div className="bg-white rounded-2xl border border-[#8A5A3B]/15 p-6 sm:p-10 shadow-xs text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-1">
          <span className="text-xs uppercase tracking-widest text-[#8A5A3B] font-semibold">
            Đặt hàng thành công
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#252525]">
            Cảm ơn bạn đã tin chọn Mộc Điều!
          </h1>
          <p className="text-xs sm:text-sm text-[#6B645C] max-w-md mx-auto">
            Đơn hàng của bạn đã được ghi nhận. Đội ngũ Mộc Điều sẽ liên hệ xác nhận và chuẩn bị hạt điều tươi mới nhất để chuyển phát đến bạn.
          </p>
        </div>

        {/* Order code pill */}
        <div className="inline-flex items-center gap-2 p-2.5 px-4 rounded-xl bg-[#F7F3EA] border border-[#8A5A3B]/20 text-xs sm:text-sm">
          <span className="text-[#6B645C]">Mã đơn hàng:</span>
          <strong className="font-mono text-base text-[#8A5A3B] font-bold">{order.orderCode}</strong>
          <button
            onClick={handleCopyCode}
            className="p-1 hover:bg-[#8A5A3B]/10 rounded text-[#8A5A3B] transition-colors"
            title="Sao chép mã đơn"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* VietQR section if bank transfer was selected */}
      {order.paymentMethod === 'bank_transfer' && (
        <div className="bg-[#2F5D7E] text-white rounded-2xl p-6 sm:p-8 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-white/15 pb-3">
            <div className="flex items-center gap-2 text-[#E4DCCB]">
              <QrCode className="w-5 h-5 text-amber-300" />
              <h2 className="font-serif text-lg font-bold">
                Thông tin chuyển khoản VietQR
              </h2>
            </div>
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/15 font-semibold text-white/90">
              Techcombank 24/7
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-white/10 p-5 rounded-xl border border-white/15">
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between pb-1 border-b border-white/10">
                <span className="text-white/80">Ngân hàng:</span>
                <strong className="text-sm font-bold text-white tracking-wide">TECHCOMBANK</strong>
              </div>

              <div className="flex items-center justify-between pb-1 border-b border-white/10">
                <span className="text-white/80">Số tài khoản:</span>
                <div className="flex items-center gap-1.5">
                  <strong className="font-mono text-sm font-bold text-amber-300">19070016129010</strong>
                  <button
                    onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText('19070016129010');
                        showToast('Đã sao chép số tài khoản: 19070016129010', 'info');
                      }
                    }}
                    className="p-1 hover:bg-white/20 rounded text-white/80 hover:text-white transition-colors"
                    title="Sao chép số tài khoản"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pb-1 border-b border-white/10">
                <span className="text-white/80">Chủ tài khoản:</span>
                <strong className="text-sm font-bold text-white uppercase">Đỗ Lê Thành Tuấn</strong>
              </div>

              <div className="flex items-center justify-between pb-1 border-b border-white/10">
                <span className="text-white/80">Số tiền:</span>
                <strong className="text-base text-amber-300 font-bold">{formatVND(order.total)}</strong>
              </div>

              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Nội dung chuyển khoản:</span>
                  <button
                    onClick={() => {
                      const memo = `${order.orderCode} - ${order.phone}`;
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(memo);
                        showToast(`Đã sao chép nội dung: ${memo}`, 'info');
                      }
                    }}
                    className="p-1 hover:bg-white/20 rounded text-white/80 hover:text-white transition-colors"
                    title="Sao chép nội dung"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="font-mono text-xs bg-black/30 px-3 py-1.5 rounded text-amber-200 break-all select-all">
                  {order.orderCode} - {order.phone}
                </div>
              </div>
            </div>

            {/* QR Code Container */}
            <div className="text-center bg-white p-4 rounded-xl text-[#252525] max-w-[260px] mx-auto shadow-md">
              <div className="w-full mx-auto bg-white rounded-lg flex items-center justify-center overflow-hidden border border-gray-100 p-1">
                <img
                  src="/images/regenerated_image_1790910542641.png"
                  alt="Mã VietQR Techcombank - Đỗ Lê Thành Tuấn - 19070016129010"
                  className="w-full h-auto max-h-80 object-contain rounded"
                />
              </div>
              <p className="text-[11px] font-bold text-[#252525] mt-2">Quét mã bằng app ngân hàng</p>
              <p className="text-[10px] text-[#6B645C]">Techcombank: 19070016129010</p>
            </div>
          </div>
        </div>
      )}

      {/* Order Details Receipt */}
      <div className="bg-white rounded-2xl border border-[#8A5A3B]/15 p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="font-serif text-lg font-bold text-[#252525] border-b border-[#8A5A3B]/10 pb-3">
          Chi tiết đơn hàng
        </h2>

        {/* Customer & Shipping info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-[#6B645C] block">Người nhận hàng:</span>
            <span className="font-bold text-sm text-[#252525]">{order.customerName}</span>
            <span className="block text-[#6B645C]">{order.phone}</span>
          </div>

          <div>
            <span className="text-[#6B645C] block">Địa chỉ nhận hàng:</span>
            <span className="font-semibold text-[#252525]">{order.address}</span>
            {order.province && <span className="block text-[#6B645C]">{order.province}</span>}
          </div>

          <div>
            <span className="text-[#6B645C] block">Phương thức thanh toán:</span>
            <span className="font-semibold text-[#252525]">
              {order.paymentMethod === 'cod' ? 'Thanh toán tiền mặt khi nhận hàng (COD)' : 'Chuyển khoản VietQR'}
            </span>
          </div>

          <div>
            <span className="text-[#6B645C] block">Thời gian đặt:</span>
            <span className="font-semibold text-[#252525]">{formatDate(order.createdAt)}</span>
          </div>
        </div>

        {/* Items */}
        <div className="pt-4 border-t border-[#8A5A3B]/10 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6B645C] block">
            Danh sách hạt điều đã đặt
          </span>

          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-xs p-2 rounded-lg bg-[#F7F3EA]/50">
                <div>
                  <span className="font-semibold text-[#252525]">{item.productName}</span>
                  <span className="text-[#6B645C] text-[11px] block">{item.weight} • Số lượng: {item.quantity}</span>
                </div>
                <span className="font-bold text-[#8A5A3B]">
                  {formatVND(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing summary */}
          <div className="pt-3 border-t border-[#8A5A3B]/10 space-y-1.5 text-xs text-right">
            <div>Tạm tính: <strong className="text-[#252525]">{formatVND(order.subtotal)}</strong></div>
            <div>Phí giao hàng: <strong className="text-[#252525]">{order.shippingFee === 0 ? 'Miễn phí' : formatVND(order.shippingFee)}</strong></div>
            <div className="text-base font-bold text-[#8A5A3B] pt-1">
              Tổng thanh toán: {formatVND(order.total)}
            </div>
          </div>
        </div>
      </div>

      {/* Support hotline */}
      <div className="p-4 rounded-xl bg-[#F7F3EA] border border-[#8A5A3B]/20 text-xs text-center space-y-1">
        <p className="font-semibold text-[#252525]">Cần hỗ trợ gấp về đơn hàng này?</p>
        <p className="text-[#6B645C]">
          Vui lòng gọi hotline: <strong className="text-[#8A5A3B]">{settings.hotlinePlaceholder}</strong> hoặc quét mã QR in trên hộp khi nhận hàng.
        </p>
      </div>

      {/* Continue shopping button */}
      <div className="text-center pt-2">
        <button
          onClick={() => navigateTo('/products')}
          className="inline-flex items-center gap-2 bg-[#8A5A3B] hover:bg-[#6E442B] text-white px-8 py-3 rounded-lg text-xs sm:text-sm font-semibold shadow transition-all"
        >
          <span>Khám phá thêm sản phẩm khác</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
