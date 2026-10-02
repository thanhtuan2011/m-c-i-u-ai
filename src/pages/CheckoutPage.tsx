import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatVND } from '../utils/formatters';
import { appendOrderToSheet } from '../services/googleSheetsService';
import { getAccessToken } from '../services/firebaseAuth';
import { 
  ShieldCheck, 
  Truck, 
  ArrowLeft, 
  CheckCircle2, 
  CreditCard, 
  Banknote, 
  QrCode, 
  ShoppingBag, 
  FileSpreadsheet 
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    subtotal, 
    settings, 
    createOrder, 
    navigateTo 
  } = useStore();

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    province: 'Hà Nội',
    address: '',
    note: '',
    paymentMethod: 'cod' as 'cod' | 'bank_transfer',
    discountCode: '',
  });

  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [discountError, setDiscountError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, show empty state
  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#8A5A3B]/10 text-[#8A5A3B] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8 stroke-1" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-[#252525]">
          Giỏ hàng của bạn đang trống
        </h1>
        <p className="text-xs text-[#6B645C]">
          Bạn chưa chọn sản phẩm nào để thanh toán. Hãy dạo một vòng quanh cửa hàng nhé.
        </p>
        <button
          onClick={() => navigateTo('/products')}
          className="px-6 py-3 bg-[#8A5A3B] text-white rounded-lg text-xs font-semibold hover:bg-[#6E442B]"
        >
          Khám phá sản phẩm Mộc Điều
        </button>
      </div>
    );
  }

  const shippingFee = subtotal >= settings.freeShippingThreshold ? 0 : settings.standardShippingFee;
  const totalAmount = Math.max(0, subtotal - appliedDiscount + shippingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.discountCode.trim().toUpperCase() === 'TRIANMOC10') {
      const discount = Math.round(subtotal * 0.1);
      setAppliedDiscount(discount);
      setDiscountError('');
    } else {
      setDiscountError('Mã ưu đãi không hợp lệ hoặc đã hết hạn.');
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.phone.trim() || !formData.address.trim()) return;

    setIsSubmitting(true);

    try {
      const orderItems = cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.salePrice ?? item.product.price,
        quantity: item.quantity,
        image: item.product.image,
        weight: item.product.weight,
      }));

      const newOrder = createOrder({
        customerName: formData.customerName.trim(),
        phone: formData.phone.trim(),
        province: formData.province,
        address: formData.address.trim(),
        note: formData.note.trim(),
        items: orderItems,
        subtotal,
        shippingFee,
        total: totalAmount,
        status: 'Chưa thanh toán',
        paymentMethod: formData.paymentMethod,
      });

      // Attempt background Google Sheets sync if connected
      try {
        const savedSheetId = localStorage.getItem('moc_dieu_active_sheet_id');
        const token = await getAccessToken();
        if (savedSheetId && token) {
          await appendOrderToSheet(token, savedSheetId, newOrder);
        }
      } catch (sheetsErr) {
        console.warn('Lỗi ghi đơn vào Sheets:', sheetsErr);
      }

      // Navigate to success page
      navigateTo(`/order-success/${newOrder.orderCode}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      
      {/* Back button */}
      <div>
        <button
          onClick={() => navigateTo('/products')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8A5A3B] hover:text-[#6E442B]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Tiếp tục chọn thêm sản phẩm</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Customer Info & Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#8A5A3B]/15 shadow-xs space-y-6">
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#252525]">
              Thông tin giao hàng
            </h1>
            <p className="text-xs text-[#6B645C] mt-1">
              Vui lòng cung cấp địa chỉ nhận hàng chính xác để Mộc Điều chuyển phát nhanh nhất.
            </p>
          </div>

          <form id="checkout-form" onSubmit={handleSubmitOrder} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#252525] mb-1">
                Họ và tên người nhận *
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Nguyễn Thị Mai"
                value={formData.customerName}
                onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full text-xs p-3 rounded-lg border border-[#8A5A3B]/25 focus:border-[#8A5A3B] focus:outline-none bg-[#F7F3EA]/30"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#252525] mb-1">
                  Số điện thoại người nhận *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="09xx xxx xxx"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full text-xs p-3 rounded-lg border border-[#8A5A3B]/25 focus:border-[#8A5A3B] focus:outline-none bg-[#F7F3EA]/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#252525] mb-1">
                  Tỉnh / Thành phố *
                </label>
                <select
                  value={formData.province}
                  onChange={e => setFormData({ ...formData, province: e.target.value })}
                  className="w-full text-xs p-3 rounded-lg border border-[#8A5A3B]/25 focus:border-[#8A5A3B] focus:outline-none bg-white"
                >
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Bình Phước">Bình Phước</option>
                  <option value="Đồng Nai">Đồng Nai</option>
                  <option value="Bình Dương">Bình Dương</option>
                  <option value="Hải Phòng">Hải Phòng</option>
                  <option value="Cần Thơ">Cần Thơ</option>
                  <option value="Tỉnh thành khác">Tỉnh thành khác</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#252525] mb-1">
                Địa chỉ nhận hàng chi tiết (Số nhà, ngõ/ngách, tên đường, phường/xã) *
              </label>
              <input
                type="text"
                required
                placeholder="Số 12 ngõ 45 đường Lê Lợi, Phường Bến Nghé..."
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                className="w-full text-xs p-3 rounded-lg border border-[#8A5A3B]/25 focus:border-[#8A5A3B] focus:outline-none bg-[#F7F3EA]/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#252525] mb-1">
                Ghi chú đơn hàng (Thời gian giao, lưu ý khi gọi shipper...)
              </label>
              <textarea
                rows={2}
                placeholder="Giao giờ hành chính, gọi trước khi đến 15 phút..."
                value={formData.note}
                onChange={e => setFormData({ ...formData, note: e.target.value })}
                className="w-full text-xs p-3 rounded-lg border border-[#8A5A3B]/25 focus:border-[#8A5A3B] focus:outline-none bg-[#F7F3EA]/30"
              />
            </div>

            {/* Payment Method Selector */}
            <div className="pt-4 border-t border-[#8A5A3B]/10 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#252525] block">
                Phương thức thanh toán
              </span>

              <div className="space-y-2">
                {/* Method 1: COD */}
                <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'cod'
                    ? 'border-[#8A5A3B] bg-[#8A5A3B]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className="mt-0.5 text-[#8A5A3B] focus:ring-[#8A5A3B]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-[#8A5A3B]" />
                      <span className="text-xs sm:text-sm font-bold text-[#252525]">
                        Thanh toán khi nhận hàng (COD)
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6B645C] mt-1">
                      Bạn thanh toán tiền mặt trực tiếp cho nhân viên giao hàng sau khi kiểm tra kiện hàng.
                    </p>
                  </div>
                </label>

                {/* Method 2: VietQR / Bank Transfer */}
                <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'bank_transfer'
                    ? 'border-[#8A5A3B] bg-[#8A5A3B]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank_transfer"
                    checked={formData.paymentMethod === 'bank_transfer'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'bank_transfer' })}
                    className="mt-0.5 text-[#8A5A3B] focus:ring-[#8A5A3B]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <QrCode className="w-4 h-4 text-[#2F5D7E]" />
                      <span className="text-xs sm:text-sm font-bold text-[#252525]">
                        Chuyển khoản VietQR (Techcombank 24/7)
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6B645C] mt-1">
                      Techcombank: <strong className="text-[#252525]">19070016129010</strong> – Chủ TK: <strong className="text-[#252525]">Đỗ Lê Thành Tuấn</strong>. Quét mã VietQR tự động điền số tiền và nội dung đơn hàng ngay sau khi đặt.
                    </p>
                  </div>
                </label>
              </div>
            </div>

          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#8A5A3B]/15 shadow-xs space-y-5">
            <h2 className="font-serif text-lg font-bold text-[#252525] border-b border-[#8A5A3B]/10 pb-3">
              Đơn hàng của bạn ({cart.length} món)
            </h2>

            {/* Items list */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.map(item => {
                const itemPrice = item.product.salePrice ?? item.product.price;
                return (
                  <div key={item.product.id} className="flex gap-3 items-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 object-cover rounded-lg bg-[#F7F3EA] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#252525] truncate">
                        {item.product.name}
                      </p>
                      <p className="text-[11px] text-[#6B645C]">
                        {item.product.weight} • SL: {item.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#8A5A3B] shrink-0">
                      {formatVND(itemPrice * item.quantity)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Promo Code Form */}
            <div className="pt-3 border-t border-[#8A5A3B]/10">
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Mã ưu đãi (VD: TRIANMOC10)"
                  value={formData.discountCode}
                  onChange={e => setFormData({ ...formData, discountCode: e.target.value })}
                  className="flex-1 text-xs p-2.5 rounded-lg border border-[#8A5A3B]/25 focus:border-[#8A5A3B] focus:outline-none uppercase"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2F5D7E] text-white rounded-lg text-xs font-semibold hover:bg-[#22455E] transition-colors"
                >
                  Áp dụng
                </button>
              </form>
              {discountError && (
                <p className="text-[11px] text-rose-600 mt-1">{discountError}</p>
              )}
              {appliedDiscount > 0 && (
                <p className="text-[11px] text-emerald-600 mt-1 font-medium">
                  ✓ Đã áp dụng giảm giá {formatVND(appliedDiscount)}
                </p>
              )}
            </div>

            {/* Price Calculations */}
            <div className="pt-3 border-t border-[#8A5A3B]/10 space-y-2 text-xs">
              <div className="flex justify-between text-[#6B645C]">
                <span>Tạm tính:</span>
                <span className="font-semibold text-[#252525]">{formatVND(subtotal)}</span>
              </div>

              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Ưu đãi giảm giá:</span>
                  <span className="font-semibold">-{formatVND(appliedDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#6B645C]">
                <span>Phí vận chuyển:</span>
                {shippingFee === 0 ? (
                  <span className="font-semibold text-emerald-700">Miễn phí giao hàng</span>
                ) : (
                  <span className="font-semibold text-[#252525]">{formatVND(shippingFee)}</span>
                )}
              </div>

              <div className="pt-3 border-t border-[#8A5A3B]/15 flex justify-between items-baseline text-sm">
                <span className="font-bold text-[#252525]">Tổng thanh toán:</span>
                <span className="text-xl font-bold text-[#8A5A3B]">
                  {formatVND(totalAmount)}
                </span>
              </div>
            </div>

            {/* Place Order CTA Button */}
            <button
              form="checkout-form"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#8A5A3B] hover:bg-[#6E442B] disabled:opacity-70 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Đang xử lý đơn hàng...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Xác nhận đặt hàng ({formatVND(totalAmount)})</span>
                </>
              )}
            </button>

            {/* Guarantees */}
            <div className="space-y-1.5 pt-2 text-[11px] text-[#6B645C]">
              <p className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#8A5A3B]" />
                <span>Kiểm tra hàng trước khi thanh toán.</span>
              </p>
              <p className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8A5A3B]" />
                <span>Bảo hành giòn thơm, đổi trả 1-1 miễn phí.</span>
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
