import React from 'react';

interface CalcButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'primary' | 'secondary';
  className?: string;
}

export function CalcButton({ 
  children, 
  onClick, 
  variant = 'default',
  className = ''
}: CalcButtonProps) {
  const baseStyles = 'h-16 rounded-full text-2xl font-medium focus:outline-none transition-colors';
  
  const variantStyles = {
    default: 'bg-zinc-600 text-white hover:bg-zinc-600 active:bg-zinc-800',
    primary: 'bg-orange-500 text-white hover:bg-orange-400 active:bg-orange-600',
    secondary: 'bg-zinc-300 text-black hover:bg-zinc-200 active:bg-zinc-400'
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}