import { type ButtonHTMLAttributes, type ReactNode } from 'react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function PrimaryButton({ 
  children, 
  className = '',
  type = 'button',
  ...props 
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      className={`primary-button text-black after:bg-white dark:text-white dark:after:bg-black justify-center place-content-center ${className}`}
      {...props}
    >
      {children}
      <style>{`
        .primary-button {
          display: flex;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          background: none;
        }

        .primary-button::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(red, yellow, lime, aqua, blue, magenta, red);
          animation: spin 2s linear infinite;
          z-index: -2;
        }

        .primary-button::after {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          right: 2px;
          bottom: 2px;
          border-radius: 4px;
          z-index: -1;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
}
