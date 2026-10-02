import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Sparkles, 
  ArrowRight, 
  Leaf, 
  ShieldCheck, 
  Heart, 
  Award, 
  Check, 
  Search, 
  Flame, 
  Package, 
  Truck 
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo, settings } = useStore();

  return (
    <div className="space-y-16 sm:space-y-24 py-10 sm:py-16">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8A5A3B] flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Câu chuyện thương hiệu</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#252525]">
            Về Mộc Điều
          </h1>
          <p className="font-serif text-lg sm:text-2xl text-[#8A5A3B] italic">
            “Mộc vị tự nhiên – Trọn vị hạt điều.”
          </p>
          <p className="text-sm sm:text-base text-[#6B645C] leading-relaxed pt-2">
            Mộc Điều ra đời từ niềm yêu mến sâu sắc đối với nông sản Việt Nam và mong muốn mang đến những mẻ hạt điều mộc mạc, thuần khiết nhất đến từng gia đình.
          </p>
        </div>
      </section>

      {/* Story & Meaning of "Mộc" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#2F5D7E]">
              Ý nghĩa tên gọi
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#252525] leading-tight">
              Tại sao chúng tôi chọn chữ “Mộc”?
            </h2>
            
            <p className="text-sm sm:text-base text-[#6B645C] leading-relaxed">
              Trong tiếng Việt, chữ <strong>“Mộc”</strong> gợi lên sự giản dị, hiền hòa và chân chất. Đối với chúng tôi, Mộc đại diện cho 5 điều cốt lõi:
            </p>

            <div className="space-y-3 pt-2">
              {[
                { title: 'Mộc mạc', desc: 'Không cần lớp bao bọc hoa mỹ, giữ nguyên dáng vẻ chân thật của hạt điều quê nhà.' },
                { title: 'Tự nhiên', desc: 'Hạt điều sinh trưởng từ đất lành, hấp thụ nắng gió tự nhiên mà không can thiệp hóa chất.' },
                { title: 'Gần gũi', desc: 'Món ăn vặt thân thương trên bàn trà của gia đình, người thân và bạn hữu.' },
                { title: 'Không cầu kỳ', desc: 'Rang mộc với muối hạt tinh khiết, không tẩm ướp hương vị nhân tạo.' },
                { title: 'Trân trọng giá trị nguyên bản', desc: 'Vị bùi béo tự nhiên kéo dài ngọt hậu, lưu luyến khó phai.' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#8A5A3B]/10">
                  <div className="w-5 h-5 rounded-full bg-[#8A5A3B]/10 text-[#8A5A3B] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#252525]">{item.title}</h3>
                    <p className="text-xs text-[#6B645C] mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-[#EFE9DC]">
              <img
                src="/src/assets/images/regenerated_image_1790909542475.png"
                alt="Triết lý hạt điều mộc Mộc Điều"
                className="w-full h-auto object-cover"
              />
              <div className="p-6 bg-white space-y-2">
                <p className="font-serif text-lg font-bold text-[#252525]">
                  Phong cách: Premium + Natural + Minimal + Vietnamese
                </p>
                <p className="text-xs text-[#6B645C] leading-relaxed">
                  Một thiết kế mộc mạc nhưng chỉn chu, cao cấp mà gần gũi, tôn vinh hạt điều chuẩn Việt Nam.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4 Pillars */}
      <section className="bg-[#EFE9DC]/60 py-16 border-y border-[#8A5A3B]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8A5A3B]">
              Bốn trụ cột chất lượng
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#252525]">
              Điều tạo nên sự khác biệt
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-[#8A5A3B]/15 shadow-xs space-y-3">
              <Leaf className="w-8 h-8 text-[#8A5A3B]" />
              <h3 className="font-serif text-lg font-bold text-[#252525]">1. Tự nhiên</h3>
              <p className="text-xs text-[#6B645C] leading-relaxed">
                Nói không với chất bảo quản và hương liệu tạo màu.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#8A5A3B]/15 shadow-xs space-y-3">
              <ShieldCheck className="w-8 h-8 text-[#2F5D7E]" />
              <h3 className="font-serif text-lg font-bold text-[#252525]">2. Chọn lọc</h3>
              <p className="text-xs text-[#6B645C] leading-relaxed">
                Tỉ mỉ lựa chọn hạt điều tròn đều, đặc ruột, không lẫn hạt sâu hỏng.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#8A5A3B]/15 shadow-xs space-y-3">
              <Award className="w-8 h-8 text-[#8A5A3B]" />
              <h3 className="font-serif text-lg font-bold text-[#252525]">3. Tinh tế</h3>
              <p className="text-xs text-[#6B645C] leading-relaxed">
                Kỹ thuật căn chỉnh nhiệt độ rang mộc chuẩn xác giữ hạt giòn xốp.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#8A5A3B]/15 shadow-xs space-y-3">
              <Heart className="w-8 h-8 text-[#2F5D7E]" />
              <h3 className="font-serif text-lg font-bold text-[#252525]">4. Trọn vị</h3>
              <p className="text-xs text-[#6B645C] leading-relaxed">
                Vị bùi béo tự nhiên lan tỏa trọn vẹn trong từng khoảnh khắc thưởng thức.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Journey Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#2F5D7E]">
            Quy trình minh bạch
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#252525]">
            Hành trình hạt điều Mộc Điều
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <div className="p-5 bg-white rounded-xl border border-[#8A5A3B]/15 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#8A5A3B]/10 text-[#8A5A3B] flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#252525]">1. Chọn lọc</h3>
            <p className="text-xs text-[#6B645C]">Phân loại kích thước và loại bỏ khuyết điểm.</p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-[#8A5A3B]/15 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#8A5A3B]/10 text-[#8A5A3B] flex items-center justify-center mx-auto">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#252525]">2. Chế biến</h3>
            <p className="text-xs text-[#6B645C]">Rang mộc chuẩn nhiệt, giữ độ ẩm lý tưởng.</p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-[#8A5A3B]/15 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#8A5A3B]/10 text-[#8A5A3B] flex items-center justify-center mx-auto">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#252525]">3. Đóng gói</h3>
            <p className="text-xs text-[#6B645C]">Màng seal chống ẩm bảo toàn độ giòn rụm.</p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-[#8A5A3B]/15 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#8A5A3B]/10 text-[#8A5A3B] flex items-center justify-center mx-auto">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#252525]">4. Đến tay bạn</h3>
            <p className="text-xs text-[#6B645C]">Giao tận tay nhanh chóng và chu đáo.</p>
          </div>
        </div>

        <div className="text-center pt-6">
          <button
            onClick={() => navigateTo('/products')}
            className="inline-flex items-center gap-2 bg-[#8A5A3B] hover:bg-[#6E442B] text-white px-8 py-3.5 rounded-lg text-sm font-semibold transition-all shadow"
          >
            <span>Khám phá sản phẩm ngay</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};
