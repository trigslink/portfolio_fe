import { useState, useEffect, useRef, type ReactNode, type MouseEvent, type ButtonHTMLAttributes } from 'react';
import Lenis from 'lenis';
import { 
  Cpu, 
  Globe, 
  Zap, 
  Menu, 
  X, 
  Github, 
  Youtube, 
  Wallet,
  Activity,
  Server,
  Database,
  Radio,
  Play
} from 'lucide-react';
import trigslinkLogo from '/images/trigslink_logo_dark.jpeg';
import trigslinkFont from '/images/trigslink_font.png'; 
import asciiTerminal from '/images/ascii.png'; 

// --- TypeScript Interfaces ---

interface NavigationItem {
  name: string;
  href: string;
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
    title: 'GPU Marketplace',
    subtitle: 'Plug-and-Earn Infrastructure',
    description: 'DePIN architecture allowing idle hardware to monetize compute instantly. No gatekeepers, purely permissionless.',
    icon: <Cpu className="w-8 h-8 text-blue-400" />, 
    stat: '99.9% Uptime'
  },
  {
    title: 'Auto-Pilot Contracts',
    subtitle: 'Smart Execution Layer',
    description: 'Tasks, staking, and payouts execute autonomously onchain. The ledger becomes the single source of truth.',
    icon: <Zap className="w-8 h-8 text-blue-400" />,
    stat: '<50ms Latency'
  },
  {
    title: 'Sovereign Rails',
    subtitle: 'Protocol > Platform',
    description: 'Community-governed infrastructure. Eliminate platform risk with decentralized, immutable logic.',
    icon: <Globe className="w-8 h-8 text-blue-400" />,
    stat: 'DAO Gov'
  },
  {
    title: 'Neural Context',
    subtitle: 'Shared Memory State',
    description: 'Agents share context like neurons—securely and in real-time, preventing context black holes.',
    icon: <Activity className="w-8 h-8 text-blue-400" />,
    stat: 'Real-time'
  },
];

const ROADMAP: RoadmapItem[] = [
  {
    phase: 'PHASE 01',
    title: 'Foundation',
    items: ['ElizaOS Consumer Integration', 'Onchain Response Integrity', 'Core Smart Contracts Deployment'],
    status: 'completed'
  },
  {
    phase: 'PHASE 02',
    title: 'Expansion',
    items: ['Identity-based Memory', 'Individual MCP Node Subnets', 'High Throughput Optimization'],
    status: 'current'
  },
  {
    phase: 'PHASE 03',
    title: 'Ecosystem',
    items: ['Cross-chain Interoperability', '$TRIGS Token Generation', 'Token-gated MCP Access'],
    status: 'upcoming'
  },
];

const TEAM: TeamMember[] = [
  { 
    name: 'Gianluca Godfrey', 
    role: 'Onchain Evangelist', 
    initials: 'GG', 
    hex: '0x01',
    image: '/images/gianluca.png' 
  },
  { 
    name: 'Aakash Jaiswal', 
    role: 'AI & Backend Alchemist', 
    initials: 'AJ', 
    hex: '0x02',
    image: '/images/aakash.png'
  },
  { 
    name: 'Charles Cai', 
    role: 'The Architect Whisperer', 
    initials: 'CC', 
    hex: '0x03',
    image: '/images/charles.png'
  },
  { 
    name: 'Yellie Cefalù', 
    role: 'CryptoKitana', 
    initials: 'YC', 
    hex: '0x04',
    image: '/images/yellie.png'
  },
  { 
    name: 'Odudu Essien', 
    role: 'Pixel Crafter', 
    initials: 'OE', 
    hex: '0x05',
    image: '/images/odudu.png'
  },
];

const SOCIAL_LINKS = {
  github: 'https://github.com/trigslink', 
  youtube: 'https://youtube.com/@trigslink', 
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
    <div className="relative group w-[288px] h-[420px] bg-[#0A0A0C] flex-shrink-0 mx-auto">
      
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible">
        <defs>
          <clipPath id="card-shape">
            <polygon points="20,0 100,0 100,100 80,100 0,100 0,20" /> 
          </clipPath>
        </defs>
        
        <path 
          d="M20,1 L287,1 L287,419 L268,419 L268,419 L1,419 L1,20 Z" 
          vectorEffect="non-scaling-stroke"
          fill="none" 
          stroke="rgba(59, 130, 246, 0.3)" 
          strokeWidth="1"
          className="transition-colors duration-300 group-hover:stroke-blue-500/80"
        />
        
        <path d="M1,20 L20,1" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="2" fill="none" />
        <path d="M268,419 L287,419" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="2" fill="none" />
      </svg>

      <div className="w-full h-full relative" style={{ clipPath: 'polygon(20px 0, 100% 0, 100% 100%, calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>
        
        <div className="relative h-[70%] w-full overflow-hidden bg-blue-900/10">
            <div className="absolute inset-0 z-10 opacity-30 mix-blend-overlay pointer-events-none animate-noise bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            <div className="absolute inset-0 z-10 opacity-20 pointer-events-none bg-[repeating-linear-gradient(transparent,transparent_2px,#000_3px)]"></div>
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ 
                  backgroundImage: `url(${member.image})`,
                  filter: 'grayscale(100%) sepia(100%) hue-rotate(180deg) saturate(1.5) brightness(0.8) contrast(1.2)'
              }}
            />
            <div 
                className="absolute inset-0 bg-cover bg-center z-20 pointer-events-none mix-blend-hard-light"
                style={{ 
                    backgroundImage: `url(${member.image})`,
                    opacity: glitchState === 1 ? 0.8 : 0,
                    clipPath: 'inset(10% 0 60% 0)',
                    transform: 'translate(-5px, 0)',
                    filter: 'grayscale(100%) sepia(100%) hue-rotate(180deg) brightness(1.5) contrast(1.5)'
                }}
            />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-[#0f0f12] border-t border-blue-900/30 p-6 flex flex-col justify-center">
            <h3 className="text-white font-bold font-mono text-lg uppercase tracking-tight mb-1">
                {member.name}
            </h3>
            <div className="flex items-center justify-between">
                <span className="text-blue-400 font-mono text-[10px] uppercase tracking-widest">
                    {member.role}
                </span>
                <div className="h-1 w-1 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e]"></div>
            </div>
        </div>

      </div>
    </div>
  );
};

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

  const handleMouseEnter = () => {
    if (!isTouchDevice) setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-all duration-300 ease-out transform-gpu ${className}`}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        willChange: 'transform',
      }}
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
        if(parent) {
            canvas.width = parent.offsetWidth;
            canvas.height = parent.offsetHeight;
        }
    };
    setDimensions();

    let width = canvas.width;
    let height = canvas.height;
    
    // Dynamic radius based on width for better mobile fit
    const getRadius = () => {
        if (width < 400) return 280; // Small mobile 
        if (width < 768) return 320; // Mobile
        return 380; // Desktop
    };

    let GLOBE_RADIUS = getRadius();
    const DOT_COUNT = width < 768 ? 400 : 600; 
    const DOT_RADIUS = 2;
    const CONNECTION_DISTANCE_3D = 95; 
    const MAX_ACTIVE_SIGNALS = width < 768 ? 30 : 60; 
    const SIGNAL_SPEED = 0.05;

    let rotation = 0;
    
    const dots: Dot[] = [];
    for(let i = 0; i < DOT_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / DOT_COUNT);
      const theta = Math.sqrt(DOT_COUNT * Math.PI) * phi;
      
      dots.push({
        x: GLOBE_RADIUS * Math.cos(theta) * Math.sin(phi),
        y: GLOBE_RADIUS * Math.sin(theta) * Math.sin(phi),
        z: GLOBE_RADIUS * Math.cos(phi),
        neighbors: [],
        pulse: 0 
      });
    }

    // Precompute neighbors
    for (let i = 0; i < DOT_COUNT; i++) {
        let possibleNeighbors: { idx: number; dist: number }[] = [];
        for (let j = 0; j < DOT_COUNT; j++) {
            if (i === j) continue;
            const dx = dots[i].x - dots[j].x;
            const dy = dots[i].y - dots[j].y;
            const dz = dots[i].z - dots[j].z;
            const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
            
            if (dist < CONNECTION_DISTANCE_3D) {
                possibleNeighbors.push({ idx: j, dist: dist });
            }
        }
        
        possibleNeighbors.sort((a, b) => a.dist - b.dist);
        // Store as array of indices for performance
        dots[i].neighbors = possibleNeighbors.slice(0, 5).map(n => n.idx);
    }

    let signals: Signal[] = [];
    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      const cx = width / 2;
      const cy = height * 0.15; 

      rotation += 0.0015;

      const projectedDots: ProjectedDot[] = dots.map((dot, i) => {
        if (dot.pulse > 0) dot.pulse -= 0.04;

        const x = dot.x * Math.cos(rotation) - dot.z * Math.sin(rotation);
        const z = dot.x * Math.sin(rotation) + dot.z * Math.cos(rotation);
        
        const scale = 500 / (500 + z); 
        
        return {
          x: cx + x * scale,
          y: cy + dot.y * scale,
          scale: scale,
          z: z,
          originalIndex: i,
          pulse: dot.pulse
        };
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
                     
                     ctx.strokeStyle = gradient;
                     ctx.beginPath();
                     ctx.moveTo(dot.x, dot.y);
                     ctx.lineTo(neighbor.x, neighbor.y);
                     ctx.stroke();
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
              signals.push({
                  startIdx: startIndex,
                  endIdx: neighborIndex,
                  progress: 0
              });
          }
      }
      
      signals = signals.filter(signal => {
          signal.progress += SIGNAL_SPEED;
          
          if (signal.progress >= 1) {
            dots[signal.endIdx].pulse = 1.0; 
            return false; 
          }

          const startDot = projectedDots[signal.startIdx];
          const endDot = projectedDots[signal.endIdx];

          if (!startDot || !endDot) return false;

          if (startDot.z < -100 && endDot.z < -100) return true;

          const curX = startDot.x + (endDot.x - startDot.x) * signal.progress;
          const curY = startDot.y + (endDot.y - startDot.y) * signal.progress;
          const scaleAvg = (startDot.scale + endDot.scale) / 2;

          ctx.shadowBlur = 8;
          ctx.shadowColor = "#FFD700";
          ctx.fillStyle = `rgba(255, 255, 200, ${1 - Math.abs(0.5 - signal.progress)})`;
          ctx.beginPath();
          ctx.arc(curX, curY, 2 * scaleAvg, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; 

          return true;
      });
      
      projectedDots.forEach(dot => {
        const pulseEffect = dot.pulse * 4; 
        const radius = (DOT_RADIUS + pulseEffect) * dot.scale;
        
        const alpha = Math.max(0.3, (dot.scale - 0.2)); 
        
        let r = 255;
        let g = 215; 
        let b = 0;

        if (dot.pulse > 0) {
           g += dot.pulse * 40; 
           b += dot.pulse * 200; 
        }
        g = Math.min(255, g);
        b = Math.min(255, b);

        ctx.fillStyle = `rgba(${r}, ${Math.floor(g)}, ${Math.floor(b)}, ${alpha})`; 
        
        if (dot.scale > 0.8 || dot.pulse > 0.1) {
           ctx.shadowBlur = 15 * dot.scale;
           ctx.shadowColor = `rgba(255, 215, 0, ${alpha})`;
        } else {
           ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      setDimensions();
      width = canvas.width;
      height = canvas.height;
      
      // Update radius on resize
      GLOBE_RADIUS = getRadius();
      
      // Re-initialize dots on major resize
      for(let i = 0; i < DOT_COUNT; i++) {
        const phi = Math.acos(-1 + (2 * i) / DOT_COUNT);
        const theta = Math.sqrt(DOT_COUNT * Math.PI) * phi;
        dots[i].x = GLOBE_RADIUS * Math.cos(theta) * Math.sin(phi);
        dots[i].y = GLOBE_RADIUS * Math.sin(theta) * Math.sin(phi);
        dots[i].z = GLOBE_RADIUS * Math.cos(phi);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <canvas 
        ref={canvasRef} 
        className="w-full h-full block opacity-60" 
        style={{
            maskImage: 'radial-gradient(circle at 50% 50%, black 0%, black 30%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 0%, black 30%, transparent 70%)'
        }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030304] via-transparent to-transparent opacity-80"></div>
    </div>
  );
};

const Logo = ({ className = "w-10 h-10" }) => (
  <img 
    src={trigslinkLogo} 
    alt="Trigslink Protocol" 
    className={`${className} object-contain`} 
  />
);

const GlitchText = ({ text }: { text: string }) => (
  <span className="relative inline-block group">
    <span className="relative z-10">{text}</span>
    <span className="absolute top-0 left-0 -ml-0.5 translate-x-[2px] text-red-500 opacity-0 group-hover:opacity-70 mix-blend-screen animate-pulse">{text}</span>
    <span className="absolute top-0 left-0 -ml-0.5 -translate-x-[2px] text-blue-500 opacity-0 group-hover:opacity-70 mix-blend-screen animate-pulse delay-75">{text}</span>
  </span>
);

const SectionTitle = ({ children, subtitle, align = 'center' }: { children: ReactNode, subtitle?: string, align?: 'center' | 'left' }) => (
  <div className={`mb-12 md:mb-16 px-4 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    <div className={`flex items-center gap-2 mb-4 text-blue-500 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
      <span className="w-8 h-[1px] bg-blue-500"></span>
      System Module
      <span className="w-8 h-[1px] bg-blue-500"></span>
    </div>
    <h2 className="text-2xl md:text-4xl font-black text-white mb-4 md:mb-6 tracking-tighter font-lastica uppercase break-words hyphens-auto">
      {children}
    </h2>
    {subtitle && (
      <p className="text-gray-400 max-w-2xl text-base md:text-lg leading-relaxed font-light mx-auto">
        {subtitle}
      </p>
    )}
  </div>
);

// Explicit props interface for Button to handle index signature and event handlers
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'gradient' | 'cyberMobile' | 'luminousPill' | 'silverBorder';
  className?: string;
}

const Button = ({ children, variant = 'primary', className = '', ...props }: ButtonProps) => {
  const baseStyle = "relative px-6 md:px-8 py-3 font-mono text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-200 overflow-hidden group touch-manipulation";
  
  const variants: Record<string, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-500 clip-path-slant active:scale-95",
    secondary: "bg-transparent border border-gray-700 text-gray-300 hover:border-blue-500 hover:text-white active:bg-gray-800",
    outline: "text-blue-400 border border-blue-500/30 hover:bg-blue-500/10",
    gradient: "text-white rounded-lg bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 animate-gradient-roll border border-white/10 shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]",
    cyberMobile: "text-white bg-blue-600/20 border border-blue-500/50 hover:bg-blue-600/40 hover:border-blue-400 active:scale-95 clip-path-slant", 
    luminousPill: "text-white rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_auto] hover:bg-[position:right_center] active:scale-95 shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-white/20",
    silverBorder: "p-0", 
  };

  if (variant === 'gradient') {
    return (
      <button 
        className={`relative p-0.5 rounded-full overflow-hidden group ${className} active:scale-95 transition-transform`} 
        {...props}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-roll bg-[length:200%_200%]"></div>
        <div className="relative px-6 py-2.5 bg-black rounded-full flex items-center justify-center gap-2 text-white font-mono text-xs group-hover:bg-gray-900 transition-colors h-full w-full">
          {children}
        </div>
      </button>
    );
  }

  if (variant === 'silverBorder') {
    return (
      <button 
        className={`relative p-[1px] group overflow-hidden rounded ${className} active:scale-95 transition-transform`} 
        {...props}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#334155] via-[#e2e8f0] to-[#334155] bg-[length:200%_100%] animate-gold-border"></div>
        <div className="relative px-8 md:px-10 py-4 bg-black rounded h-full w-full flex items-center justify-center gap-3 font-mono text-xs font-bold tracking-[0.2em] uppercase text-white transition-colors group-hover:text-[#e2e8f0] group-hover:bg-[#0a0a0c]">
          {children}
        </div>
      </button>
    );
  }
  
  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {variant === 'primary' && (
         <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 skew-x-12"></div>
      )}
    </button>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      // Removed unused ts-expect-error directive
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    } as any);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const toggleWallet = () => setWalletConnected(!walletConnected);

  return (
    <div className="min-h-screen bg-[#030304] text-white font-sans selection:bg-blue-500/40 selection:text-white overflow-x-hidden">
      
      {/* --- REDESIGNED MOBILE GLASSY MENU (CARD STYLE) --- */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileMenuOpen(false)}
      >
          {/* The Glassy Card */}
          <div 
            className={`w-full max-w-[340px] bg-[#0A0A0C]/90 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] transform transition-all duration-500 flex flex-col relative ${mobileMenuOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
            onClick={(e) => e.stopPropagation()} 
          >
             {/* Header: Logo & Close */}
             <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-3 opacity-90">
                    <Logo className="w-8 h-8" />
                    <img 
                        src={trigslinkFont} 
                        alt="Trigslink" 
                        className="h-5 object-contain" 
                    />
                </div>
                <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>
             </div>

             {/* Navigation Links */}
             <div className="flex flex-col gap-8 items-center text-center mb-12">
                {NAVIGATION.map((item) => (
                  <a 
                    key={item.name} 
                    href={item.href} 
                    className="text-base font-bold font-mono tracking-[0.2em] text-gray-300 hover:text-white hover:text-shadow-glow transition-all duration-300 uppercase"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
             </div>

             {/* Luminous Connect Wallet Button */}
             

             {/* Footer / Socials */}
             <div className="flex justify-center gap-6 mt-auto">
                <a href={SOCIAL_LINKS.github} className="text-gray-500 hover:text-white transition-colors"><Github size={20}/></a>
                <a href={SOCIAL_LINKS.youtube} className="text-gray-500 hover:text-white transition-colors"><Youtube size={20}/></a>
             </div>
             
             <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-3 text-xs text-gray-600 font-mono text-center">
                 <a href="#" className="hover:text-gray-400">Documentation</a>
                 <a href="#" className="hover:text-gray-400">Whitepaper</a>
                 <a href="#" className="hover:text-gray-400">Github</a>
             </div>
          </div>
      </div>

      <nav className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 rounded-2xl md:rounded-full border border-white/10 bg-[#050505]/90 backdrop-blur-xl px-4 md:px-6 py-3 transition-all duration-300 ${isScrolled ? 'shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]' : 'shadow-none'}`}>
        <div className="flex items-center justify-between relative">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3 cursor-pointer group z-20" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="relative">
              <Logo className="w-8 h-8 transition-all duration-500 group-hover:rotate-180" />
              <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            </div>
            <img 
                src={trigslinkFont} 
                alt="TRIGSLINK" 
                className="h-5 md:h-6 object-contain opacity-90 group-hover:opacity-100 transition-opacity" 
            />
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8">
            {NAVIGATION.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className="text-xs font-mono font-medium text-gray-400 hover:text-white transition-colors relative group uppercase tracking-widest"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop Wallet */}
          <div className="hidden md:block z-20">
            <Button 
              variant={walletConnected ? "secondary" : "gradient"} 
              onClick={toggleWallet}
            >
              {walletConnected ? (
                <span className="flex items-center gap-2 font-mono">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></span>
                  0x71...3A9
                </span>
              ) : (
                <>
                  <Wallet className="w-4 h-4" /> Connect
                </>
              )}
            </Button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden z-20">
            <button 
                onClick={() => setMobileMenuOpen(true)} 
                className="text-gray-300 hover:text-white p-2 focus:outline-none"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-60 lg:pb-48 px-4 overflow-hidden flex items-center justify-center min-h-[90vh] md:min-h-screen">
        <CyberGlobe />
        <div className="max-w-7xl mx-auto text-center relative z-20 pointer-events-auto px-2">
          
        <h1
          className="text-2xl sm:text-3xl md:text-5xl lg:text-5xl 
                    font-light tracking-tighter
                    text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500
                    leading-tight font-montserrat mb-2 md:mb-4">
          THE ONCHAIN
        </h1>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl 
                      font-black tracking-tighter 
                      mb-8 md:mb-16 text-white leading-none 
                      font-lastica uppercase drop-shadow-2xl break-words">
          CONTEXT PROTOCOL
        </h1>

          <p className="text-sm md:text-xl text-gray-400 max-w-sm md:max-w-4xl mx-auto mb-10 md:mb-16 tracking-[0.2em] md:tracking-[0.3em] font-light uppercase font-sans leading-relaxed">
            The discovery, billing, and access layer for onchain MCPs
          </p>
          
          <div className="flex flex-col items-center justify-center gap-6">
            <Button variant="silverBorder">
              <a 
                href="https://youtu.be/x_i38WNCgj8?si=QB64PRN589UYH0VN" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Watch Demo <Play size={14} className="fill-current" />
              </a>
            </Button>
          </div>

        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="relative z-10 py-16 md:py-32 bg-[#050507]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Bridging isolated AI agents with high-fidelity, real-time context.">
            PROTOCOL ARCHITECTURE
          </SectionTitle>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {FEATURES.map((feature, idx) => (
              <TiltCard key={idx} className="h-auto min-h-[350px] lg:h-[420px]">
                <div className="relative h-full p-6 md:p-8 rounded-[30px] md:rounded-[40px] overflow-hidden group transition-all duration-500
                              bg-[#0f0f11]/60 backdrop-blur-2xl
                              border border-white/10
                              shadow-[inset_0px_0px_20px_rgba(255,255,255,0.05),0_10px_40px_-10px_rgba(0,0,0,0.8)]
                              hover:shadow-[inset_0px_0px_30px_rgba(59,130,246,0.1),0_0_25px_rgba(59,130,246,0.2)]
                              flex flex-col">
                  
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_70%)] opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    
                    <div className="flex justify-between items-start mb-6 md:mb-8">
                      <div className="p-3 md:p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-transparent border border-blue-500/30 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <span className="text-[10px] font-mono text-gray-400 border border-white/10 px-3 py-1.5 rounded-full bg-black/40 shadow-inner backdrop-blur-sm">
                        {feature.stat}
                      </span>
                    </div>
                    
                    <div className="mt-2">
                        <h3 className="text-lg md:text-xl font-bold text-white mb-2 font-sans tracking-tight leading-tight">
                        <GlitchText text={feature.title} />
                        </h3>
                        <div className="text-[10px] font-mono text-blue-400 mb-4 md:mb-6 uppercase tracking-widest font-bold opacity-80">
                            {feature.subtitle}
                        </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm leading-relaxed font-montserrat font-medium mt-auto border-t border-white/5 pt-6 group-hover:text-gray-300 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                  
                  <div className="absolute inset-0 rounded-[30px] md:rounded-[40px] border-2 border-transparent group-hover:border-blue-500/30 transition-colors duration-500 pointer-events-none"></div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* --- ARCHITECTURE SECTION --- */}
      <section id="architecture" className="relative z-10 py-16 md:py-32 px-4 overflow-hidden border-y border-white/5 bg-[#030304]">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Trustless data flow secured by cryptographic proofs and smart contracts.">
            NETWORK TOPOLOGY
          </SectionTitle>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            <div className="space-y-6 relative pl-4 md:pl-0">
              <div 
                className="absolute left-[27px] lg:left-6 top-6 bottom-12 lg:bottom-24 w-[2px] -translate-x-1/2 z-0 overflow-visible"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
                }}
              >
                <div className="absolute inset-0 bg-blue-900/20 w-[1px] mx-auto"></div>
                
                <div 
                  className="absolute inset-0 w-full h-full opacity-50 animate-dotted-flow"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #3b82f6 40%, transparent 50%)',
                    backgroundSize: '4px 20px', 
                    backgroundRepeat: 'repeat-y',
                    backgroundPositionX: 'center'
                  }}
                ></div>

                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent via-blue-400 to-transparent blur-md opacity-0 animate-beam-drop"></div>
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent via-white to-transparent opacity-0 animate-beam-drop delay-75"></div>
              </div>
              
              {[
                { title: 'Provider Node', desc: 'Dockerized MCPs running locally, exposed securely via Cloudflare tunnels.', icon: <Server size={18} />, id: '01' },
                { title: 'Onchain Registry', desc: 'Immutable smart contract registry. Discovery and billing settled in $AVAX.', icon: <Database size={18} />, id: '02' },
                { title: 'Context Stream', desc: 'Direct, encrypted pipe from provider to agent. Validated by Chainlink Automation.', icon: <Radio size={18} />, id: '03' }
              ].map((step, i) => (
                <div key={i} className="relative flex gap-6 md:gap-8 group">
                  <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-[#0A0A0C] border border-blue-900/50 flex items-center justify-center text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.1)] group-hover:border-blue-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 rounded-lg">
                    {step.icon}
                  </div>
                  <div className="pt-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono text-blue-500/50">_SYS.{step.id}</span>
                      <h3 className="text-lg md:text-xl font-bold text-white">{step.title}</h3>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-md">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative group w-full max-w-md mx-auto lg:mr-0 lg:ml-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-[#050505] border border-gray-800 rounded-lg p-1 shadow-2xl">
                
                <div className="bg-[#111] px-3 py-2 flex items-center justify-between rounded-t border-b border-gray-800">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
                  </div>
                  <div className="text-[8px] md:text-[10px] font-mono text-gray-500 uppercase">root@trigslink-node:~</div>
                </div>
                
                <div className="p-4 md:p-6 font-mono text-xs space-y-4 min-h-[300px] md:min-h-[320px] text-gray-300 bg-[#0A0A0C] rounded-b flex flex-col overflow-x-auto">
                  
                  <div>
                    <span className="text-green-500 mr-2">➜</span>
                    <span>initiating_handshake...</span>
                  </div>
                  <div className="text-blue-400 pl-4 ml-1 space-y-1">
                    <div>[INFO] Provider identified: 0x8a...2b</div>
                    <div>[INFO] Verifying stake... <span className="text-green-400">OK</span></div>
                  </div>

                  <div className="pt-2">
                    <span className="text-green-500 mr-2">➜</span>
                    <span className="text-white font-bold text-sm break-all">trigslink-tunnel 5000</span>
                  </div>

                  <div className="flex justify-center py-4 flex-1 items-center overflow-hidden">
                    <img src={asciiTerminal} alt="ASCII Logo" className="w-24 h-24 md:w-32 md:h-32 object-contain opacity-90" />
                  </div>

                  <div className="bg-[#0f0f12] p-3 rounded-lg border border-blue-900/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-blue-300 font-bold text-[10px] tracking-wider">TUNNEL_STATUS</span>
                      <span className="text-green-400 font-bold text-[10px] tracking-wider">ESTABLISHED</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden mb-2">
                      <div className="h-full bg-blue-500 w-full shadow-[0_0_10px_#3b82f6]"></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                        <span>PORT: 5000</span>
                        <span>LATENCY: 12ms</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-purple-400 pt-1">
                    <span className="animate-spin">⟳</span>
                    <span>forwarding_traffic...</span>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- ROADMAP SECTION --- */}
      <section id="roadmap" className="relative z-10 py-16 md:py-32 bg-[#050507]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Execution plan towards autonomous economic agents.">
            MISSION TIMELINE
          </SectionTitle>

          <div className="relative">
            <div className="hidden md:block absolute top-[130px] left-0 w-full h-[2px] overflow-visible z-0">
                <div className="absolute inset-0 bg-blue-900/20"></div>
                <div 
                    className="absolute inset-0 opacity-50 animate-dotted-flow-horizontal"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #3b82f6 40%, transparent 50%)',
                        backgroundSize: '20px 4px', 
                        backgroundRepeat: 'repeat-x',
                        backgroundPosition: 'center'
                    }}
                ></div>
                <div className="absolute top-0 bottom-0 w-48 bg-gradient-to-r from-transparent via-blue-400 to-transparent blur-md opacity-0 animate-beam-slide"></div>
            </div>
            
            <div className="md:hidden absolute left-[21px] top-6 bottom-6 w-[2px] -translate-x-1/2 z-0 overflow-visible"
              style={{
                maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
              }}
            >
                <div className="absolute inset-0 bg-blue-900/20 w-[1px] mx-auto"></div>
                
                <div 
                  className="absolute inset-0 w-full h-full opacity-50 animate-dotted-flow"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #3b82f6 40%, transparent 50%)',
                    backgroundSize: '4px 20px', 
                    backgroundRepeat: 'repeat-y',
                    backgroundPositionX: 'center'
                  }}
                ></div>

                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent via-blue-400 to-transparent blur-md opacity-0 animate-beam-drop"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-8 relative z-10">
              {ROADMAP.map((item, idx) => {
                const isCurrent = item.status === 'current';
                const isCompleted = item.status === 'completed';
                
                return (
                  <div key={idx} className={`group h-full p-6 md:p-8 border backdrop-blur-sm transition-all duration-300 flex flex-col relative ml-10 md:ml-0
                      ${isCurrent ? 'bg-blue-900/5 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.1)]' : 'bg-[#0a0a0c] border-gray-800 hover:border-gray-700'}
                  `}>
                      <div className="md:hidden absolute -left-[33px] top-8 w-4 h-4 rounded-full border-2 border-[#030304] bg-blue-900 z-20">
                         {isCurrent && <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping"></div>}
                      </div>

                      <div className="mb-4 md:h-[90px] flex flex-col justify-start relative z-10">
                          <div className={`text-[10px] font-mono uppercase tracking-widest mb-3
                            ${isCurrent ? 'text-blue-400' : 'text-gray-600'}
                          `}>
                            {item.phase}
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{item.title}</h3>
                          
                          {isCurrent && (
                            <div className="absolute top-0 right-0 px-2 py-1 bg-blue-600 text-[8px] font-bold text-white uppercase tracking-wider rounded-sm">
                              Processing
                            </div>
                          )}
                      </div>

                      <div className="hidden md:flex relative h-[40px] items-center justify-start mb-6 z-20">
                           <div className={`
                              w-4 h-4 rounded-full border-4 transition-all duration-500 relative
                              ${isCurrent ? 'bg-black border-blue-500 shadow-[0_0_15px_#3b82f6] scale-125' : 
                                isCompleted ? 'bg-blue-900 border-blue-800' : 'bg-black border-gray-700'}
                           `}>
                              {isCurrent && <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75"></div>}
                           </div>
                      </div>

                      <ul className="space-y-3 md:space-y-4 mt-auto relative z-10">
                        {item.items.map((point, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className={`mt-1.5 w-1.5 h-1.5 flex-shrink-0 rounded-sm ${isCurrent ? 'bg-blue-500' : 'bg-gray-700'}`}></span>
                            <span className="text-xs md:text-sm text-gray-400 group-hover:text-gray-300 transition-colors font-mono">{point}</span>
                          </li>
                        ))}
                      </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* --- TEAM SECTION --- */}
      <section id="team" className="relative z-10 py-16 md:py-32 px-4 bg-[#030304] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Founding Team of the Trigslink Protocol.">
            HALL OF FAME
          </SectionTitle>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {TEAM.map((member, idx) => (
              <OperatorCard key={idx} member={member} />
            ))}
          </div>
        </div>
      </section>

      <footer className="relative z-10 py-12 md:py-16 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Logo className="w-8 h-8" />
                <img 
                    src={trigslinkFont} 
                    alt="TRIGSLINK" 
                    className="h-6 object-contain opacity-90" 
                />
              </div>
              <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
                A decentralized coordination layer for AI context. 
                Built for autonomous agents, secured by Avax, verified by link.
              </p>
            </div>
            
            <div>
               <h4 className="text-white font-bold mb-4 md:mb-6 font-mono text-sm uppercase">Protocol</h4>
               <ul className="space-y-3 md:space-y-4 text-sm text-gray-500">
                 <li className="hover:text-blue-400 cursor-pointer transition-colors">Documentation</li>
                 <li className="hover:text-blue-400 cursor-pointer transition-colors">Whitepaper</li>
                 <li className="hover:text-blue-400 cursor-pointer transition-colors">Github</li>
                 <li className="hover:text-blue-400 cursor-pointer transition-colors">Audits</li>
               </ul>
            </div>

            <div>
               <h4 className="text-white font-bold mb-4 md:mb-6 font-mono text-sm uppercase">Community</h4>
               <div className="flex gap-4">
                  <a 
                    href={SOCIAL_LINKS.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-gray-400 hover:bg-gray-800 hover:text-white transition-all"
                  >
                    <Github size={18} />
                  </a>
                  <a 
                    href={SOCIAL_LINKS.youtube} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all"
                  >
                    <Youtube size={18} />
                  </a>
               </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs text-gray-600 font-mono uppercase tracking-wider text-center md:text-left">
            <div>
              © {new Date().getFullYear()} Trigslink Foundation. All rights reserved.
            </div>
            <div className="flex gap-6 md:gap-8">
               <span>Privacy Policy</span>
               <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* IMPORTING UNBOUNDED FONT */
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;900&display=swap');
        /* IMPORTING SILKSCREEN (PIXEL) FONT */
        @import url('https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&display=swap');
        
        /* IMPORTING OTHER FONTS */
        @import url('https://fonts.googleapis.com/css2?family=Michroma&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Bruno+Ace+SC&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap');
        
        @font-face {
          font-family: 'Korataki';
          src: url('/fonts/korataki.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
        }

        html {
          scroll-behavior: smooth;
        }
        
        /* FONTS */
        .font-unbounded { font-family: 'Unbounded', sans-serif; }
        .font-pixel { font-family: 'Silkscreen', cursive; }
        .font-lastica { font-family: 'Korataki', 'Michroma', sans-serif; text-transform: uppercase; }
        .font-chromion { font-family: 'Bruno Ace SC', cursive; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }

        /* UTILS */
        .clip-path-chromion { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
        .clip-path-slant { clip-path: polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%); }
        .perspective-1000 { perspective: 1000px; }

        /* ANIMATIONS */
        @keyframes gradient-roll {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-roll {
          background-size: 200% 200%;
          animation: gradient-roll 3s ease infinite;
        }

        @keyframes gold-border {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gold-border {
          animation: gold-border 4s ease infinite;
        }
        
        /* NOISE ANIMATION */
        @keyframes noise {
           0% { background-position: 0 0; }
           10% { background-position: -5% -10%; }
           20% { background-position: -15% 5%; }
           30% { background-position: 7% -25%; }
           40% { background-position: 20% 25%; }
           50% { background-position: -25% 10%; }
           60% { background-position: 15% 5%; }
           70% { background-position: 0% 15%; }
           80% { background-position: 25% 35%; }
           90% { background-position: -10% 10%; }
           100% { background-position: 0 0; }
        }
        
        .animate-noise {
           animation: noise 0.5s steps(3) infinite;
        }

        /* NEW ANIMATION FOR DOTTED FLOW */
        @keyframes dotted-flow {
          0% { background-position: 0 0; }
          100% { background-position: 0 20px; } /* Must match height of background-size pattern */
        }
        .animate-dotted-flow {
          animation: dotted-flow 1s linear infinite;
        }

        /* NEW ANIMATION FOR HORIZONTAL DOTTED FLOW */
        @keyframes dotted-flow-horizontal {
          0% { background-position: 0 0; }
          100% { background-position: 20px 0; }
        }
        .animate-dotted-flow-horizontal {
          animation: dotted-flow-horizontal 1s linear infinite;
        }

        /* BEAM DROP ANIMATION */
        @keyframes beam-drop {
          0% { top: -20%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 120%; opacity: 0; }
        }
        .animate-beam-drop {
          animation: beam-drop 3s ease-in-out infinite;
        }

        /* BEAM SLIDE HORIZONTAL ANIMATION */
        @keyframes beam-slide {
          0% { left: -20%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 120%; opacity: 0; }
        }
        .animate-beam-slide {
          animation: beam-slide 3s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-gradient-roll, .animate-gold-border, .animate-noise, .animate-dotted-flow, .animate-beam-drop, .animate-dotted-flow-horizontal, .animate-beam-slide {
            animation: none;
          }
        }
      `}} />
    </div>
  );
}