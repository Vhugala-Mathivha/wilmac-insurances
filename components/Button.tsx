import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'black';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 border text-base font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "border-transparent text-white bg-olive-600 hover:bg-olive-700 focus:ring-olive-500 shadow-lg hover:shadow-xl",
    secondary: "border-transparent text-olive-700 bg-olive-100 hover:bg-olive-200 focus:ring-olive-500",
    outline: "border-olive-600 text-olive-600 bg-transparent hover:bg-olive-50 focus:ring-olive-500",
    black: "border-transparent text-white bg-black-rich hover:bg-gray-800 focus:ring-gray-900",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};