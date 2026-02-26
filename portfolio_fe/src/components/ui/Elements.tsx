import type { ReactNode, ButtonHTMLAttributes } from 'react';
import trigslinkLogo from '/images/trigslink_logo.png';

export const XTwitterIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const Logo = ({ className = "w-10 h-10" }) => (
  <img src={trigslinkLogo} alt="Trigslink Protocol" className={`${className} object-contain`} />
);

export const GlitchText = ({ text }: { text: string }) => (
  <span className="relative inline-block group/glitch">
    <span className="relative z-10">{text}</span>
    <span className="absolute top-0 left-0 -ml-0.5 translate-x-[2px] text-red-500 opacity-0 group-hover:opacity-70 mix-blend-screen animate-pulse pointer-events-none">{text}</span>
    <span className="absolute top-0 left-0 -ml-0.5 -translate-x-[2px] text-blue-500 opacity-0 group-hover:opacity-70 mix-blend-screen animate-pulse delay-75 pointer-events-none">{text}</span>
  </span>
);

export const SectionTitle = ({ children, subtitle, align = 'center' }: { children: ReactNode, subtitle?: string, align?: 'center' | 'left' }) => (
  <div className={`mb-10 md:mb-16 px-4 w-full ${align === 'center' ? 'text-center' : 'text-left'}`}>
    <div className={`flex items-center gap-2 mb-4 text-blue-500 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
      <span className="w-6 md:w-8 h-[1px] bg-blue-500"></span> Protocol Logic <span className="w-6 md:w-8 h-[1px] bg-blue-500"></span>
    </div>
    <h2 className="text-xl sm:text-2xl md:text-4xl font-black text-white mb-4 md:mb-6 tracking-tighter font-lastica uppercase w-full max-w-full overflow-hidden text-ellipsis px-2 leading-tight">
      {children}
    </h2>
    {subtitle && <p className="text-gray-400 max-w-2xl text-sm md:text-lg leading-relaxed font-light mx-auto px-2">{subtitle}</p>}
  </div>
);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'silverRotating';
  className?: string;
}

export const Button = ({ children, variant = 'primary', className = '', ...props }: ButtonProps) => {
  const baseStyle = "relative px-6 md:px-8 py-3 font-mono text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-200 overflow-hidden group touch-manipulation";
  const variants: Record<string, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-500 clip-path-slant active:scale-95",
    secondary: "bg-transparent border border-gray-700 text-gray-300 hover:border-blue-500 hover:text-white active:bg-gray-800",
    outline: "text-blue-400 border border-blue-500/30 hover:bg-blue-500/10",
    silverRotating: "p-0",
  };

  if (variant === 'silverRotating') {
    return (
      <button className={`relative p-[1px] group overflow-hidden rounded-md ${className} active:scale-95 transition-transform`} {...props}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#e5e5e5] to-[#1a1a1a] bg-[length:200%_100%] animate-silver-rotate"></div>
        <div className="relative px-6 py-2 bg-black rounded-[5px] h-full w-full flex items-center justify-center gap-2 font-mono text-[10px] font-bold tracking-widest uppercase text-white transition-colors group-hover:text-[#e5e5e5] group-hover:bg-[#0a0a0c]">
          {children}
        </div>
      </button>
    );
  }
  
  return (
    <button className={`${baseStyle} ${variants[variant || 'primary']} ${className}`} {...props}>
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </button>
  );
};