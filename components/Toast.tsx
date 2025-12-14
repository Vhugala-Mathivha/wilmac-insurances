import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  const icons = {
    success: <CheckCircle size={20} className="text-green-600" />,
    error: <AlertCircle size={20} className="text-red-600" />,
    info: <Info size={20} className="text-blue-600" />
  };

  return (
    <div className={`fixed top-24 right-6 z-[60] flex items-center p-4 rounded-xl border shadow-xl animate-fade-in-down ${styles[type]} min-w-[300px]`}>
      <div className="mr-3">{icons[type]}</div>
      <div className="font-medium text-sm">{message}</div>
      <button onClick={onClose} className="ml-auto pl-4 hover:opacity-70 transition-opacity">
        <X size={16} />
      </button>
    </div>
  );
};