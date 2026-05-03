import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = {
  children: ReactNode;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    'border-cyan-300/40 bg-cyan-400 text-slate-950 shadow-[0_0_34px_rgba(0,194,255,0.34)] hover:bg-cyan-300',
  secondary:
    'border-slate-300/70 bg-white/80 text-slate-950 hover:bg-white dark:border-white/15 dark:bg-white/8 dark:text-white dark:hover:bg-white/14',
  ghost:
    'border-transparent bg-transparent text-slate-700 hover:bg-slate-900/5 dark:text-slate-200 dark:hover:bg-white/8',
};

export function Button({ children, href, type = 'button', variant = 'primary', className, onClick }: ButtonProps) {
  const classes = cn(
    'inline-flex min-h-11 items-center justify-center rounded-full border px-5 text-sm font-bold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black',
    variants[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
