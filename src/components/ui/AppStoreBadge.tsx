import { cn } from '@/lib/cn';

type AppStoreBadgeProps = {
  href: string;
  label: string;
  subLabel: string;
  className?: string;
};

export function AppStoreBadge({ href, label, subLabel, className }: AppStoreBadgeProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={cn(
        'group/appstore relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/15 bg-black px-4 py-2.5 text-white shadow-[0_18px_50px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200/55 hover:shadow-[0_22px_70px_rgba(34,211,238,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300',
        className,
      )}
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/appstore:translate-x-full" />
      <svg
        className="relative z-10 h-6 w-6 shrink-0 fill-current transition-transform duration-300 group-hover/appstore:scale-105"
        viewBox="0 0 30 30"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M25.565 9.785c-.123.077-3.051 1.702-3.051 5.305.138 4.109 3.695 5.55 3.756 5.55-.061.077-.537 1.963-1.947 3.94C23.204 26.283 21.962 28 20.076 28c-1.794 0-2.438-1.135-4.508-1.135-2.223 0-2.852 1.135-4.554 1.135-1.886 0-3.22-1.809-4.4-3.496-1.533-2.208-2.836-5.673-2.882-9-.031-1.763.307-3.496 1.165-4.968 1.211-2.055 3.373-3.45 5.734-3.496 1.809-.061 3.419 1.242 4.523 1.242 1.058 0 3.036-1.242 5.274-1.242.966.001 3.542.292 5.137 2.745zM15.001 6.688c-.322-1.61.567-3.22 1.395-4.247C17.454 1.199 19.125.356 20.566.356c.092 1.61-.491 3.189-1.533 4.339-.935 1.242-2.545 2.177-4.032 1.993z" />
      </svg>
      <span className="relative z-10 flex min-w-0 flex-col items-start leading-none">
        <span className="max-w-full truncate text-[9px] font-black uppercase tracking-[0.18em] text-white/62">{subLabel}</span>
        <span className="mt-1 max-w-full truncate text-sm font-black tracking-normal text-white sm:text-[15px]">{label}</span>
      </span>
    </a>
  );
}
