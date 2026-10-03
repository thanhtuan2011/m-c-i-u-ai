import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { formatDate } from '../utils/formatters';
import { 
  ArrowRight, 
  Sparkles, 
  Check, 
  Leaf, 
  Shield, 
  Heart, 
  Award, 
  Search, 
  Flame, 
  Package, 
  Truck, 
  QrCode, 
  Star, 
  MessageSquarePlus, 
  Calendar, 
  Clock, 
  X 
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { 
    products, 
    posts, 
    reviews, 
    addReview, 
    navigateTo, 
    settings 
  } = useStore();

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    customerName: '',
    rating: 5,
    content: '',
    productName: 'Hạt Điều Rang Muối Vỏ Lụa',
  });

  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const latestPosts = posts.filter(p => p.published).slice(0, 3);
  const publishedReviews = reviews.filter(r => r.published);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.customerName.trim() || !reviewForm.content.trim()) return;

    addReview({
      customerName: reviewForm.customerName.trim(),
      rating: reviewForm.rating,
      content: reviewForm.content.trim(),
      productName: reviewForm.productName,
      published: true,
    });

    setIsReviewModalOpen(false);
    setReviewForm({
      customerName: '',
      rating: 5,
      content: '',
      productName: 'Hạt Điều Rang Muối Vỏ Lụa',
    });
  };

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      
      {/* ========================================================
          SECTION 1 – HERO
          ======================================================== */}
      <section className="relative overflow-hidden pt-6 sm:pt-12 lg:pt-16 pb-12 bg-gradient-to-b from-[#F7F3EA] to-[#F1ECE0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8A5A3B]/10 border border-[#8A5A3B]/20 text-[#8A5A3B] text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Nông sản tự nhiên Việt Nam</span>
              </div>

              {/* Title & Slogan */}
              <div className="space-y-2">
                <span className="block text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#252525] leading-tight">
                  MỘC ĐIỀU
                </span>
                <h1 className="text-xl sm:text-3xl text-[#8A5A3B] font-bold">
                  “Mộc vị tự nhiên – Trọn vị hạt điều.”
                </h1>
              </div>

              {/* Description */}
              <p className="text-base sm:text-lg text-[#6B645C] max-w-xl leading-relaxed">
                Khám phá vị bùi, béo và tự nhiên của hạt điều trong từng khoảnh khắc thưởng thức. 
                Giữ trọn giá trị nguyên bản, không tẩm ướp cầu kỳ, tinh tế trong từng mẻ rang.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => navigateTo('/products')}
                  className="bg-[#8A5A3B] hover:bg-[#6E442B] text-white px-7 py-3.5 rounded-lg font-medium text-base shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 group active:scale-98"
                >
                  <span>Khám phá sản phẩm</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('featured-products');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-lg border border-[#2F5D7E] text-[#2F5D7E] hover:bg-[#2F5D7E]/5 font-medium text-base text-center transition-colors"
                >
                  Mua ngay hôm nay
                </button>
              </div>

              {/* Trust Indicators (no fake numbers or fake certificates) */}
              <div className="pt-4 border-t border-[#8A5A3B]/15 grid grid-cols-3 gap-4 text-xs text-[#6B645C]">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#8A5A3B] shrink-0" />
                  <span>Rang mộc tự nhiên</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#8A5A3B] shrink-0" />
                  <span>Hạt tuyển tròn đều</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#8A5A3B] shrink-0" />
                  <span>Đổi trả nếu ỉu hạt</span>
                </div>
              </div>

            </div>

            {/* Right Photography */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="aspect-4/3 sm:aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80 bg-[#EFE9DC]">
                  <img
                    src="/images/moc_dieu_official_hero_1790905543934.jpg"
                    alt="Hạt điều Mộc Điều - Bao bì tự nhiên và hạt điều chọn lọc"
                    className="w-full h-full object-cover object-center transform hover:scale-103 transition-transform duration-700"
                  />
                </div>

                {/* Floating Artisan Tag */}
                <div className="absolute -bottom-4 -left-3 sm:-bottom-5 sm:-left-5 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-[#8A5A3B]/20 max-w-[240px]">
                  <p className="text-xs uppercase tracking-wider text-[#8A5A3B] font-semibold">
                    Cam kết từ tâm
                  </p>
                  <p className="text-xs text-[#252525] mt-1 font-medium leading-snug">
                    Tôn trọng hương vị nguyên bản của hạt điều Việt Nam
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================
          SECTION 2 – WHY MỘC ĐIỀU ("Điều gì tạo nên vị Mộc?")
          4 Feature Cards: 1. Tự nhiên, 2. Chọn lọc, 3. Tinh tế, 4. Trọn vị
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#2F5D7E]">
            Giá trị cốt lõi
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#252525]">
            Điều gì tạo nên vị Mộc?
          </h2>
          <p className="text-sm sm:text-base text-[#6B645C] leading-relaxed">
            Chúng tôi tin rằng món ăn ngon nhất là món ăn giữ được trọn vẹn sự thuần khiết mà đất trời ban tặng.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Tự nhiên */}
          <div className="bg-white p-6 sm:p-7 rounded-xl border border-[#8A5A3B]/10 hover:border-[#8A5A3B]/30 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#8A5A3B]/10 text-[#8A5A3B] flex items-center justify-center group-hover:bg-[#8A5A3B] group-hover:text-white transition-colors">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#252525]">
                1. Tự nhiên
              </h3>
              <p className="text-xs sm:text-sm text-[#6B645C] leading-relaxed">
                Không chất bảo quản công nghiệp, không tẩm ướp hương liệu tổng hợp. Mỗi mẻ hạt điều chỉ chứa đựng dưỡng chất thanh lành của tự nhiên.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#8A5A3B]/10 text-[11px] text-[#8A5A3B] font-medium">
              Vị mộc thuần khiết
            </div>
          </div>

          {/* Card 2: Chọn lọc */}
          <div className="bg-white p-6 sm:p-7 rounded-xl border border-[#8A5A3B]/10 hover:border-[#8A5A3B]/30 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#2F5D7E]/10 text-[#2F5D7E] flex items-center justify-center group-hover:bg-[#2F5D7E] group-hover:text-white transition-colors">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#252525]">
                2. Chọn lọc
              </h3>
              <p className="text-xs sm:text-sm text-[#6B645C] leading-relaxed">
                Từng mẻ hạt được phân loại kỹ lưỡng về kích cỡ, loại bỏ hạt lép, hạt vỡ hay khuyết điểm để mang lại trải nghiệm đồng đều nhất khi thưởng thức.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#8A5A3B]/10 text-[11px] text-[#2F5D7E] font-medium">
              Tỉ mỉ từng hạt
            </div>
          </div>

          {/* Card 3: Tinh tế */}
          <div className="bg-white p-6 sm:p-7 rounded-xl border border-[#8A5A3B]/10 hover:border-[#8A5A3B]/30 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#8A5A3B]/10 text-[#8A5A3B] flex items-center justify-center group-hover:bg-[#8A5A3B] group-hover:text-white transition-colors">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#252525]">
                3. Tinh tế
              </h3>
              <p className="text-xs sm:text-sm text-[#6B645C] leading-relaxed">
                Kỹ thuật căn chỉnh nhiệt độ rang mộc chuẩn xác giúp giữ trọn độ ẩm lý tưởng, lớp vỏ lụa giòn tan, màu hạt vàng ươm không bị cháy xém.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#8A5A3B]/10 text-[11px] text-[#8A5A3B] font-medium">
              Cân bằng nhiệt & lửa
            </div>
          </div>

          {/* Card 4: Trọn vị */}
          <div className="bg-white p-6 sm:p-7 rounded-xl border border-[#8A5A3B]/10 hover:border-[#8A5A3B]/30 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#2F5D7E]/10 text-[#2F5D7E] flex items-center justify-center group-hover:bg-[#2F5D7E] group-hover:text-white transition-colors">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#252525]">
                4. Trọn vị
              </h3>
              <p className="text-xs sm:text-sm text-[#6B645C] leading-relaxed">
                Độ giòn rụm bên ngoài kết hợp cùng hậu vị béo bùi, ngọt thanh sâu trong vòm họng. Một hương vị khó quên cho những buổi trà chuyện sum vầy.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#8A5A3B]/10 text-[11px] text-[#2F5D7E] font-medium">
              Hậu vị ngọt bùi tự nhiên
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================
          SECTION 3 – FEATURED PRODUCTS ("Khám phá vị Mộc")
          ======================================================== */}
      <section id="featured-products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8A5A3B]">
              Sản phẩm nổi bật
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#252525]">
              Khám phá vị Mộc
            </h2>
            <p className="text-xs sm:text-sm text-[#6B645C]">
              Những dòng hạt điều được yêu thích nhất từ mộc vị rang muối đến sấy mộc nguyên bản.
            </p>
          </div>

          <button
            onClick={() => navigateTo('/products')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8A5A3B] hover:text-[#6E442B] group"
          >
            <span>Xem tất cả sản phẩm</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>


      {/* ========================================================
          SECTION 4 – BRAND STORY ("Mộc là cách chúng tôi trân trọng điều tự nhiên")
          ======================================================== */}
      <section className="bg-[#EFE9DC]/70 py-16 sm:py-20 border-y border-[#8A5A3B]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Visual Image */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#8A5A3B]/20">
                <img
                  src="/images/regenerated_image_1790908455367.png"
                  alt="Câu chuyện Mộc Điều - Tôn trọng giá trị nguyên bản"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-serif text-lg font-bold">Mộc vị từ đất mẹ</p>
                  <p className="text-xs text-white/90">Trọn vẹn tình yêu với nông sản quê hương</p>
                </div>
              </div>
            </div>

            {/* Story Text */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2F5D7E]">
                Triết lý thương hiệu
              </span>

              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#252525] leading-tight">
                Mộc là cách chúng tôi trân trọng điều tự nhiên.
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-[#6B645C] leading-relaxed">
                <p>
                  Tại <strong>Mộc Điều</strong>, chữ “Mộc” không chỉ là một tên gọi, mà là kim chỉ nam cho tất cả những gì chúng tôi làm. 
                  “Mộc” là <em>mộc mạc, tự nhiên, gần gũi, không cầu kỳ và luôn trân trọng giá trị nguyên bản</em>.
                </p>
                <p>
                  Giữa nhịp sống vội vã với vô vàn món ăn nhanh nhiều gia vị công nghiệp, một hạt điều mộc bùi béo mang đến khoảnh khắc lắng đọng bình yên. 
                  Chúng tôi không tìm cách làm hạt điều trở nên bóng bẩy bằng phụ gia, mà để chính hương vị thuần khiết của nó chạm đến trái tim người thưởng thức.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigateTo('/about')}
                  className="inline-flex items-center gap-2 bg-[#2F5D7E] hover:bg-[#22455E] text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all hover:shadow"
                >
                  <span>Khám phá câu chuyện Mộc Điều</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================
          SECTION 5 – PRODUCT JOURNEY
          Visual process: Chọn lọc → Chế biến → Đóng gói → Đến tay khách hàng
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8A5A3B]">
            Hành trình hạt điều
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#252525]">
            Từ nông trại đến khoảnh khắc sum vầy
          </h2>
          <p className="text-xs sm:text-sm text-[#6B645C]">
            Quy trình tối giản, tôn trọng chất lượng hạt điều qua từng công đoạn.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Step 1: Chọn lọc */}
          <div className="text-center space-y-3 relative group">
            <div className="w-16 h-16 rounded-full bg-[#FFFFFF] border-2 border-[#8A5A3B] text-[#8A5A3B] flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
              <Search className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#8A5A3B] uppercase tracking-wider">
                Bước 1
              </span>
              <h3 className="font-serif text-lg font-bold text-[#252525]">
                Chọn lọc
              </h3>
              <p className="text-xs text-[#6B645C] max-w-xs mx-auto leading-relaxed">
                Tuyển chọn những mẻ hạt điều căng tròn, chắc mẩy, phân loại kỹ lưỡng.
              </p>
            </div>
          </div>

          {/* Step 2: Chế biến */}
          <div className="text-center space-y-3 relative group">
            <div className="w-16 h-16 rounded-full bg-[#FFFFFF] border-2 border-[#8A5A3B] text-[#8A5A3B] flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
              <Flame className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#8A5A3B] uppercase tracking-wider">
                Bước 2
              </span>
              <h3 className="font-serif text-lg font-bold text-[#252525]">
                Chế biến
              </h3>
              <p className="text-xs text-[#6B645C] max-w-xs mx-auto leading-relaxed">
                Rang cẩn thận theo phương pháp thủ công mộc mạc, giữ độ giòn xốp tự nhiên.
              </p>
            </div>
          </div>

          {/* Step 3: Đóng gói */}
          <div className="text-center space-y-3 relative group">
            <div className="w-16 h-16 rounded-full bg-[#FFFFFF] border-2 border-[#8A5A3B] text-[#8A5A3B] flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
              <Package className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#8A5A3B] uppercase tracking-wider">
                Bước 3
              </span>
              <h3 className="font-serif text-lg font-bold text-[#252525]">
                Đóng gói
              </h3>
              <p className="text-xs text-[#6B645C] max-w-xs mx-auto leading-relaxed">
                Đóng hũ kín hoặc túi mộc thân thiện môi trường, chống ẩm bảo toàn vị giòn.
              </p>
            </div>
          </div>

          {/* Step 4: Đến tay khách hàng */}
          <div className="text-center space-y-3 relative group">
            <div className="w-16 h-16 rounded-full bg-[#FFFFFF] border-2 border-[#8A5A3B] text-[#8A5A3B] flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
              <Truck className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#8A5A3B] uppercase tracking-wider">
                Bước 4
              </span>
              <h3 className="font-serif text-lg font-bold text-[#252525]">
                Đến tay khách hàng
              </h3>
              <p className="text-xs text-[#6B645C] max-w-xs mx-auto leading-relaxed">
                Giao hàng nhanh chóng và chu đáo để mỗi hạt điều đến tay bạn luôn giòn rụm.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================
          SECTION 6 – CUSTOMER REVIEWS ("Vị Mộc trong lời khách hàng")
          Rule 13 & 30: "Review phải lấy từ database. Nếu database chưa có review:
          Hiển thị placeholder. KHÔNG tự tạo review giả."
          ======================================================== */}
      <section className="bg-white py-16 border-y border-[#8A5A3B]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2F5D7E]">
                Cảm nhận thực tế
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#252525]">
                Vị Mộc trong lời khách hàng
              </h2>
              <p className="text-xs sm:text-sm text-[#6B645C]">
                Chúng tôi tôn trọng cảm nhận chân thật từ khách hàng đã trải nghiệm sản phẩm.
              </p>
            </div>

            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#8A5A3B] text-[#8A5A3B] hover:bg-[#8A5A3B]/10 text-xs font-semibold transition-colors"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Gửi đánh giá của bạn</span>
            </button>
          </div>

          {/* Database Check: If no real reviews, display elegant placeholder as requested */}
          {publishedReviews.length === 0 ? (
            <div className="p-8 sm:p-12 rounded-2xl bg-[#F7F3EA] border border-dashed border-[#8A5A3B]/30 text-center space-y-4 max-w-2xl mx-auto">
              <div className="w-12 h-12 rounded-full bg-[#8A5A3B]/15 text-[#8A5A3B] flex items-center justify-center mx-auto">
                <Star className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-lg font-bold text-[#252525]">
                  Chưa có đánh giá nào được ghi nhận trong hệ thống
                </h3>
                <p className="text-xs sm:text-sm text-[#6B645C] leading-relaxed">
                  Mộc Điều luôn cam kết <strong>không sử dụng đánh giá giả mạo</strong>. 
                  Mỗi chia sẻ của bạn là động lực quý giá để chúng tôi hoàn thiện chất lượng sản phẩm từng ngày.
                </p>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="bg-[#8A5A3B] hover:bg-[#6E442B] text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-colors"
                >
                  Trở thành người đầu tiên chia sẻ cảm nhận
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {publishedReviews.slice(0, 3).map(rev => (
                <div 
                  key={rev.id}
                  className="p-6 rounded-xl bg-[#F7F3EA] border border-[#8A5A3B]/15 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < rev.rating ? 'fill-amber-500' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-[11px] text-[#6B645C]">
                        {formatDate(rev.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#252525] italic leading-relaxed">
                      "{rev.content}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#8A5A3B]/10">
                    <p className="text-xs font-bold text-[#252525]">{rev.customerName}</p>
                    {rev.productName && (
                      <p className="text-[11px] text-[#8A5A3B]">{rev.productName}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>


      {/* ========================================================
          SECTION 7 – BLOG ("Góc Mộc Điều")
          3 Latest posts
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8A5A3B]">
              Cẩm nang & kiến thức
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#252525]">
              Góc Mộc Điều
            </h2>
            <p className="text-xs sm:text-sm text-[#6B645C]">
              Bí quyết bảo quản, cách chọn hạt điều chuẩn ngon và câu chuyện phong vị Việt.
            </p>
          </div>

          <button
            onClick={() => navigateTo('/blog')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8A5A3B] hover:text-[#6E442B] group"
          >
            <span>Xem tất cả bài viết</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestPosts.map(post => (
            <article
              key={post.id}
              onClick={() => navigateTo(`/blog/${post.slug}`)}
              className="bg-white rounded-xl overflow-hidden border border-[#8A5A3B]/10 hover:border-[#8A5A3B]/30 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer group"
            >
              <div className="aspect-16/10 overflow-hidden bg-[#F7F3EA]">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 text-[11px] text-[#6B645C]">
                    <span className="px-2 py-0.5 rounded bg-[#8A5A3B]/10 text-[#8A5A3B] font-medium">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#252525] group-hover:text-[#8A5A3B] transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#6B645C] line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#8A5A3B]/10 flex items-center text-xs font-semibold text-[#8A5A3B] group-hover:text-[#6E442B]">
                  <span>Đọc tiếp</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>


      {/* ========================================================
          SECTION 8 – QR / CUSTOMER CARE
          Heading: "Đồng hành cùng Mộc Điều sau mỗi hộp hạt điều."
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2F5D7E] text-white rounded-2xl p-8 sm:p-12 shadow-xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#E4DCCB] font-medium">
                Chăm sóc sau mua hàng
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
                Đồng hành cùng Mộc Điều sau mỗi hộp hạt điều.
              </h2>
              <p className="text-sm sm:text-base text-white/80 max-w-xl leading-relaxed">
                Trên mỗi hộp hạt điều Mộc Điều đều có mã QR chuyên biệt. 
                Quét mã để tra cứu hướng dẫn bảo quản giữ độ giòn, gửi phản hồi trực tiếp cho đội ngũ, hoặc nhận ưu đãi thân thiết cho lần mua tiếp theo.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-white/90">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#E4DCCB]" />
                  <span>Xem hướng dẫn bảo quản chuẩn</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#E4DCCB]" />
                  <span>Gửi góp ý trực tiếp cho nhà sáng lập</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#E4DCCB]" />
                  <span>Đổi trả 1-1 nhanh nếu không vừa ý</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#E4DCCB]" />
                  <span>Hỗ trợ khách hàng chu đáo</span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => navigateTo('/qr')}
                  className="bg-[#F7F3EA] text-[#2F5D7E] hover:bg-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors shadow"
                >
                  Trải nghiệm trang Chăm Sóc QR
                </button>
              </div>
            </div>

            {/* QR Placeholder Box */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-white/20 text-center space-y-3">
                <div className="w-36 h-36 mx-auto bg-[#F7F3EA] border-2 border-dashed border-[#2F5D7E]/40 rounded-xl flex flex-col items-center justify-center p-3 text-[#2F5D7E]">
                  <QrCode className="w-16 h-16 stroke-1 mb-1" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">[QR CODE]</span>
                  <span className="text-[9px] text-[#6B645C]">Mộc Điều Care</span>
                </div>
                <p className="text-xs text-[#252525] font-semibold">
                  Mã QR in trên nắp hộp
                </p>
                <p className="text-[11px] text-[#6B645C]">
                  Quét bằng Zalo hoặc Camera điện thoại
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================
          SECTION 9 – CTA SECTION
          Heading: "Một chút vị Mộc cho hôm nay?"
          Text: "Khám phá những sản phẩm hạt điều từ Mộc Điều."
          CTA: "Mua ngay"
          ======================================================== */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#EFE9DC] border border-[#8A5A3B]/20 shadow-xs space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#8A5A3B] font-semibold">
            Thưởng thức trọn vẹn
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#252525]">
            Một chút vị Mộc cho hôm nay?
          </h2>
          <p className="text-sm sm:text-base text-[#6B645C] max-w-lg mx-auto">
            Khám phá những sản phẩm hạt điều từ Mộc Điều.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('/products')}
              className="bg-[#8A5A3B] hover:bg-[#6E442B] text-white px-8 py-3.5 rounded-lg text-base font-semibold shadow transition-all hover:shadow-md"
            >
              Mua ngay
            </button>
          </div>
        </div>
      </section>


      {/* Review Submission Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#8A5A3B]/20 relative">
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-4 right-4 text-[#6B645C] hover:text-[#252525]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-[#252525] mb-1">
              Gửi đánh giá của bạn
            </h3>
            <p className="text-xs text-[#6B645C] mb-4">
              Chia sẻ cảm nhận chân thật sau khi thưởng thức hạt điều Mộc Điều.
            </p>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#252525] mb-1">
                  Họ và tên của bạn *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Hoàng Anh"
                  value={reviewForm.customerName}
                  onChange={e => setReviewForm({ ...reviewForm, customerName: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-[#8A5A3B]/30 focus:border-[#8A5A3B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#252525] mb-1">
                  Sản phẩm bạn đã dùng *
                </label>
                <select
                  value={reviewForm.productName}
                  onChange={e => setReviewForm({ ...reviewForm, productName: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-[#8A5A3B]/30 focus:border-[#8A5A3B] focus:outline-none bg-white"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#252525] mb-1">
                  Mức độ hài lòng: {reviewForm.rating} sao
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
                  Cảm nhận chi tiết *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Hạt điều giòn bùi ra sao? Đóng gói như thế nào?..."
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
                  Gửi đánh giá
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
