import React from 'react';
import { useStore } from '../context/StoreContext';
import { QrCode, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, settings } = useStore();

  return (
    <footer className="bg-[#24211E] text-[#E5DFD4] pt-16 pb-12 border-t border-[#8A5A3B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-[#E5DFD4]/10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/90 p-1 border border-white/20 flex items-center justify-center shrink-0 overflow-hidden">
                <img 
                  src="/images/regenerated_image_1790905757458.png" 
                  alt="Logo Mộc Điều" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-3xl font-extrabold tracking-wider text-[#EFE9DC]">
                  {settings.brandName}
                </span>
                <p className="text-xs uppercase tracking-widest text-[#8A5A3B] font-medium mt-0.5">
                  {settings.slogan}
                </p>
              </div>
            </div>

            <p className="text-sm text-[#E5DFD4]/80 leading-relaxed max-w-md">
              Mộc Điều trân trọng vị bùi béo tự nhiên, mộc mạc và chân thật của hạt điều Việt Nam. Chúng tôi cam kết gìn giữ trọn vẹn hương vị nguyên bản trong từng khoảnh khắc thưởng thức.
            </p>

            {/* QR Care Feature box */}
            <div className="pt-2">
              <button
                onClick={() => navigateTo('/qr')}
                className="inline-flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 border border-[#8A5A3B]/30 rounded-lg text-left transition-all group"
              >
                <div className="p-2 bg-[#8A5A3B]/20 rounded text-[#EFE9DC]">
                  <QrCode className="w-5 h-5 text-[#EFE9DC]" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#EFE9DC] group-hover:text-white flex items-center gap-1">
                    <span>Đồng hành cùng Mộc Điều sau mua</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="text-[11px] text-[#E5DFD4]/60">
                    Tra cứu bảo quản & nhận ưu đãi quét QR
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-[#EFE9DC]">
              Khám phá
            </h3>
            <ul className="space-y-2 text-sm text-[#E5DFD4]/75">
              <li>
                <button onClick={() => navigateTo('/')} className="hover:text-[#EFE9DC] transition-colors">
                  Trang chủ
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/products')} className="hover:text-[#EFE9DC] transition-colors">
                  Sản phẩm hạt điều
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/about')} className="hover:text-[#EFE9DC] transition-colors">
                  Về Mộc Điều
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/blog')} className="hover:text-[#EFE9DC] transition-colors">
                  Góc Mộc Điều
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/contact')} className="hover:text-[#EFE9DC] transition-colors">
                  Liên hệ
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Policy & Support */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-[#EFE9DC]">
              Chính sách
            </h3>
            <ul className="space-y-2 text-sm text-[#E5DFD4]/75">
              <li>
                <span className="cursor-pointer hover:text-[#EFE9DC]" onClick={() => navigateTo('/qr')}>
                  Hướng dẫn bảo quản hạt
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-[#EFE9DC]" onClick={() => navigateTo('/contact')}>
                  Chính sách đổi trả & hoàn tiền
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-[#EFE9DC]" onClick={() => navigateTo('/contact')}>
                  Chính sách vận chuyển
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-[#EFE9DC]" onClick={() => navigateTo('/contact')}>
                  Bảo mật thông tin
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Social Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-[#EFE9DC]">
              Thông tin liên hệ
            </h3>
            <ul className="space-y-2.5 text-xs text-[#E5DFD4]/80">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#8A5A3B] shrink-0 mt-0.5" />
                <span>Hotline: <a href="tel:0389614159" className="text-[#EFE9DC] hover:text-[#8A5A3B] font-semibold transition-colors">0389614159</a></span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#8A5A3B] shrink-0 mt-0.5" />
                <span>Email: <a href="mailto:mocdieu2026@gmail.com" className="text-[#EFE9DC] hover:text-[#8A5A3B] font-medium transition-colors">mocdieu2026@gmail.com</a></span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#8A5A3B] shrink-0 mt-0.5" />
                <span>Địa chỉ: <strong className="text-[#EFE9DC] font-normal">Số 6A Chợ Bến Thành, Quận 1, TP. Hồ Chí Minh</strong></span>
              </li>
            </ul>

            {/* Social Channels */}
            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider text-[#E5DFD4]/60 block mb-2 font-medium">
                Kênh kết nối
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                <a
                  href="https://www.tiktok.com/@mocdieu_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-white/10 hover:bg-[#8A5A3B] transition-colors border border-white/15 rounded text-[#EFE9DC] inline-flex items-center gap-1"
                >
                  <span>TikTok: <strong>mocdieu_</strong></span>
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-white/10 hover:bg-[#8A5A3B] transition-colors border border-white/15 rounded text-[#EFE9DC] inline-flex items-center gap-1"
                >
                  <span>FB: <strong>Mộc Điều</strong></span>
                </a>
                <a
                  href="https://zalo.me/0389614159"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-white/10 hover:bg-[#8A5A3B] transition-colors border border-white/15 rounded text-[#EFE9DC] inline-flex items-center gap-1"
                >
                  <span>Zalo: <strong>0389614159</strong></span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E5DFD4]/60 gap-4">
          <p>© {new Date().getFullYear()} {settings.brandName}. Mộc vị tự nhiên – Trọn vị hạt điều. Bản quyền được bảo lưu.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => navigateTo('/admin')} className="hover:text-[#EFE9DC] underline text-[11px]">
              Quản trị viên (CMS)
            </button>
            <span>•</span>
            <span className="text-[11px] text-[#E5DFD4]/40">Mộc Điều Studio Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
