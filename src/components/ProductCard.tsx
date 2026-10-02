import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { formatVND } from '../utils/formatters';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, navigateTo } = useStore();

  const handleCardClick = () => {
    navigateTo(`/products/${product.slug}`);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    navigateTo('/checkout');
  };

  const hasDiscount = product.salePrice && product.salePrice < product.price;

  return (
    <article
      onClick={handleCardClick}
      className="group bg-[#FFFFFF] rounded-xl overflow-hidden border border-[#8A5A3B]/10 hover:border-[#8A5A3B]/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer relative"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
        {hasDiscount && (
          <span className="bg-[#8A5A3B] text-white text-[11px] font-semibold px-2 py-0.5 rounded shadow-sm">
            Ưu đãi
          </span>
        )}
        {product.badges && product.badges.map((badge, idx) => (
          <span 
            key={idx}
            className="bg-[#2F5D7E] text-[#F7F3EA] text-[10px] font-medium px-2 py-0.5 rounded shadow-sm tracking-wide"
          >
            {badge}
          </span>
        ))}
      </div>

      {/* Weight Badge */}
      <div className="absolute top-3 right-3 z-10">
        <span className="bg-[#F7F3EA]/90 backdrop-blur-xs text-[#252525] text-xs font-medium px-2 py-0.5 rounded border border-[#8A5A3B]/15">
          {product.weight}
        </span>
      </div>

      {/* Product Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#F7F3EA]/50">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        
        {/* Subtle quick add overlay button on desktop */}
        <div className="absolute inset-x-3 bottom-3 hidden sm:flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleQuickAdd}
            className="flex-1 bg-white/95 backdrop-blur-xs text-[#252525] hover:text-[#8A5A3B] py-2 px-3 rounded shadow-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-[#8A5A3B]/20"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Thêm giỏ</span>
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-[#8A5A3B] hover:bg-[#6E442B] text-white py-2 px-3 rounded shadow-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Mua ngay</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          <h3 className="font-serif text-base sm:text-lg font-bold text-[#252525] group-hover:text-[#8A5A3B] transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-[#6B645C] mt-1.5 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-[#8A5A3B]/10 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-bold text-[#8A5A3B]">
                {formatVND(product.salePrice ?? product.price)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-[#6B645C]/70 line-through">
                  {formatVND(product.price)}
                </span>
              )}
            </div>
            <span className="text-[11px] text-[#6B645C]">
              Quy cách: {product.weight}
            </span>
          </div>

          {/* Mobile direct button */}
          <button
            onClick={handleQuickAdd}
            aria-label="Thêm vào giỏ"
            className="sm:hidden p-2 bg-[#8A5A3B] text-white rounded-lg active:scale-95 transition-transform"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};
