import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentPath, navigateTo, cartCount, setIsCartOpen, settings } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Trang chủ', path: '/' },
    { label: 'Sản phẩm', path: '/products' },
    { label: 'Về Mộc Điều', path: '/about' },
    { label: 'Góc Mộc Điều', path: '/blog' },
    { label: 'Chăm sóc / QR', path: '/qr' },
    { label: 'Liên hệ', path: '/contact' },
  ];

  const handleNav = (path: string) => {
    navigateTo(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <aside aria-label="Thông báo ưu đãi" className="bg-[#2F5D7E] text-[#F7F3EA] text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E4DCCB] animate-pulse"></span>
        <span>{settings.announcementText}</span>
      </aside>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#F7F3EA]/95 backdrop-blur-md border-b border-[#8A5A3B]/10 transition-luxury">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <button 
            onClick={() => handleNav('/')}
            className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-none"
            aria-label="Về trang chủ Mộc Điều"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/90 p-1 border border-[#8A5A3B]/20 shadow-xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform overflow-hidden">
              <img 
                src="/images/regenerated_image_1790905757458.png" 
                alt="Logo biểu trưng Mộc Điều" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span 
                className="text-2xl sm:text-3xl font-extrabold tracking-wider text-[#8A5A3B] group-hover:text-[#6E442B] transition-colors whitespace-nowrap inline-block"
              >
                MỘC ĐIỀU
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#2F5D7E] font-semibold -mt-0.5">
                Mộc vị tự nhiên
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav 
            style={{ width: '623.552px' }}
            className="hidden md:flex items-center space-x-7" 
            aria-label="Menu chính"
          >
            {navLinks.map(link => {
              const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`text-sm tracking-wide transition-colors font-medium relative py-1 focus:outline-none ${
                    isActive 
                      ? 'text-[#8A5A3B] font-semibold' 
                      : 'text-[#252525]/80 hover:text-[#8A5A3B]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8A5A3B] rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions: Cart, Buy Now, Mobile Menu */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Admin link badge */}
            <button
              onClick={() => handleNav('/admin')}
              className={`hidden lg:inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded border transition-colors ${
                currentPath.startsWith('/admin')
                  ? 'bg-[#2F5D7E] text-white border-[#2F5D7E]'
                  : 'text-[#2F5D7E] border-[#2F5D7E]/30 hover:bg-[#2F5D7E]/10'
              }`}
              title="Quản trị nội dung"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label={`Giỏ hàng có ${cartCount} sản phẩm`}
              className="relative p-2.5 rounded-full text-[#252525] hover:text-[#8A5A3B] hover:bg-[#8A5A3B]/10 transition-colors focus:outline-none"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#8A5A3B] text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {/* Desktop CTA: Mua ngay */}
            <button
              onClick={() => handleNav('/products')}
              className="hidden sm:inline-flex items-center gap-2 bg-[#8A5A3B] hover:bg-[#6E442B] text-white px-5 py-2.5 rounded text-sm font-medium shadow-sm transition-all hover:shadow hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Mua ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Mở menu chuyển trang"
              className="md:hidden p-2 rounded-lg text-[#252525] hover:bg-[#8A5A3B]/10 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#8A5A3B]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer / Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#F7F3EA] border-b border-[#8A5A3B]/20 px-6 py-5 shadow-xl animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map(link => {
                const isActive = currentPath === link.path;
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNav(link.path)}
                    className={`text-left py-2 px-3 rounded-lg text-base font-medium transition-colors ${
                      isActive 
                        ? 'bg-[#8A5A3B]/10 text-[#8A5A3B] font-semibold' 
                        : 'text-[#252525] hover:bg-black/5'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}

              <div className="pt-3 border-t border-[#8A5A3B]/10 flex flex-col gap-2">
                <button
                  onClick={() => handleNav('/products')}
                  className="w-full py-3 bg-[#8A5A3B] text-white rounded text-center font-medium shadow-sm flex items-center justify-center gap-2"
                >
                  <span>Khám phá & Mua ngay</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleNav('/admin')}
                  className="w-full py-2.5 border border-[#2F5D7E] text-[#2F5D7E] rounded text-center text-sm font-medium flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Vào trang quản trị (Admin Dashboard)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
