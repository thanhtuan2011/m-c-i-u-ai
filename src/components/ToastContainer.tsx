import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, Info, AlertTriangle, AlertCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div 
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map(toast => {
        let icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
        let borderClass = 'border-emerald-500/30';
        let bgClass = 'bg-[#FFFFFF]';

        if (toast.type === 'error') {
          icon = <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />;
          borderClass = 'border-rose-500/30';
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />;
          borderClass = 'border-amber-500/30';
        } else if (toast.type === 'info') {
          icon = <Info className="w-5 h-5 text-[#2F5D7E] shrink-0" />;
          borderClass = 'border-[#2F5D7E]/30';
        }

        return (
          <div
            key={toast.id}
            className={`${bgClass} ${borderClass} border shadow-lg rounded-xl p-3.5 flex items-center justify-between gap-3 pointer-events-auto transition-all duration-300 animate-in slide-in-from-bottom-3`}
          >
            <div className="flex items-center gap-2.5">
              {icon}
              <p className="text-xs font-medium text-[#252525] leading-snug">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-[#6B645C] hover:text-[#252525] p-1 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
