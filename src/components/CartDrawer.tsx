import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { formatVND } from '../utils/formatters';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    settings, 
    navigateTo 
  } = useStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCartOpen(false);
    };
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const remainingForFreeShipping = Math.max(0, settings.freeShippingThreshold - subtotal);
  const freeShippingPercent = Math.min(100, Math.round((subtotal / settings.freeShippingThreshold) * 100));

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigateTo('/checkout');
  };

  const handleContinueShopping = () => {
    setIsCartOpen(false);
    navigateTo('/products');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside aria-label="Giỏ hàng của bạn" className="w-screen max-w-md bg-[#F7F3EA] shadow-2xl flex flex-col justify-between border-l border-[#8A5A3B]/20 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-[#8A5A3B]/15 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#8A5A3B]" />
              <h2 className="font-serif text-lg font-bold text-[#252525]">
                Giỏ hàng của bạn
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#8A5A3B]/10 text-[#8A5A3B]">
                {cart.length} món
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-[#6B645C] hover:text-[#252525] hover:bg-black/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress bar */}
          <div className="px-5 py-3 bg-[#EFE9DC] border-b border-[#8A5A3B]/10 text-xs">
            {remainingForFreeShipping > 0 ? (
              <p className="text-[#252525]">
                Mua thêm <strong className="text-[#8A5A3B]">{formatVND(remainingForFreeShipping)}</strong> để được <strong className="text-[#2F5D7E]">Miễn phí vận chuyển</strong>
              </p>
            ) : (
              <p className="text-[#2F5D7E] font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Đơn hàng của bạn đã đủ điều kiện <strong>Miễn phí vận chuyển toàn quốc!</strong></span>
              </p>
            )}
            <div className="w-full bg-[#E4DCCB] h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-[#8A5A3B] h-full rounded-full transition-all duration-300"
                style={{ width: `${freeShippingPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#8A5A3B]/10 text-[#8A5A3B] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <div className="space-y-1">
                  <p className="font-serif text-lg font-bold text-[#252525]">Giỏ hàng đang trống</p>
                  <p className="text-xs text-[#6B645C]">Hãy thưởng thức vị bùi tự nhiên của hạt điều Mộc Điều hôm nay nhé.</p>
                </div>
                <button
                  onClick={handleContinueShopping}
                  className="inline-flex items-center gap-2 bg-[#8A5A3B] text-white px-5 py-2.5 rounded text-xs font-semibold hover:bg-[#6E442B] transition-colors"
                >
                  <span>Khám phá sản phẩm</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              cart.map(item => {
                const effectivePrice = item.product.salePrice ?? item.product.price;
                return (
                  <div 
                    key={item.product.id}
                    className="flex gap-4 p-3 rounded-lg bg-white border border-[#8A5A3B]/10 shadow-xs"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-18 h-18 object-cover rounded-md bg-[#F7F3EA] shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="text-sm font-semibold text-[#252525] line-clamp-1">
                            {item.product.name}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-[#6B645C] hover:text-rose-600 transition-colors p-0.5"
                            title="Xóa sản phẩm"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-[11px] text-[#6B645C] block">
                          Quy cách: {item.product.weight}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/5">
                        <div className="text-sm font-bold text-[#8A5A3B]">
                          {formatVND(effectivePrice)}
                        </div>

                        {/* Stepper */}
                        <div className="flex items-center border border-[#8A5A3B]/30 rounded bg-[#F7F3EA]">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-[#8A5A3B]/10 text-[#252525] transition-colors"
                            aria-label="Giảm 1"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold text-[#252525]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-[#8A5A3B]/10 text-[#252525] transition-colors"
                            aria-label="Tăng 1"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Checkout Actions */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-[#8A5A3B]/15 space-y-3 shadow-lg">
              <div className="flex justify-between items-baseline text-sm">
                <span className="text-[#6B645C]">Tạm tính:</span>
                <span className="text-lg font-bold text-[#252525]">
                  {formatVND(subtotal)}
                </span>
              </div>
              <p className="text-[11px] text-[#6B645C] italic">
                Phí vận chuyển sẽ được tính chi tiết khi nhập địa chỉ giao hàng ở bước thanh toán.
              </p>

              <button
                onClick={handleCheckout}
                className="w-full bg-[#8A5A3B] hover:bg-[#6E442B] text-white py-3.5 rounded-lg font-semibold text-sm shadow flex items-center justify-center gap-2 transition-all hover:shadow-md"
              >
                <span>Tiến hành mua hàng</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full py-2 text-center text-xs font-medium text-[#6B645C] hover:text-[#252525] transition-colors"
              >
                Tiếp tục xem sản phẩm khác
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
