import { type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from 'react';

type BaseProps = {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'ghost' | 'subtle';
  className?: string;
};

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never;
};

type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  type?: never;
};

type SecondaryButtonProps = ButtonProps | AnchorProps;

export default function SecondaryButton({
  children,
  size = 'md',
  variant = 'outline',
  href,
  className = '',
  type = 'button',
  ...props
}: SecondaryButtonProps) {
  const sizeClasses = {
    'sm': 'px-3 py-1.5 text-sm',
    'md': 'px-4 py-2 text-base',
    'lg': 'px-6 py-3 text-lg'
  };

  const variantClasses = {
    'outline': 'border border-neutral-300 dark:border-neutral-600 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800/50 text-neutral-700 dark:text-neutral-200',
    'ghost': 'border-0 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800/50 text-neutral-700 dark:text-neutral-200',
    'subtle': 'border-0 bg-neutral-100 dark:bg-neutral-800/30 hover:bg-neutral-200 dark:hover:bg-neutral-700/50 text-neutral-700 dark:text-neutral-200'
  };

  const baseClasses = "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 focus-ring cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type as 'button' | 'submit' | 'reset'}
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
