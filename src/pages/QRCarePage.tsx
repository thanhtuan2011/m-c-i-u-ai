import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  QrCode, 
  ShieldCheck, 
  Gift, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  PhoneCall, 
  BookOpen, 
  MessageSquare 
} from 'lucide-react';

export const QRCarePage: React.FC = () => {
  const { settings, addFeedback } = useStore();
  const [activeTab, setActiveTab] = useState<'storage' | 'feedback' | 'offer'>('storage');
  
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    phone: '',
    productPurchased: 'Hạt điều rang muối vỏ lụa',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackForm.name.trim() || !feedbackForm.phone.trim()) return;

    addFeedback({
      name: feedbackForm.name.trim(),
      phone: feedbackForm.phone.trim(),
      productPurchased: feedbackForm.productPurchased,
      message: feedbackForm.message.trim(),
      type: 'qr_care',
    });

    setSubmitted(true);
    setFeedbackForm({
      name: '',
      phone: '',
      productPurchased: 'Hạt điều rang muối vỏ lụa',
      message: '',
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2F5D7E]/10 text-[#2F5D7E] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Mã QR Chăm sóc khách hàng</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#252525]">
          Đồng hành cùng Mộc Điều sau mỗi hộp hạt điều.
        </h1>
        <p className="text-sm sm:text-base text-[#6B645C] leading-relaxed">
          Cảm ơn bạn đã lựa chọn Mộc Điều. Chúng tôi luôn đồng hành để đảm bảo mỗi hạt điều bạn thưởng thức đều trọn vẹn vị mộc tự nhiên.
        </p>
      </div>

      {/* QR Visual Card */}
      <div className="bg-[#2F5D7E] text-white rounded-2xl p-6 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <span className="text-xs uppercase tracking-widest text-[#E4DCCB] font-medium">
            Mã định danh sản phẩm
          </span>
          <h2 className="font-serif text-2xl font-bold">
            Trang hỗ trợ dành riêng cho người dùng đã sở hữu sản phẩm
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Mã QR trên mỗi nắp hũ hạt điều giúp bạn nhanh chóng tra cứu hướng dẫn bảo quản giữ độ giòn xốp, gửi góp ý trực tiếp hoặc kết nối với bộ phận chăm sóc khách hàng.
          </p>
          <div className="flex flex-wrap gap-3 pt-2 text-xs">
            <span className="bg-white/10 px-3 py-1 rounded">Hotline: {settings.hotlinePlaceholder}</span>
            <span className="bg-white/10 px-3 py-1 rounded">Zalo CSKH: {settings.zaloPlaceholder}</span>
          </div>
        </div>

        {/* QR Placeholder Graphic per prompt requirement */}
        <div className="bg-white p-5 rounded-2xl shadow-md text-center text-[#252525] shrink-0">
          <div className="w-36 h-36 mx-auto bg-[#F7F3EA] border-2 border-dashed border-[#2F5D7E]/40 rounded-xl flex flex-col items-center justify-center p-3 text-[#2F5D7E]">
            <QrCode className="w-16 h-16 stroke-1 mb-1" />
            <span className="text-[10px] font-bold uppercase tracking-wider">[QR CODE]</span>
            <span className="text-[9px] text-[#6B645C]">Mộc Điều Verify</span>
          </div>
          <p className="text-[11px] font-bold mt-2">Mã QR in trên hộp</p>
          <p className="text-[10px] text-[#6B645C]">Quét để vào trang này</p>
        </div>
      </div>

      {/* Interactive Tabs */}
      <div className="bg-white rounded-2xl border border-[#8A5A3B]/15 overflow-hidden shadow-xs">
        <div className="grid grid-cols-3 border-b border-[#8A5A3B]/10 text-center">
          <button
            onClick={() => setActiveTab('storage')}
            className={`py-3.5 px-2 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
              activeTab === 'storage'
                ? 'border-[#8A5A3B] text-[#8A5A3B] bg-[#F7F3EA]/40'
                : 'border-transparent text-[#6B645C] hover:text-[#252525]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Hướng dẫn bảo quản</span>
          </button>

          <button
            onClick={() => setActiveTab('feedback')}
            className={`py-3.5 px-2 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
              activeTab === 'feedback'
                ? 'border-[#8A5A3B] text-[#8A5A3B] bg-[#F7F3EA]/40'
                : 'border-transparent text-[#6B645C] hover:text-[#252525]'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Gửi phản hồi sau dùng</span>
          </button>

          <button
            onClick={() => setActiveTab('offer')}
            className={`py-3.5 px-2 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
              activeTab === 'offer'
                ? 'border-[#8A5A3B] text-[#8A5A3B] bg-[#F7F3EA]/40'
                : 'border-transparent text-[#6B645C] hover:text-[#252525]'
            }`}
          >
            <Gift className="w-4 h-4" />
            <span>Nhận ưu đãi mua lại</span>
          </button>
        </div>

        <div className="p-6 sm:p-10">
          
          {/* Tab 1: Storage */}
          {activeTab === 'storage' && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="space-y-2">
                <h3 className="font-serif text-xl font-bold text-[#252525]">
                  4 mẹo giữ hạt điều luôn giòn tan như mới rang
                </h3>
                <p className="text-xs text-[#6B645C]">
                  Hạt điều Mộc Điều hoàn toàn không dùng chất bảo quản nhân tạo, do đó việc bảo quản đúng cách sẽ giúp bạn thưởng thức trọn vẹn nhất.
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-[#F7F3EA] border border-[#8A5A3B]/10 space-y-1">
                  <p className="font-bold text-[#8A5A3B]">1. Vặn chặt nắp ngay sau khi lấy hạt</p>
                  <p className="text-[#6B645C]">Không khí ẩm bên ngoài là nguyên nhân chính khiến hạt bị ỉu. Hãy lấy vừa đủ lượng ăn trong một lần rồi đậy kín nắp ngay.</p>
                </div>

                <div className="p-4 rounded-xl bg-[#F7F3EA] border border-[#8A5A3B]/10 space-y-1">
                  <p className="font-bold text-[#8A5A3B]">2. Bảo quản ngăn mát tủ lạnh</p>
                  <p className="text-[#6B645C]">Nếu chưa dùng hết sau 2 tuần, bạn có thể để hũ hạt điều vào ngăn mát tủ lạnh. Môi trường lạnh và khô ráo sẽ giữ độ giòn bùi cực tốt.</p>
                </div>

                <div className="p-4 rounded-xl bg-[#F7F3EA] border border-[#8A5A3B]/10 space-y-1">
                  <p className="font-bold text-[#8A5A3B]">3. Mẹo phục hồi độ giòn bằng nồi chiên không dầu</p>
                  <p className="text-[#6B645C]">Nếu hạt lỡ bị ỉu nhẹ do để hở, hãy sấy ở 140°C trong 3 phút, để nguội hoàn toàn hạt sẽ giòn rụm trở lại.</p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-2">
                  <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
                  <p className="text-xs">
                    <strong>Cam kết đổi trả:</strong> Nếu sản phẩm mới mở nắp nhưng có dấu hiệu ỉu hoặc lỗi chất lượng, hãy bấm tab "Gửi phản hồi" hoặc liên hệ Hotline để được đổi hũ mới hoàn toàn miễn phí.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Feedback */}
          {activeTab === 'feedback' && (
            <div className="max-w-lg mx-auto space-y-4">
              <div className="text-center space-y-1 mb-4">
                <h3 className="font-serif text-xl font-bold text-[#252525]">
                  Góp ý trực tiếp cho đội ngũ Mộc Điều
                </h3>
                <p className="text-xs text-[#6B645C]">
                  Bạn thấy hạt điều đợt này giòn vừa ý không? Độ muối có vừa miệng?
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-serif text-lg font-bold text-emerald-900">
                    Mộc Điều đã nhận được phản hồi!
                  </h4>
                  <p className="text-xs text-emerald-700">
                    Cảm ơn bạn đã dành thời gian quý báu để góp ý. Chúng tôi sẽ liên hệ lại nếu bạn cần hỗ trợ đổi trả.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-semibold text-emerald-800 underline mt-2"
                  >
                    Gửi phản hồi khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#252525] mb-1">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Tên của bạn"
                      value={feedbackForm.name}
                      onChange={e => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-lg border border-[#8A5A3B]/30 focus:border-[#8A5A3B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#252525] mb-1">
                      Số điện thoại nhận hỗ trợ *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="09xx xxx xxx"
                      value={feedbackForm.phone}
                      onChange={e => setFeedbackForm({ ...feedbackForm, phone: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-lg border border-[#8A5A3B]/30 focus:border-[#8A5A3B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#252525] mb-1">
                      Sản phẩm bạn đang dùng *
                    </label>
                    <select
                      value={feedbackForm.productPurchased}
                      onChange={e => setFeedbackForm({ ...feedbackForm, productPurchased: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-lg border border-[#8A5A3B]/30 focus:border-[#8A5A3B] focus:outline-none bg-white"
                    >
                      <option value="Hạt điều rang muối vỏ lụa">Hạt điều rang muối vỏ lụa</option>
                      <option value="Hạt điều rang mộc không muối">Hạt điều rang mộc không muối</option>
                      <option value="Hộp quà Mộc Điều">Hộp quà Mộc Điều</option>
                      <option value="Túi zip hạt điều tiện lợi">Túi zip hạt điều tiện lợi</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#252525] mb-1">
                      Nội dung cảm nhận / Góp ý *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Hạt giòn bùi ra sao? Đóng gói hộp thế nào?..."
                      value={feedbackForm.message}
                      onChange={e => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-lg border border-[#8A5A3B]/30 focus:border-[#8A5A3B] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#8A5A3B] hover:bg-[#6E442B] text-white rounded-lg text-xs font-semibold shadow flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Gửi phản hồi cho Mộc Điều</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Tab 3: Offer */}
          {activeTab === 'offer' && (
            <div className="max-w-md mx-auto text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#8A5A3B]/10 text-[#8A5A3B] flex items-center justify-center mx-auto">
                <Gift className="w-7 h-7" />
              </div>

              <h3 className="font-serif text-xl font-bold text-[#252525]">
                Ưu đãi tri ân khách hàng thân thiết
              </h3>

              <div className="p-4 rounded-xl bg-[#F7F3EA] border border-[#8A5A3B]/20 space-y-2">
                <span className="text-[11px] text-[#6B645C] block">Mã ưu đãi cho lần mua tiếp theo:</span>
                <span className="font-mono text-xl font-bold text-[#8A5A3B] tracking-wider block">
                  TRIANMOC10
                </span>
                <p className="text-xs text-[#6B645C]">
                  Giảm 10% cho đơn hàng tiếp theo khi mua trực tiếp trên website Mộc Điều.
                </p>
              </div>

              <p className="text-xs text-[#6B645C]">
                Bạn chỉ cần nhập mã trên ở trang thanh toán khi mua lại.
              </p>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
