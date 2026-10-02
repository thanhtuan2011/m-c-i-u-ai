import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, ChevronDown } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings, addFeedback } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    addFeedback({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
      type: 'contact',
    });

    setSubmitted(true);
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  const faqs = [
    {
      q: 'Mộc Điều có hỗ trợ kiểm tra hàng trước khi thanh toán không?',
      a: 'Có. Khi nhận hàng từ đơn vị vận chuyển, bạn hoàn toàn có thể đồng kiểm tra quy cách đóng gói và bao bì bên ngoài trước khi thanh toán cho shipper.',
    },
    {
      q: 'Chính sách đổi trả nếu hạt điều bị ỉu hoặc có vấn đề chất lượng?',
      a: 'Mộc Điều áp dụng chính sách đổi trả 1-1 miễn phí trong vòng 7 ngày nếu hạt điều không giòn, có dấu hiệu gắt dầu hoặc lỗi bao bì do vận chuyển. Bạn chỉ cần liên hệ hotline hoặc quét mã QR trên hộp.',
    },
    {
      q: 'Thời gian giao hàng mất bao lâu?',
      a: 'Đơn hàng nội thành thường được giao trong 1 - 2 ngày làm việc. Các tỉnh thành khác trên toàn quốc thường từ 2 - 4 ngày.',
    },
    {
      q: 'Tôi muốn đặt mua số lượng lớn làm quà tặng doanh nghiệp thì sao?',
      a: 'Mộc Điều có các set hộp quà cao cấp tinh tế với giá ưu đãi riêng cho doanh nghiệp. Vui lòng để lại số điện thoại hoặc gửi tin nhắn tại form bên cạnh để được tư vấn thiết kế thiệp và hộp quà riêng.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#2F5D7E]">
          Kết nối cùng Mộc Điều
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#252525]">
          Liên hệ với chúng tôi
        </h1>
        <p className="text-sm sm:text-base text-[#6B645C] leading-relaxed">
          Chúng tôi luôn sẵn lòng lắng nghe mọi chia sẻ, thắc mắc và đóng góp từ bạn.
        </p>
      </div>

      {/* Main Grid: Form + Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        
        {/* Left Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-[#8A5A3B]/15 shadow-xs">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#252525] mb-2">
            Gửi tin nhắn trực tiếp
          </h2>
          <p className="text-xs sm:text-sm text-[#6B645C] mb-6">
            Điền thông tin bên dưới, Mộc Điều sẽ liên hệ lại với bạn trong thời gian sớm nhất.
          </p>

          {submitted ? (
            <div className="p-8 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-emerald-900">
                Cảm ơn bạn đã gửi tin nhắn!
              </h3>
              <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                Chúng tôi đã tiếp nhận thông tin và sẽ phản hồi đến bạn thật chu đáo.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-semibold text-emerald-800 underline"
              >
                Gửi thêm tin nhắn khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#252525] mb-1">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs p-3 rounded-lg border border-[#8A5A3B]/25 focus:border-[#8A5A3B] focus:outline-none bg-[#F7F3EA]/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#252525] mb-1">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0987 xxx xxx"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs p-3 rounded-lg border border-[#8A5A3B]/25 focus:border-[#8A5A3B] focus:outline-none bg-[#F7F3EA]/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#252525] mb-1">
                  Email liên hệ
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs p-3 rounded-lg border border-[#8A5A3B]/25 focus:border-[#8A5A3B] focus:outline-none bg-[#F7F3EA]/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#252525] mb-1">
                  Lời nhắn hoặc câu hỏi *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Bạn muốn hỏi về sản phẩm, tư vấn quà tặng, hay có thắc mắc gì khác?..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full text-xs p-3 rounded-lg border border-[#8A5A3B]/25 focus:border-[#8A5A3B] focus:outline-none bg-[#F7F3EA]/30"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#8A5A3B] hover:bg-[#6E442B] text-white rounded-lg text-xs sm:text-sm font-semibold shadow flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Gửi lời nhắn ngay</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Info Cards (All strict placeholders per Rule 30) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#8A5A3B]/15 shadow-xs space-y-6">
            <h2 className="font-serif text-lg font-bold text-[#252525]">
              Thông tin thương hiệu
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-[#252525]">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-[#8A5A3B]/10 text-[#8A5A3B] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-[#6B645C] block">Hotline chăm sóc khách hàng:</span>
                  <a href={`tel:${settings.hotlinePlaceholder}`} className="font-semibold text-[#8A5A3B] hover:underline">{settings.hotlinePlaceholder}</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-[#8A5A3B]/10 text-[#8A5A3B] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-[#6B645C] block">Email hỗ trợ:</span>
                  <a href={`mailto:${settings.emailPlaceholder}`} className="font-semibold text-[#8A5A3B] hover:underline">{settings.emailPlaceholder}</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-[#8A5A3B]/10 text-[#8A5A3B] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-[#6B645C] block">Địa chỉ trưng bày & xưởng rang:</span>
                  <span className="font-semibold">{settings.addressPlaceholder}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-[#8A5A3B]/10 text-[#8A5A3B] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-[#6B645C] block">Thời gian tiếp nhận:</span>
                  <span className="font-semibold">08:00 - 18:00 (Thứ 2 - Thứ 7)</span>
                </div>
              </div>
            </div>

            {/* Social channels */}
            <div className="pt-4 border-t border-[#8A5A3B]/10 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#6B645C] block">
                Kênh kết nối mạng xã hội
              </span>
              <div className="flex flex-col gap-2 text-xs text-[#6B645C]">
                <div>• TikTok: <a href="https://www.tiktok.com/@mocdieu_" target="_blank" rel="noopener noreferrer" className="text-[#8A5A3B] hover:underline font-semibold">@mocdieu_</a></div>
                <div>• Facebook: <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#8A5A3B] hover:underline font-semibold">Mộc Điều</a></div>
                <div>• Zalo: <a href="https://zalo.me/0389614159" target="_blank" rel="noopener noreferrer" className="text-[#8A5A3B] hover:underline font-semibold">0389614159</a></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* FAQ Accordion */}
      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#8A5A3B]/15 shadow-xs space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8A5A3B]">
            Giải đáp nhanh
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#252525]">
            Câu hỏi thường gặp
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-[#8A5A3B]/15 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full p-4 text-left font-semibold text-xs sm:text-sm text-[#252525] flex justify-between items-center bg-[#F7F3EA]/30 hover:bg-[#F7F3EA] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-[#8A5A3B] transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === index && (
                <div className="p-4 text-xs sm:text-sm text-[#6B645C] bg-white border-t border-[#8A5A3B]/10 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
