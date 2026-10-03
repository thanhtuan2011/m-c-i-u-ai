import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatVND, formatDate } from '../utils/formatters';
import { ProductCard } from '../components/ProductCard';
import { 
  ShoppingBag, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Plus, 
  Minus, 
  Star, 
  ChevronRight, 
  Sparkles, 
  MessageSquarePlus, 
  X 
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { 
    currentPath, 
    products, 
    getProductBySlug, 
    addToCart, 
    navigateTo, 
    reviews, 
    addReview 
  } = useStore();

  const slug = currentPath.replace('/products/', '');
  const product = getProductBySlug(slug) || products[0];

  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'ingredients' | 'usage' | 'storage'>('desc');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    customerName: '',
    rating: 5,
    content: '',
  });

  // Sync selected image if product changes
  React.useEffect(() => {
    setSelectedImage(product.image);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.slug]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-serif text-2xl font-bold">Không tìm thấy sản phẩm</h1>
        <button
          onClick={() => navigateTo('/products')}
          className="px-6 py-2.5 bg-[#8A5A3B] text-white rounded-lg text-sm font-semibold"
        >
          Quay lại danh mục sản phẩm
        </button>
      </div>
    );
  }

  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const effectivePrice = product.salePrice ?? product.price;
  const discountPercent = hasDiscount 
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100) 
    : 0;

  const relatedProducts = products
    .filter(p => p.id !== product.id)
    .slice(0, 3);

  const productReviews = reviews.filter(
    r => r.published && (r.productId === product.id || r.productName === product.name)
  );

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigateTo('/checkout');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.customerName.trim() || !reviewForm.content.trim()) return;

    addReview({
      customerName: reviewForm.customerName.trim(),
      rating: reviewForm.rating,
      content: reviewForm.content.trim(),
      productId: product.id,
      productName: product.name,
      published: true,
    });

    setIsReviewModalOpen(false);
    setReviewForm({ customerName: '', rating: 5, content: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      
      {/* Breadcrumb */}
      <nav aria-label="Đường dẫn trang" className="flex items-center space-x-2 text-xs text-[#6B645C]">
        <button onClick={() => navigateTo('/')} className="hover:text-[#8A5A3B] transition-colors">
          Trang chủ
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => navigateTo('/products')} className="hover:text-[#8A5A3B] transition-colors">
          Sản phẩm
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#252525] font-medium truncate max-w-xs sm:max-w-md">
          {product.name}
        </span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Left: Gallery */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Display Image */}
          <div className="aspect-square w-full rounded-2xl overflow-hidden bg-white border border-[#8A5A3B]/15 shadow-sm relative">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
            {hasDiscount && (
              <span className="absolute top-4 left-4 bg-[#8A5A3B] text-white text-xs font-bold px-3 py-1 rounded shadow-md">
                Giảm {discountPercent}%
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    selectedImage === img
                      ? 'border-[#8A5A3B] ring-2 ring-[#8A5A3B]/20'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info & Actions */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Badges */}
          <div className="flex flex-wrap gap-2 items-center">
            {product.badges?.map((badge, i) => (
              <span key={i} className="text-[11px] font-semibold bg-[#2F5D7E]/10 text-[#2F5D7E] px-2.5 py-0.5 rounded-full">
                {badge}
              </span>
            ))}
            <span className="text-[11px] text-[#8A5A3B] font-medium bg-[#8A5A3B]/10 px-2.5 py-0.5 rounded-full">
              Quy cách: {product.weight}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#252525] leading-tight">
            {product.name}
          </h1>

          {/* Price */}
          <div className="p-4 rounded-xl bg-white border border-[#8A5A3B]/10 flex items-baseline gap-4">
            <span className="text-2xl sm:text-3xl font-bold text-[#8A5A3B]">
              {formatVND(effectivePrice)}
            </span>
            {hasDiscount && (
              <span className="text-sm sm:text-base text-[#6B645C] line-through">
                {formatVND(product.price)}
              </span>
            )}
            <span className="text-xs text-emerald-700 font-medium ml-auto bg-emerald-50 px-2.5 py-1 rounded">
              Còn {product.stock} hộp sẵn sàng giao
            </span>
          </div>

          {/* Short Description */}
          <p className="text-sm sm:text-base text-[#6B645C] leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Quantity Selector & Add to Cart */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-[#252525]">Số lượng:</span>
              <div className="flex items-center border border-[#8A5A3B]/30 rounded-lg bg-white overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-[#8A5A3B]/10 text-[#252525] transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-bold text-[#252525]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-2 hover:bg-[#8A5A3B]/10 text-[#252525] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-white border-2 border-[#8A5A3B] text-[#8A5A3B] hover:bg-[#8A5A3B]/5 py-3.5 px-6 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Thêm vào giỏ hàng</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 bg-[#8A5A3B] hover:bg-[#6E442B] text-white py-3.5 px-6 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow hover:shadow-md"
              >
                <span>Mua ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#8A5A3B]/15 text-xs text-[#6B645C]">
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-[#8A5A3B]/10">
              <Truck className="w-4 h-4 text-[#8A5A3B] shrink-0" />
              <span>Giao hàng toàn quốc</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-[#8A5A3B]/10">
              <ShieldCheck className="w-4 h-4 text-[#8A5A3B] shrink-0" />
              <span>100% tự nhiên</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-[#8A5A3B]/10">
              <RotateCcw className="w-4 h-4 text-[#8A5A3B] shrink-0" />
              <span>Đổi trả nếu ỉu hạt</span>
            </div>
          </div>

        </div>
      </div>

      {/* Tabs: Description, Ingredients, Usage, Storage */}
      <div className="bg-white rounded-2xl border border-[#8A5A3B]/15 overflow-hidden shadow-xs">
        <div className="flex border-b border-[#8A5A3B]/10 overflow-x-auto bg-[#F7F3EA]/50">
          {[
            { id: 'desc', label: 'Mô tả chi tiết & Vị mộc' },
            { id: 'ingredients', label: 'Thành phần nguyên liệu' },
            { id: 'usage', label: 'Hướng dẫn thưởng thức' },
            { id: 'storage', label: 'Cách bảo quản hạt giòn' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-4 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-[#8A5A3B] text-[#8A5A3B] bg-white'
                  : 'border-transparent text-[#6B645C] hover:text-[#252525]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6 sm:p-8 text-sm sm:text-base text-[#252525] leading-relaxed">
          {activeTab === 'desc' && (
            <div className="space-y-4 max-w-3xl">
              <p>{product.description}</p>
              <div className="p-4 bg-[#F7F3EA] rounded-xl border border-[#8A5A3B]/15 text-xs sm:text-sm text-[#6B645C] space-y-2">
                <p className="font-semibold text-[#8A5A3B]">Cam kết chất lượng từ Mộc Điều:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Không sử dụng phẩm màu công nghiệp hay hóa chất tẩy trắng nhân hạt.</li>
                  <li>Rang mộc giữ trọn lượng tinh dầu béo bùi tự nhiên tốt cho sức khỏe.</li>
                  <li>Đóng gói chắc chắn, hút chân không hoặc đậy kín màng seal bảo vệ.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="space-y-3 max-w-3xl">
              <h3 className="font-semibold text-base text-[#8A5A3B]">Thành phần dinh dưỡng:</h3>
              <p>{product.ingredients}</p>
              <p className="text-xs text-[#6B645C]">
                Không chứa đường tinh luyện, không bột ngọt, không phụ gia tạo giòn nhân tạo.
              </p>
            </div>
          )}

          {activeTab === 'usage' && (
            <div className="space-y-3 max-w-3xl">
              <h3 className="font-semibold text-base text-[#8A5A3B]">Gợi ý sử dụng:</h3>
              <p>{product.usage}</p>
              <p className="text-xs text-[#6B645C]">
                Thích hợp làm món ăn vặt lành mạnh, bổ sung năng lượng khi làm việc hoặc nhâm nhi cùng bạn bè.
              </p>
            </div>
          )}

          {activeTab === 'storage' && (
            <div className="space-y-3 max-w-3xl">
              <h3 className="font-semibold text-base text-[#8A5A3B]">Hướng dẫn bảo quản:</h3>
              <p>{product.storage}</p>
              <div className="mt-2 text-xs text-[#2F5D7E] bg-[#2F5D7E]/5 p-3 rounded-lg border border-[#2F5D7E]/20">
                <strong>Mẹo hay:</strong> Sau khi mở nắp, bạn có thể cất hũ hạt vào ngăn mát tủ lạnh để hạt luôn giòn thơm như mới rang!
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Customer Reviews for this product */}
      <div className="bg-white rounded-2xl border border-[#8A5A3B]/15 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#8A5A3B]/10 pb-4">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#252525]">
              Đánh giá từ khách hàng
            </h2>
            <p className="text-xs text-[#6B645C]">
              Cảm nhận thực tế của người dùng đối với {product.name}
            </p>
          </div>

          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#8A5A3B] text-[#8A5A3B] hover:bg-[#8A5A3B]/10 text-xs font-semibold"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Viết đánh giá sản phẩm</span>
          </button>
        </div>

        {productReviews.length === 0 ? (
          <div className="text-center py-10 space-y-3">
            <p className="text-sm font-semibold text-[#252525]">
              Chưa có đánh giá nào cho sản phẩm này trong hệ thống.
            </p>
            <p className="text-xs text-[#6B645C] max-w-md mx-auto">
              Mộc Điều tôn trọng sự thật và <strong>không tạo đánh giá ảo</strong>. Hãy là người đầu tiên thưởng thức và chia sẻ cảm nhận của bạn!
            </p>
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="px-4 py-2 bg-[#8A5A3B] text-white rounded text-xs font-semibold hover:bg-[#6E442B]"
            >
              Gửi cảm nhận ngay
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {productReviews.map(r => (
              <div key={r.id} className="p-4 rounded-xl bg-[#F7F3EA] border border-[#8A5A3B]/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#252525]">{r.customerName}</span>
                  <span className="text-[11px] text-[#6B645C]">{formatDate(r.createdAt)}</span>
                </div>
                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < r.rating ? 'fill-amber-500' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-xs text-[#252525] italic">"{r.content}"</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related Products */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#252525]">
            Sản phẩm liên quan
          </h2>
          <button
            onClick={() => navigateTo('/products')}
            className="text-xs font-semibold text-[#8A5A3B] hover:text-[#6E442B] flex items-center gap-1"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#8A5A3B]/20 relative">
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-4 right-4 text-[#6B645C] hover:text-[#252525]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-lg font-bold text-[#252525] mb-1">
              Đánh giá {product.name}
            </h3>
            <p className="text-xs text-[#6B645C] mb-4">
              Chia sẻ trải nghiệm thực tế của bạn với sản phẩm này.
            </p>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#252525] mb-1">
                  Họ tên của bạn *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Thu Trang"
                  value={reviewForm.customerName}
                  onChange={e => setReviewForm({ ...reviewForm, customerName: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-[#8A5A3B]/30 focus:border-[#8A5A3B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#252525] mb-1">
                  Số sao: {reviewForm.rating} sao
                </label>
                <div className="flex gap-2 text-amber-500">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${star <= reviewForm.rating ? 'fill-amber-500' : 'text-gray-300'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#252525] mb-1">
                  Cảm nhận của bạn *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Chia sẻ về độ giòn, vị béo bùi hoặc cảm nhận đóng gói..."
                  value={reviewForm.content}
                  onChange={e => setReviewForm({ ...reviewForm, content: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-[#8A5A3B]/30 focus:border-[#8A5A3B] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="flex-1 py-2.5 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#8A5A3B] hover:bg-[#6E442B] text-white rounded-lg text-xs font-semibold shadow"
                >
                  Gửi nhận xét
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
