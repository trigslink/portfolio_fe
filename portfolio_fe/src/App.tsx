import { useState, useEffect, useRef, type ReactNode, type MouseEvent, type ButtonHTMLAttributes } from 'react';
import Lenis from 'lenis';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Globe, 
  Zap, 
  Menu, 
  X as XIcon, 
  Github, 
  Youtube, 
  Activity,
  Database,
  Radio,
  ArrowRight,
} from 'lucide-react';
import trigslinkLogo from '/images/trigslink_logo.png';
import trigslinkFont from '/images/trigslink_font.png'; 
import asciiTerminal from '/images/ascii.png'; 

// Custom X Icon component for mobile menu and footer
const XTwitterIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// --- TypeScript Interfaces ---

interface NavigationItem {
  name: string;
  href: string;
  isExternal?: boolean;
}

interface FeatureItem {
  title: string;
  subtitle: string;
  description: string;
  icon: ReactNode;
  stat: string;
}

interface RoadmapItem {
  phase: string;
  title: string;
  items: string[];
  status: 'completed' | 'current' | 'upcoming';
}

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  hex: string;
  image: string;
}

interface Dot {
  x: number;
  y: number;
  z: number;
  neighbors: { idx: number; dist: number }[] | number[]; 
  pulse: number;
}

interface ProjectedDot {
  x: number;
  y: number;
  scale: number;
  z: number;
  originalIndex: number;
  pulse: number;
}

interface Signal {
  startIdx: number;
  endIdx: number;
  progress: number;
}

// --- Data Constants ---

const NAVIGATION: NavigationItem[] = [
  { name: 'PROTOCOL', href: '#features' },
  { name: 'NETWORK', href: '#architecture' },
  { name: 'ROADMAP', href: '#roadmap' },
  { name: 'TEAM', href: '#team' },
];

const FEATURES: FeatureItem[] = [
  {
    title: 'Autonomous Resolution',
    subtitle: 'Zero-Human Bottleneck',
    description: 'Trigslink provides 15-second autonomous settlement through machine-verified logic, bypassing human-centric dispute windows.',
    icon: <Zap className="w-8 h-8 text-blue-400" />, 
    stat: '15s Finality'
  },
  {
    title: 'Universal Liquidity (ULR)',
    subtitle: 'Cross-Chain Rails',
    description: 'Unifies fragmented cross-chain capital into global rails, allowing instant-settle bets from any network while protecting capital.',
    icon: <Globe className="w-8 h-8 text-blue-400" />,
    stat: 'ULR Engine'
  },
  {
    title: 'Machine Verified Grounding',
    subtitle: 'Evidence-Based Truth',
    description: 'Multi-node verification against official news wires and document repositories eliminates human heuristic bias.',
    icon: <ShieldCheck className="w-8 h-8 text-blue-400" />,
    stat: 'Node Integrity'
  },
  {
    title: 'Capital Velocity',
    subtitle: 'Institutional Efficiency',
    description: 'Eliminates the "Zombie Period" of locked capital, enabling high-frequency market makers to recycle liquidity instantly.',
    icon: <Activity className="w-8 h-8 text-blue-400" />,
    stat: '100% Utility'
  },
];

const ROADMAP: RoadmapItem[] = [
  {
    phase: 'PHASE 01',
    title: 'Deterministic Trust',
    items: ['Autonomous Resolution Layer','ULR Cross-Chain Bridge','Global Truth Pool Aggregator'],
    status: 'current' 
  },
  {
    phase: 'PHASE 02',
    title: 'Universal Rails',
    items: [ 'Verification Script SDK','Core Handshake Logic Deployment', 'Institutional API Launch'],
    status: 'upcoming'
  },
  {
    phase: 'PHASE 03',
    title: 'Global Truth Router',
    items: ['Parametric Underwriting Hub', 'DAO Treasury Automation', 'Enterprise Compliance Gateways'],
    status: 'upcoming'
  },
];

const TEAM: TeamMember[] = [
  { name: 'Aakash Jaiswal', role: 'AI & Backend Alchemist ', initials: 'AJ', hex: '0x01', image: '/images/aakash.png' },
  { name: 'Gianluca Godfrey', role: 'Onchain Evangelist', initials: 'GG', hex: '0x03', image: '/images/gianluca.png' },
  { name: 'Charles Cai', role: 'Onchain Evangelist', initials: 'CC', hex: '0x03', image: '/images/charles.png' },
  { name: 'Odudu Essien', role: 'Pixel Crafter', initials: 'OE', hex: '0x05', image: '/images/odudu.png' },
  { name: 'Yelena Cefalù', role: 'Growth & Crypto Kitana', initials: 'CC', hex: '0x03', image: '/images/yellie.png' }
];

const SOCIAL_LINKS = {
  github: 'https://github.com/trigslink', 
  youtube: 'https://youtube.com/@trigslink', 
  x: 'https://x.com/trigslink',
};

// --- Visual Components ---

const OperatorCard = ({ member }: { member: TeamMember }) => {
  const [glitchState, setGlitchState] = useState(0); 

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const runGlitchLoop = () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile && Math.random() > 0.3) return;
      const type = Math.floor(Math.random() * 3) + 1; 
      setGlitchState(type);
      const duration = Math.random() * 100 + 50;
      setTimeout(() => {
        setGlitchState(0);
        const nextDelay = Math.random() * 3000 + 2000; 
        timeoutId = setTimeout(runGlitchLoop, nextDelay);
      }, duration);
    };
    timeoutId = setTimeout(runGlitchLoop, Math.random() * 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="relative group w-full max-w-[288px] h-[420px] bg-[#0A0A0C] flex-shrink-0 mx-auto">
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible">
        <defs>
          <clipPath id="card-shape">
            <polygon points="20,0 100,0 100,100 80,100 0,100 0,20" /> 
          </clipPath>
        </defs>
        <path d="M20,1 L287,1 L287,419 L268,419 L268,419 L1,419 L1,20 Z" vectorEffect="non-scaling-stroke" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" className="transition-colors duration-300 group-hover:stroke-blue-500/80" />
        <path d="M1,20 L20,1" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="2" fill="none" />
        <path d="M268,419 L287,419" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="2" fill="none" />
      </svg>
      <div className="w-full h-full relative" style={{ clipPath: 'polygon(20px 0, 100% 0, 100% 100%, calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>
        <div className="relative h-[70%] w-full overflow-hidden bg-blue-900/10">
            <div className="absolute inset-0 z-10 opacity-30 mix-blend-overlay pointer-events-none animate-noise bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            <div className="absolute inset-0 z-10 opacity-20 pointer-events-none bg-[repeating-linear-gradient(transparent,transparent_2px,#000_3px)]"></div>
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${member.image})`, filter: 'grayscale(100%) sepia(100%) hue-rotate(180deg) saturate(1.5) brightness(0.8) contrast(1.2)' }}
            />
            <div 
                className="absolute inset-0 bg-cover bg-center z-20 pointer-events-none mix-blend-hard-light"
                style={{ backgroundImage: `url(${member.image})`, opacity: glitchState === 1 ? 0.8 : 0, clipPath: 'inset(10% 0 60% 0)', transform: 'translate(-5px, 0)', filter: 'grayscale(100%) sepia(100%) hue-rotate(180deg) brightness(1.5) contrast(1.5)' }}
            />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-[#0f0f12] border-t border-blue-900/30 p-6 flex flex-col justify-center">
            <h3 className="text-white font-bold font-mono text-base md:text-lg uppercase tracking-tight mb-1 truncate">{member.name}</h3>
            <div className="flex items-center justify-between">
                <span className="text-blue-400 font-mono text-[9px] md:text-[10px] uppercase tracking-widest truncate pr-2">{member.role}</span>
                <div className="h-1 w-1 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e] flex-shrink-0"></div>
            </div>
        </div>
      </div>
    </div>
  );
};

const CyberMetallicIcon = ({ children }: { children: ReactNode }) => (
  <div className="relative group/icon flex items-center justify-center p-4 shrink-0">
    <div className="absolute inset-0 bg-blue-600/30 blur-[30px] rounded-full scale-150 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-700" />
    <div className="relative w-16 h-16 rounded-[18px] flex items-center justify-center bg-[#0d0d0f] shadow-[10px_10px_20px_rgba(0,0,0,0.5),-2px_-2px_5px_rgba(255,255,255,0.05),inset_2px_2px_2px_rgba(255,255,255,0.1),inset_-2px_-2px_10px_rgba(0,0,0,0.8)] transition-all duration-500 group-hover/icon:-translate-y-1">
      <div className="absolute inset-[3px] rounded-[15px] bg-gradient-to-br from-[#ffffff] via-[#3b82f6] to-[#1e3a8a] border border-blue-400/30 shadow-inner overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,247,0.3),transparent_70%)]" />
      </div>
      <div className="relative z-10 text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]">
        <div style={{ filter: 'url(#blue-chrome)' }}>{children}</div>
      </div>
    </div>
  </div>
);

const TiltCard = ({ children, className = "" }: { children: ReactNode, className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    if (isTouchDevice || !cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12; 
    const rotateY = ((x - centerX) / centerX) * 12;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => { if (!isTouchDevice) setIsHovered(true); };
  const handleMouseLeave = () => { setIsHovered(false); setRotation({ x: 0, y: 0 }); };

  return (
    <div 
      ref={cardRef} 
      onMouseMove={handleMouseMove} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave} 
      className={`relative transition-all duration-300 ease-out transform-gpu w-full ${className}`} 
      style={{ transform: isHovered ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)` : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)', willChange: 'transform' }}
    >
      {children}
    </div>
  );
};

const CyberGlobe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const setDimensions = () => {
        const parent = canvas.parentElement;
        if(parent) { canvas.width = parent.offsetWidth; canvas.height = parent.offsetHeight; }
    };
    setDimensions();
    let width = canvas.width;
    let height = canvas.height;
    const getRadius = () => { if (width < 400) return 280; if (width < 768) return 320; return 380; };
    let GLOBE_RADIUS = getRadius();
    const DOT_COUNT = width < 768 ? 200 : 600;
    const DOT_RADIUS = 2;
    const CONNECTION_DISTANCE_3D = 95; 
    const MAX_ACTIVE_SIGNALS = width < 768 ? 30 : 60; 
    const SIGNAL_SPEED = 0.05;
    let rotation = 0;
    const dots: Dot[] = [];
    for(let i = 0; i < DOT_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / DOT_COUNT);
      const theta = Math.sqrt(DOT_COUNT * Math.PI) * phi;
      dots.push({ x: GLOBE_RADIUS * Math.cos(theta) * Math.sin(phi), y: GLOBE_RADIUS * Math.sin(theta) * Math.sin(phi), z: GLOBE_RADIUS * Math.cos(phi), neighbors: [], pulse: 0 });
    }
    for (let i = 0; i < DOT_COUNT; i++) {
        let possibleNeighbors: { idx: number; dist: number }[] = [];
        for (let j = 0; j < DOT_COUNT; j++) {
            if (i === j) continue;
            const dx = dots[i].x - dots[j].x; const dy = dots[i].y - dots[j].y; const dz = dots[i].z - dots[j].z;
            const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
            if (dist < CONNECTION_DISTANCE_3D) { possibleNeighbors.push({ idx: j, dist: dist }); }
        }
        possibleNeighbors.sort((a, b) => a.dist - b.dist);
        dots[i].neighbors = possibleNeighbors.slice(0, 5).map(n => n.idx);
    }
    let signals: Signal[] = [];
    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2; const cy = height * 0.15; 
      rotation += 0.0015;
      const projectedDots: ProjectedDot[] = dots.map((dot, i) => {
        if (dot.pulse > 0) dot.pulse -= 0.04;
        const x = dot.x * Math.cos(rotation) - dot.z * Math.sin(rotation);
        const z = dot.x * Math.sin(rotation) + dot.z * Math.cos(rotation);
        const scale = 500 / (500 + z); 
        return { x: cx + x * scale, y: cy + dot.y * scale, scale: scale, z: z, originalIndex: i, pulse: dot.pulse };
      });
      ctx.lineWidth = 0.6;
      projectedDots.forEach((dot, index) => {
        if (dot.scale < 0.25) return; 
        const originalDot = dots[dot.originalIndex];
        const neighbors = originalDot.neighbors as number[];
        neighbors.forEach((neighborIdx) => {
            const neighbor = projectedDots[neighborIdx];
            if (neighbor.z > -GLOBE_RADIUS && index < neighborIdx) {
                 const distScale = Math.min(dot.scale, neighbor.scale);
                 const alpha = Math.max(0.1, (distScale - 0.2) * 0.7); 
                 if (alpha > 0.05) {
                     const gradient = ctx.createLinearGradient(dot.x, dot.y, neighbor.x, neighbor.y);
                     gradient.addColorStop(0, `rgba(148, 163, 184, ${alpha})`); 
                     gradient.addColorStop(1, `rgba(180, 200, 220, ${alpha})`); 
                     ctx.strokeStyle = gradient; ctx.beginPath(); ctx.moveTo(dot.x, dot.y); ctx.lineTo(neighbor.x, neighbor.y); ctx.stroke();
                 }
            }
        });
      });
      if (signals.length < MAX_ACTIVE_SIGNALS && Math.random() > 0.90) {
          const startIndex = Math.floor(Math.random() * DOT_COUNT);
          const startDotRaw = dots[startIndex];
          const neighbors = startDotRaw.neighbors as number[];
          if (neighbors.length > 0) {
              const neighborIndex = neighbors[Math.floor(Math.random() * neighbors.length)];
              signals.push({ startIdx: startIndex, endIdx: neighborIndex, progress: 0 });
          }
      }
      signals = signals.filter(signal => {
          signal.progress += SIGNAL_SPEED;
          if (signal.progress >= 1) { dots[signal.endIdx].pulse = 1.0; return false; }
          const startDot = projectedDots[signal.startIdx];
          const endDot = projectedDots[signal.endIdx];
          if (!startDot || !endDot) return false;
          const curX = startDot.x + (endDot.x - startDot.x) * signal.progress;
          const curY = startDot.y + (endDot.y - startDot.y) * signal.progress;
          const scaleAvg = (startDot.scale + endDot.scale) / 2;
          ctx.shadowBlur = 8; ctx.shadowColor = "#FFD700";
          ctx.fillStyle = `rgba(255, 255, 200, ${1 - Math.abs(0.5 - signal.progress)})`;
          ctx.beginPath(); ctx.arc(curX, curY, 2 * scaleAvg, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0; 
          return true;
      });
      projectedDots.forEach(dot => {
        const pulseEffect = dot.pulse * 4; 
        const radius = (DOT_RADIUS + pulseEffect) * dot.scale;
        const alpha = Math.max(0.3, (dot.scale - 0.2)); 
        let r = 255; let g = 215; let b = 0;
        if (dot.pulse > 0) { g += dot.pulse * 40; b += dot.pulse * 200; }
        g = Math.min(255, g); b = Math.min(255, b);
        ctx.fillStyle = `rgba(${r}, ${Math.floor(g)}, ${Math.floor(b)}, ${alpha})`; 
        if (dot.scale > 0.8 || dot.pulse > 0.1) { ctx.shadowBlur = 15 * dot.scale; ctx.shadowColor = `rgba(255, 215, 0, ${alpha})`; } else { ctx.shadowBlur = 0; }
        ctx.beginPath(); ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    const handleResize = () => {
      setDimensions(); width = canvas.width; height = canvas.height; GLOBE_RADIUS = getRadius();
      for(let i = 0; i < DOT_COUNT; i++) {
        const phi = Math.acos(-1 + (2 * i) / DOT_COUNT); const theta = Math.sqrt(DOT_COUNT * Math.PI) * phi;
        dots[i].x = GLOBE_RADIUS * Math.cos(theta) * Math.sin(phi); dots[i].y = GLOBE_RADIUS * Math.sin(theta) * Math.sin(phi); dots[i].z = GLOBE_RADIUS * Math.cos(phi);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize); cancelAnimationFrame(animationFrameId); };
  }, []);
  return (
    <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full block opacity-60" style={{ maskImage: 'radial-gradient(circle at 50% 50%, black 0%, black 30%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 0%, black 30%, transparent 70%)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030304] via-transparent to-transparent opacity-80"></div>
    </div>
  );
};

const Logo = ({ className = "w-10 h-10" }) => (
  <img src={trigslinkLogo} alt="Trigslink Protocol" className={`${className} object-contain`} />
);

const GlitchText = ({ text }: { text: string }) => (
  <span className="relative inline-block group/glitch">
    <span className="relative z-10">{text}</span>
    <span className="absolute top-0 left-0 -ml-0.5 translate-x-[2px] text-red-500 opacity-0 group-hover:opacity-70 mix-blend-screen animate-pulse pointer-events-none">
      {text}
    </span>
    <span className="absolute top-0 left-0 -ml-0.5 -translate-x-[2px] text-blue-500 opacity-0 group-hover:opacity-70 mix-blend-screen animate-pulse delay-75 pointer-events-none">
      {text}
    </span>
  </span>
);

const SectionTitle = ({ children, subtitle, align = 'center' }: { children: ReactNode, subtitle?: string, align?: 'center' | 'left' }) => (
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
  variant?: 'primary' | 'secondary' | 'outline' | 'gradient' | 'cyberMobile' | 'luminousPill' | 'silverBorder' | 'silverRotating';
  className?: string;
}

const Button = ({ children, variant = 'primary', className = '', ...props }: ButtonProps) => {
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

// --- MAIN APP ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ duration: 2.0, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), syncTouch: true, touchMultiplier: 2});
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => { lenis.destroy(); };
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#030304] text-white font-sans selection:bg-blue-500/40 selection:text-white overflow-x-clip relative w-full max-w-[100vw]">
      
      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setMobileMenuOpen(false)}>
          <div className={`w-full max-w-[340px] bg-[#0A0A0C]/95 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl transform transition-all duration-500 flex flex-col relative ${mobileMenuOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`} onClick={(e) => e.stopPropagation()}>
             <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-3 opacity-90"><Logo className="w-8 h-8" /><img src={trigslinkFont} alt="Trigslink" className="h-5 object-contain" /></div>
                <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-white transition-colors p-2"><XIcon size={24} /></button>
             </div>
             <div className="flex flex-col gap-8 items-center text-center mb-12">
             {NAVIGATION.map((item) => {
                if (item.href === '/mcp') {
                  return (
                    <Link 
                      key={item.name} 
                      to="/mcp" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-[12px] font-mono font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest"
                    >
                      {item.name}
                    </Link>
                  );
                }
                return (
                  <a key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)} className="text-[12px] font-mono font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">
                    {item.name}
                  </a>
                );
              })}
             </div>
             <div className="flex justify-center gap-6 mt-auto">
                <a href={SOCIAL_LINKS.github} className="text-gray-500 hover:text-white transition-colors"><Github size={24}/></a>
                <a href={SOCIAL_LINKS.x} className="text-gray-500 hover:text-white transition-colors"><XTwitterIcon size={24}/></a>
                <a href={SOCIAL_LINKS.youtube} className="text-gray-500 hover:text-white transition-colors"><Youtube size={24}/></a>
             </div>
          </div>
      </div>

      <nav className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 rounded-2xl md:rounded-full border border-white/10 bg-[#050505]/90 backdrop-blur-xl px-4 md:px-6 py-3 transition-all duration-300 ${isScrolled ? 'shadow-2xl' : ''}`}>
        <div className="flex items-center justify-between relative">
          <div className="flex items-center gap-3 cursor-pointer group z-20" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <Logo className="w-8 h-8 transition-all duration-500 group-hover:rotate-180" />
            <img src={trigslinkFont} alt="TRIGSLINK" className="h-4 md:h-6 object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
          </div>
          
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8">
            {NAVIGATION.map((item) => (
              <a key={item.name} href={item.href} target={item.isExternal ? "_blank" : "_self"} className="text-[10px] font-mono font-medium text-gray-400 hover:text-white transition-colors relative group uppercase tracking-widest whitespace-nowrap">{item.name}</a>
            ))}
          </div>

          <div className="hidden md:block z-20">
            <Button variant="silverRotating">
              <a href="#" className="flex items-center gap-2">Whitepaper <ArrowRight size={12} /></a>
            </Button>
          </div>

          <div className="md:hidden z-20 flex items-center">
            <button onClick={() => setMobileMenuOpen(true)} className="text-gray-300 hover:text-white p-2">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-60 lg:pb-48 px-4 overflow-hidden flex items-center justify-center min-h-[90vh] md:min-h-screen">
        <CyberGlobe />
        <div className="w-full max-w-7xl mx-auto text-center relative z-20 pointer-events-auto px-2">
          <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-5xl font-light tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 leading-tight font-montserrat mb-2 md:mb-4">
            THE AUTONOMOUS
          </h1>
          <h1 className="flex flex-col items-center text-[10.5vw] sm:text-[10vw] md:text-[9vw] lg:text-[8.5vw] font-bold tracking-[-0.04em] mb-8 md:mb-12 text-white font-kora uppercase scale-y-[1.05] origin-center drop-shadow-2xl will-change-transform max-w-full overflow-hidden">
            <span className="block leading-[0.8] w-full break-words">TRUTH</span>
            <span className="block leading-[1] w-full break-words">ENGINE</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-xl text-gray-400 max-w-[280px] sm:max-w-sm md:max-w-4xl mx-auto mb-10 md:mb-16 tracking-[0.1em] md:tracking-[0.3em] font-light uppercase font-sans leading-relaxed">
            15-Second Autonomous Settlement • Universal Liquidity Rails • Machine-Verified Finality
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 py-16 md:py-32 bg-[#030304] w-full overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Deterministic trust through autonomous execution and machine grounding.">
            PROTOCOL PILLARS
          </SectionTitle>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {FEATURES.map((feature, idx) => {
              const statParts = feature.stat.split(' ');
              const statValue = statParts[0];
              const statUnit = statParts.slice(1).join(' ');

              return (
                <TiltCard key={idx} className="h-auto min-h-[350px] lg:h-[450px]">
                  <div className="relative h-full p-6 md:p-8 rounded-[32px] md:rounded-[42px] overflow-hidden group transition-all duration-500 bg-[#08080a]/90 backdrop-blur-3xl border border-white/5 shadow-[inset_0px_1px_2px_rgba(255,255,255,0.15),inset_0px_-2px_4px_rgba(0,0,0,0.7),0_20px_40px_rgba(0,0,0,0.6)] hover:border-blue-500/40 flex flex-col text-left">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(59,130,247,0.25),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05),transparent_40%)] pointer-events-none"></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-8 md:mb-10">
                        <CyberMetallicIcon>
                          {feature.icon}
                        </CyberMetallicIcon>
                        <div className="text-right pt-2 flex-shrink-0">
                          <div className="text-2xl md:text-3xl font-mono font-black text-white tracking-tighter mb-0.5 leading-none group-hover:text-blue-400 transition-colors">
                            {statValue}
                          </div>
                          <div className="text-[8px] md:text-[9px] text-blue-400/60 font-mono uppercase tracking-[0.2em] font-bold">
                            {statUnit}
                          </div>
                        </div>
                      </div>

                      <div className="mb-6 relative">
                        <h3 className="text-lg md:text-2xl font-bold text-white mb-3 font-sans tracking-tight leading-tight">
                          <GlitchText text={feature.title.trim()} />
                        </h3>
                        <div className="inline-block px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                          <span className="text-[8px] font-mono text-blue-400 uppercase tracking-[0.2em] font-black">
                            {feature.subtitle}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-500 text-xs md:text-[13px] leading-relaxed mt-auto border-t border-white/5 pt-6 group-hover:text-gray-300 transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>
        
        <svg className="absolute w-0 h-0 pointer-events-none">
          <defs>
          <filter id="black-chrome" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="0.8" result="blur" />
        <feSpecularLighting in="blur" surfaceScale="7" specularConstant="1.5" specularExponent="40" lightingColor="#ffffff" result="specOut">
          <fePointLight x="-5000" y="-10000" z="20000" />
        </feSpecularLighting>
        <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut" />
        <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
      </filter>
          </defs>
        </svg>
      </section>

      {/* Architecture */}
      <section id="architecture" className="relative z-10 py-16 md:py-32 px-4 overflow-hidden border-y border-white/5 bg-[#030304] w-full">
        <div className="max-w-6xl mx-auto w-full">
          <SectionTitle subtitle="A multi-layered execution proxy replacing human subjectivity with deterministic trust.">
            NETWORK TOPOLOGY
          </SectionTitle>
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="space-y-8 md:space-y-10 relative">
              <div className="absolute left-8 top-10 bottom-10 w-[2px] z-0 overflow-visible">
                <div className="absolute inset-0 bg-white/5 w-[1px] mx-auto"></div>
                <div className="absolute inset-0 w-full h-full opacity-30 animate-dotted-flow" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 40%, transparent 50%)', backgroundSize: '4px 20px', backgroundRepeat: 'repeat-y' }}></div>
              </div>

              {[
                { title: 'Autonomous Resolution Layer', desc: 'Intrigue logic replaces manual proposers, automatically triggering settlement.', icon: <Zap size={20} /> },
                { title: 'Unified Liquidity Layer', desc: 'The ULR aggregates depth across Ethereum, Solana, and Layer 2s into a single global order book.', icon: <Database size={20} /> },
                { title: 'Autonomous Grounding Layer', desc: 'Multiple independent nodes run AI checks against official news wires and document repositories.', icon: <Radio size={20} /> }
              ].map((step, i) => (
                <div key={i} className="relative flex gap-4 md:gap-8 items-start group">
                  <div className="relative z-10 flex-shrink-0 w-12 md:w-16 flex justify-center">
                    <CyberMetallicIcon>
                      {step.icon}
                    </CyberMetallicIcon>
                  </div>

                  <div className="pt-2 md:pt-3">
                    <h3 className="text-base md:text-xl font-bold text-white mb-2 tracking-tighter uppercase group-hover:text-blue-400 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-sm border-l border-white/10 pl-3 md:pl-4 group-hover:border-blue-500/50 transition-colors">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Terminal */}
            <div className="relative group w-full mt-8 lg:mt-0">
              <div className="absolute -inset-10 bg-blue-600/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative bg-[#08080a] border border-white/10 rounded-xl md:rounded-2xl overflow-hidden shadow-[inset_0px_1px_2px_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.8)] w-full">
                <div className="bg-white/5 px-3 py-3 flex items-center justify-between border-b border-white/5">
                  <div className="flex gap-1.5 md:gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
                  </div>
                  <div className="text-[8px] md:text-[9px] font-mono text-gray-500 uppercase tracking-widest font-bold">trigslink_mainnet.sh</div>
                </div>
                
                <div className="p-4 md:p-8 font-mono text-[10px] md:text-xs text-gray-400 h-[280px] md:h-[340px] bg-black/40 flex flex-col justify-between overflow-x-hidden">
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex gap-2 md:gap-3"><span className="text-blue-500">➜</span><span className="truncate">initiating_autonomous_handshake...</span></div>
                    <div className="pl-4 md:pl-6 text-blue-400/80 truncate">[INFO] Verifying grounding evidence... <span className="text-green-500 ml-1">SUCCESS</span></div>
                    <div className="flex gap-2 md:gap-3"><span className="text-blue-500">➜</span><span className="text-white font-black truncate">settlement-trigger --finality 15s</span></div>
                  </div>
                  
                  <div className="flex justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-500 py-4">
                    <img src={asciiTerminal} alt="ASCII" className="w-24 h-24 md:w-32 md:h-32 object-contain" />
                  </div>

                  <div className="bg-blue-900/10 p-3 md:p-4 rounded-xl border border-blue-500/20 shadow-inner w-full">
                     <div className="flex justify-between mb-2">
                       <span className="text-[9px] md:text-[10px] font-black text-blue-300 tracking-widest uppercase">Truth_Sync</span>
                       <span className="text-[9px] md:text-[10px] text-green-400 animate-pulse font-bold">100% SECURE</span>
                     </div>
                     <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-500 w-full shadow-[0_0_10px_#3b82f6]"></div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="relative z-10 py-16 md:py-32 bg-[#050507] w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Evolution from deterministic trust to a global ecosystem of autonomous truth.">MISSION TIMELINE</SectionTitle>
          <div className="relative">
            <div className="hidden md:block absolute top-[130px] left-0 w-full h-[2px] overflow-visible z-0">
                <div className="absolute inset-0 bg-blue-900/20"></div>
                <div className="absolute inset-0 opacity-50 animate-dotted-flow-horizontal" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 40%, transparent 50%)', backgroundSize: '20px 4px', backgroundRepeat: 'repeat-x', backgroundPosition: 'center' }}></div>
                <div className="absolute top-0 bottom-0 w-48 bg-gradient-to-r from-transparent via-blue-400 to-transparent blur-md opacity-0 animate-beam-slide"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-10">
              {ROADMAP.map((item, idx) => {
                const isCurrent = item.status === 'current';
                const isCompleted = item.status === 'completed';
                return (
                  <div key={idx} className={`group h-full p-5 md:p-8 border backdrop-blur-sm transition-all duration-300 flex flex-col relative rounded-xl md:rounded-none ${isCurrent ? 'bg-blue-900/10 border-blue-500/50 shadow-2xl' : 'bg-[#0a0a0c] border-gray-800 hover:border-gray-700'}`}>
                      <div className="mb-4 md:h-[90px] flex flex-col justify-start relative z-10 pr-16 md:pr-0">
                          <div className={`text-[10px] font-mono uppercase tracking-widest mb-2 md:mb-3 ${isCurrent ? 'text-blue-400' : 'text-gray-600'}`}>{item.phase}</div>
                          <h3 className="text-lg md:text-2xl font-bold text-white tracking-tight leading-tight">{item.title}</h3>
                          {isCurrent && <div className="absolute top-0 right-0 md:-top-3 md:-right-3 px-2 py-1 bg-blue-600 text-[8px] font-bold text-white uppercase tracking-wider rounded-sm">Processing</div>}
                      </div>
                      <div className="hidden md:flex relative h-[40px] items-center justify-start mb-6 z-20">
                           <div className={`w-4 h-4 rounded-full border-4 transition-all duration-500 relative ${isCurrent ? 'bg-black border-blue-500 shadow-xl scale-125' : isCompleted ? 'bg-blue-900 border-blue-800' : 'bg-black border-gray-700'}`}>
                              {isCurrent && <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75"></div>}
                           </div>
                      </div>
                      <ul className="space-y-3 mt-2 md:mt-auto relative z-10">
                        {item.items.map((point, i) => (
                          <li key={i} className="flex items-start gap-3"><span className={`mt-1.5 w-1.5 h-1.5 flex-shrink-0 rounded-sm ${isCurrent ? 'bg-blue-500' : 'bg-gray-700'}`}></span><span className="text-xs md:text-sm text-gray-400 group-hover:text-gray-300 transition-colors font-mono">{point}</span></li>
                        ))}
                      </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="relative z-10 py-16 md:py-32 px-4 bg-[#030304] border-t border-white/5 w-full">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Founding Team of the Trigslink Protocol">HALL OF FAME</SectionTitle>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 w-full">
            {TEAM.map((member, idx) => (<OperatorCard key={idx} member={member} />))}
          </div>
        </div>
      </section>

      <footer className="relative z-10 py-12 md:py-16 border-t border-white/10 bg-black w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-10 md:mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4 md:mb-6"><Logo className="w-8 h-8" /><img src={trigslinkFont} alt="TRIGSLINK" className="h-5 md:h-6 object-contain opacity-90" /></div>
              <p className="text-gray-500 text-xs md:text-sm max-w-sm leading-relaxed">The high-velocity truth layer for the decentralized economy. Securing data independence through deterministic settlement.</p>
            </div>
            
            <div>
               <h4 className="text-white font-bold mb-4 md:mb-6 font-mono text-xs md:text-sm uppercase tracking-widest opacity-80">Community</h4>
               <ul className="space-y-3 text-xs md:text-sm text-gray-500 mb-6">
                  <li className="hover:text-white transition-colors"><a href="#">Documentation</a></li>
                  <li className="hover:text-white transition-colors"><a href={SOCIAL_LINKS.github}>GitHub</a></li>
                  <li className="hover:text-white transition-colors"><a href="mailto:jaiswalraj03014@gmail.com">Contact Author</a></li>
               </ul>
               <div className="flex gap-4">
                  <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-gray-400 hover:bg-gray-800 hover:text-white transition-all"><Github size={18} /></a>
                  <a href={SOCIAL_LINKS.x} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-600/20 hover:text-white transition-all"><XTwitterIcon size={18} /></a>
                  <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all"><Youtube size={18} /></a>
               </div>
            </div>
          </div>

          <div className="pt-6 md:pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] md:text-[10px] lg:text-xs text-gray-600 font-mono uppercase tracking-widest text-center md:text-left">
            <div>© {new Date().getFullYear()} Trigslink Foundation. All rights reserved.</div>
            <div className="flex gap-4 md:gap-8"><span>Privacy Policy</span><span>Terms of Service</span></div>
          </div>
        </div>
      </footer>

      {/* CSS Modifications */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap');
        
        @font-face { font-family: 'kora'; src: url('/fonts/kora.ttf') format('opentype'); font-weight: normal; font-style: normal; font-display: block; }
        html { scroll-behavior: smooth; }
        
        .font-lastica { 
          font-family: 'kora', 'Michroma', sans-serif; 
          text-transform: uppercase; 
          display: block; 
          transform: scaleX(1.05); 
          transform-origin: center left; 
          backface-visibility: hidden; 
          -webkit-backface-visibility: hidden; 
          perspective: 1000px; 
          transform-style: preserve-3d; 
          will-change: transform; 
          letter-spacing: -0.02em; 
          line-height: 1; 
        }
        
        @media (min-width: 768px) {
           .font-lastica { 
             display: inline-block;
             transform: scaleX(1.25);
             transform-origin: center;
           }
        }

        .font-montserrat { font-family: 'Montserrat', sans-serif; }
        .clip-path-slant { clip-path: polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%); }
        .font-kora { font-family: 'kora', sans-serif; }

        @keyframes silver-rotate { 
          0% { background-position: 0% 50%; } 
          50% { background-position: 100% 50%; } 
          100% { background-position: 0% 50%; } 
        }
        .animate-silver-rotate { animation: silver-rotate 2.5s ease-in-out infinite; }
        
        @keyframes noise { 0% { background-position: 0 0; } 10% { background-position: -5% -10%; } 100% { background-position: 0 0; } }
        .animate-noise { animation: noise 0.5s steps(3) infinite; }

        @keyframes dotted-flow { 0% { background-position: 0 0; } 100% { background-position: 0 20px; } }
        .animate-dotted-flow { animation: dotted-flow 1s linear infinite; }

        @keyframes dotted-flow-horizontal { 0% { background-position: 0 0; } 100% { background-position: 20px 0; } }
        .animate-dotted-flow-horizontal { animation: dotted-flow-horizontal 1s linear infinite; }

        @keyframes beam-drop { 0% { top: -20%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 120%; opacity: 0; } }
        .animate-beam-drop { animation: beam-drop 3s ease-in-out infinite; }

        @keyframes beam-slide { 0% { left: -20%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { left: 120%; opacity: 0; } }
        .animate-beam-slide { animation: beam-slide 3s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) { .animate-noise, .animate-dotted-flow, .animate-beam-drop, .animate-silver-rotate { animation: none; } }
      `}} />
    </div>
  );
}