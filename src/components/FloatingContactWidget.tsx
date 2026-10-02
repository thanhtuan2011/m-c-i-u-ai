import React, { useState } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FloatingContactWidget: React.FC = () => {
  const { settings, currentPath } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  // Hide on admin dashboard
  if (currentPath.startsWith('/admin')) return null;

  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3 pointer-events-none select-none">
      
      {/* Expanded quick contact tray */}
      {isOpen && (
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-[#8A5A3B]/20 flex flex-col gap-2.5 animate-in fade-in slide-in-from-bottom-3 duration-200 min-w-[200px]">
          <div className="text-[11px] font-semibold text-[#8A5A3B] uppercase tracking-wider px-1 pb-1 border-b border-[#8A5A3B]/10 flex items-center justify-between">
            <span>Hỗ trợ Mộc Điều</span>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-[#6B645C] hover:text-[#252525] p-0.5 rounded"
              aria-label="Đóng bảng hỗ trợ"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Hotline */}
          <a
            href={`tel:${settings.hotlinePlaceholder}`}
            className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#8A5A3B]/10 transition-colors text-xs font-semibold text-[#252525]"
          >
            <div className="w-7 h-7 rounded-lg bg-[#8A5A3B] text-white flex items-center justify-center shrink-0">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="block text-[10px] text-[#6B645C] font-normal">Gọi Hotline</span>
              <span>{settings.hotlinePlaceholder}</span>
            </div>
          </a>

          {/* Zalo */}
          <a
            href={`https://zalo.me/${settings.zaloPlaceholder}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#2F5D7E]/10 transition-colors text-xs font-semibold text-[#252525]"
          >
            <div className="w-7 h-7 rounded-lg bg-[#2F5D7E] text-white flex items-center justify-center shrink-0 text-[11px] font-black">
              Z
            </div>
            <div>
              <span className="block text-[10px] text-[#6B645C] font-normal">Chat qua Zalo</span>
              <span>{settings.zaloPlaceholder}</span>
            </div>
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@mocdieu_"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-black/5 transition-colors text-xs font-semibold text-[#252525]"
          >
            <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center shrink-0 text-[11px] font-bold">
              TT
            </div>
            <div>
              <span className="block text-[10px] text-[#6B645C] font-normal">Kênh TikTok</span>
              <span>@mocdieu_</span>
            </div>
          </a>
        </div>
      )}

      {/* Main floating trigger buttons */}
      <div className="pointer-events-auto flex items-center gap-2">
        {/* Quick Zalo button */}
        <a
          href={`https://zalo.me/${settings.zaloPlaceholder}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-full bg-[#2F5D7E] hover:bg-[#22455E] text-white shadow-lg flex items-center justify-center font-bold text-xs transition-transform hover:scale-110 active:scale-95 border-2 border-white"
          title="Chat Zalo 0389614159"
          aria-label="Chat Zalo cùng Mộc Điều"
        >
          Zalo
        </a>

        {/* Quick Phone Call button */}
        <a
          href={`tel:${settings.hotlinePlaceholder}`}
          className="w-11 h-11 rounded-full bg-[#8A5A3B] hover:bg-[#6E442B] text-white shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95 border-2 border-white animate-pulse"
          title="Gọi Hotline 0389614159"
          aria-label="Gọi hotline Mộc Điều"
        >
          <Phone className="w-4 h-4" />
        </a>

        {/* Toggle Tray button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-11 h-11 rounded-full bg-white text-[#8A5A3B] shadow-lg flex items-center justify-center hover:bg-[#F7F3EA] transition-transform hover:scale-105 active:scale-95 border border-[#8A5A3B]/20"
          title="Mở thêm kênh liên hệ"
          aria-label="Mở kênh hỗ trợ"
        >
          {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
        </button>
      </div>

    </div>
  );
};
