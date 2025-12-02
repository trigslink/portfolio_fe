import React, { useState, useEffect, useRef } from 'react';
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
import trigslinkLogo from '/assets/trigslink_logo_dark.jpeg';
import trigslinkFont from '/assets/trigslink_font.png'; 

// --- Data Constants ---

const NAVIGATION = [
  { name: 'PROTOCOL', href: '#features' },
  { name: 'NETWORK', href: '#architecture' },
  { name: 'ROADMAP', href: '#roadmap' },
  { name: 'TEAM', href: '#team' },
];

const FEATURES = [
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

const ROADMAP = [
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

const TEAM = [
  { 
    name: 'Gianluca Godfrey', 
    role: 'Onchain Evangelist', 
    initials: 'GG', 
    hex: '0x01',
    image: '/assets/gianluca.png' 
  },
  { 
    name: 'Aakash Jaiswal', 
    role: 'AI & Backend Alchemist', 
    initials: 'AJ', 
    hex: '0x02',
    image: '/assets/Aakash.png'
  },
  { 
    name: 'Charles Cai', 
    role: 'The Architect Whisperer', 
    initials: 'CC', 
    hex: '0x03',
    image: '/assets/charles.png'
  },
  { 
    name: 'Yellie Cefalù', 
    role: 'CryptoKitana', 
    initials: 'YC', 
    hex: '0x04',
    image: '/assets/yellie.png'
  },
  { 
    name: 'Odudu Essien', 
    role: 'Pixel Crafter', 
    initials: 'OE', 
    hex: '0x05',
    image: '/assets/odudu.png'
  },
];

const SOCIAL_LINKS = {
  github: 'https://github.com/trigslink', 
  youtube: 'https://youtube.com/@trigslink', 
};

// --- Visual Components ---

const OperatorCard = ({ member }) => {
  const [glitchState, setGlitchState] = useState(0); // 0: None, 1: Slice Top, 2: Slice Bottom, 3: Color Shift

  useEffect(() => {
    let timeoutId;
    
    const runGlitchLoop = () => {
      // Randomly choose a "glitch type"
      const type = Math.floor(Math.random() * 3) + 1; 
      setGlitchState(type);
      
      // Glitch lasts for a very short burst (50ms - 150ms) to look like a flicker
      const duration = Math.random() * 100 + 50;
      
      setTimeout(() => {
        setGlitchState(0);
        // Wait for a random interval before next glitch (2s - 5s)
        const nextDelay = Math.random() * 3000 + 2000; 
        timeoutId = setTimeout(runGlitchLoop, nextDelay);
      }, duration);
    };

    // Start the loop with a random initial delay
    timeoutId = setTimeout(runGlitchLoop, Math.random() * 2000);
    
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="relative group w-72 h-[420px] bg-[#0A0A0C]">
      
      {/* 1. Tech Border Shape (Using SVG for precise cut corners) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible">
        <defs>
          <clipPath id="card-shape">
            <polygon points="20,0 100,0 100,100 80,100 0,100 0,20" /> {/* Relative coordinates will be handled by CSS clip-path */}
          </clipPath>
        </defs>
        
        {/* Main Border Path */}
        <path 
          d="M20,1 L287,1 L287,419 L268,419 L268,419 L1,419 L1,20 Z" 
          vectorEffect="non-scaling-stroke"
          fill="none" 
          stroke="rgba(59, 130, 246, 0.3)" 
          strokeWidth="1"
          className="transition-colors duration-300 group-hover:stroke-blue-500/80"
        />
        
        {/* Corner Accents */}
        <path d="M1,20 L20,1" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="2" fill="none" />
        <path d="M268,419 L287,419" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="2" fill="none" />
      </svg>

      {/* 2. Content Container with Clip Path */}
      <div className="w-full h-full relative" style={{ clipPath: 'polygon(20px 0, 100% 0, 100% 100%, calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>
        
        {/* IMAGE SECTION */}
        <div className="relative h-[70%] w-full overflow-hidden bg-blue-900/10">
            
            {/* Static Noise Overlay (Always Active) */}
            <div className="absolute inset-0 z-10 opacity-30 mix-blend-overlay pointer-events-none animate-noise bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            
            {/* Scanlines */}
            <div className="absolute inset-0 z-10 opacity-20 pointer-events-none bg-[repeating-linear-gradient(transparent,transparent_2px,#000_3px)]"></div>

            {/* Base Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ 
                  backgroundImage: `url(${member.image})`,
                  filter: 'grayscale(100%) sepia(100%) hue-rotate(180deg) saturate(1.5) brightness(0.8) contrast(1.2)'
              }}
            />

            {/* --- GLITCH LAYERS (Triggered by State) --- */}
            
            {/* Slice 1: Top shift */}
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

            {/* Slice 2: Bottom shift */}
            <div 
                className="absolute inset-0 bg-cover bg-center z-20 pointer-events-none mix-blend-hard-light"
                style={{ 
                    backgroundImage: `url(${member.image})`,
                    opacity: glitchState === 2 ? 0.8 : 0,
                    clipPath: 'inset(60% 0 10% 0)',
                    transform: 'translate(5px, 0)',
                    filter: 'grayscale(100%) sepia(100%) hue-rotate(90deg) brightness(1.5) contrast(1.5)'
                }}
            />
            
            {/* Slice 3: Color Split (RGB Shift) */}
            <div 
                className="absolute inset-0 bg-cover bg-center z-20 pointer-events-none mix-blend-screen"
                style={{ 
                    backgroundImage: `url(${member.image})`,
                    opacity: glitchState === 3 ? 0.9 : 0,
                    transform: 'translate(-3px, 0)',
                    filter: 'grayscale(100%) drop-shadow(4px 0px 0px rgba(255,0,0,0.5))'
                }}
            />
        </div>

        {/* TEXT SECTION */}
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

// ... [The rest of your components: TiltCard, CyberGlobe, Logo, SectionTitle, Button, App] ...
// I will include the full App component below to ensure it pastes cleanly.

const TiltCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
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

  const handleMouseEnter = () => setIsHovered(true);
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
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const setDimensions = () => {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    };
    setDimensions();

    let width = canvas.width;
    let height = canvas.height;
    
    const GLOBE_RADIUS = width < 768 ? 220 : 380; 
    const DOT_COUNT = 600; 
    const DOT_RADIUS = 2;
    const CONNECTION_DISTANCE_3D = 95; 
    const MAX_ACTIVE_SIGNALS = 60; 
    const SIGNAL_SPEED = 0.05;

    let rotation = 0;
    
    const dots = [];
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

    for (let i = 0; i < DOT_COUNT; i++) {
        let possibleNeighbors = [];
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
        dots[i].neighbors = possibleNeighbors.slice(0, 5).map(n => n.idx);
    }

    let signals = [];

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      const cx = width / 2;
      const cy = height * 0.15; 

      rotation += 0.0015;

      const projectedDots = dots.map((dot, i) => {
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

        dots[dot.originalIndex].neighbors.forEach(neighborIdx => {
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
          if (startDotRaw.neighbors.length > 0) {
              const neighborIndex = startDotRaw.neighbors[Math.floor(Math.random() * startDotRaw.neighbors.length)];
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

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      setDimensions();
      width = canvas.width;
      height = canvas.height;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

const GlitchText = ({ text }) => (
  <span className="relative inline-block group">
    <span className="relative z-10">{text}</span>
    <span className="absolute top-0 left-0 -ml-0.5 translate-x-[2px] text-red-500 opacity-0 group-hover:opacity-70 mix-blend-screen animate-pulse">{text}</span>
    <span className="absolute top-0 left-0 -ml-0.5 -translate-x-[2px] text-blue-500 opacity-0 group-hover:opacity-70 mix-blend-screen animate-pulse delay-75">{text}</span>
  </span>
);

const SectionTitle = ({ children, subtitle, align = 'center' }) => (
  <div className={`mb-16 px-4 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    <div className={`flex items-center gap-2 mb-4 text-blue-500 font-mono text-xs tracking-[0.2em] uppercase ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
      <span className="w-8 h-[1px] bg-blue-500"></span>
      System Module
      <span className="w-8 h-[1px] bg-blue-500"></span>
    </div>
    <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tighter font-lastica uppercase">
      {children}
    </h2>
    {subtitle && (
      <p className="text-gray-400 max-w-2xl text-lg leading-relaxed font-light mx-auto">
        {subtitle}
      </p>
    )}
  </div>
);

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "relative px-8 py-3 font-mono text-sm font-bold uppercase tracking-wider transition-all duration-200 overflow-hidden group";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-500 clip-path-slant",
    secondary: "bg-transparent border border-gray-700 text-gray-300 hover:border-blue-500 hover:text-white",
    outline: "text-blue-400 border border-blue-500/30 hover:bg-blue-500/10",
    gradient: "text-white rounded-lg bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 animate-gradient-roll border border-white/10 shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]",
    chromion: "bg-[#7FBCC9] text-black font-bold tracking-widest text-xs uppercase hover:bg-[#6aa8b5] transition-colors flex items-center gap-4 py-4 px-10 clip-path-chromion"
  };

  if (variant === 'gradient') {
    return (
      <button 
        className={`relative p-0.5 rounded-full overflow-hidden group ${className}`} 
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
        className={`relative p-[1px] group overflow-hidden rounded ${className}`} 
        {...props}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#334155] via-[#e2e8f0] to-[#334155] bg-[length:200%_100%] animate-gold-border"></div>
        <div className="relative px-10 py-4 bg-black rounded h-full w-full flex items-center justify-center gap-3 font-mono text-xs font-bold tracking-[0.2em] uppercase text-white transition-colors group-hover:text-[#e2e8f0] group-hover:bg-[#0a0a0c]">
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
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
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

  const toggleWallet = () => setWalletConnected(!walletConnected);

  return (
    <div className="min-h-screen bg-[#030304] text-white font-sans selection:bg-blue-500/40 selection:text-white overflow-x-hidden">
      
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 rounded-full border border-white/20 bg-[#050505]/90 backdrop-blur-xl px-6 py-3 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300">
        <div className="flex items-center justify-between relative">
          
          <div className="flex items-center gap-3 cursor-pointer group z-10" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
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

          <div className="hidden md:block z-10">
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
                  <Wallet className="w-4 h-4" /> Connect Wallet
                </>
              )}
            </Button>
          </div>

          <div className="md:hidden z-10">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-300 hover:text-white p-2">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 mt-4 border-t border-gray-800' : 'max-h-0'}`}>
          <div className="py-4 space-y-3 flex flex-col items-center">
            {NAVIGATION.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className="text-sm text-gray-300 hover:text-white tracking-widest uppercase font-mono"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-2 w-full px-4">
               <Button variant="gradient" className="w-full rounded-full" onClick={() => { toggleWallet(); setMobileMenuOpen(false); }}>
                {walletConnected ? 'Connected' : 'Connect Wallet'}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative pt-40 pb-32 lg:pt-60 lg:pb-48 px-4 overflow-hidden flex items-center justify-center min-h-screen">
        <CyberGlobe />
        <div className="max-w-7xl mx-auto text-center relative z-20 pointer-events-auto">
          
        <h1
          className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl 
                    font-light tracking-tighter
                    text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-00
                    leading-tight font-montserrat mb-4">
          THE ONCHAIN
        </h1>

        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl 
                      font-black tracking-tighter 
                      mb-16 text-white leading-none 
                      font-lastica uppercase drop-shadow-2xl">
          CONTEXT PROTOCOL
        </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto mb-16 tracking-[0.3em] font-light uppercase font-sans">
            The discovery, billing, and access layer for onchain MCPs
          </p>
          
          <div className="flex flex-col items-center justify-center gap-6">
            <Button variant="silverBorder" asChild>
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

      {/* --- FEATURES SECTION (UPDATED FOR ADVANCED GLASS LOOK) --- */}
      <section id="features" className="relative z-10 py-32 bg-[#050507]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Bridging isolated AI agents with high-fidelity, real-time context.">
            PROTOCOL ARCHITECTURE
          </SectionTitle>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, idx) => (
              <TiltCard key={idx} className="h-[420px]">
                {/* COMPLETE REDESIGN FOR "THICK GLASS" LOOK
                   - rounded-[40px]: Very smooth corners matching the generated image
                   - backdrop-blur-2xl: Heavy blur for that premium glass feel
                   - shadow-[inset...]: Creates the 3D depth and thickness of the glass slab
                */}
                <div className="relative h-full p-8 rounded-[40px] overflow-hidden group transition-all duration-500
                              bg-[#0f0f11]/60 backdrop-blur-2xl
                              border border-white/10
                              shadow-[inset_0px_0px_20px_rgba(255,255,255,0.05),0_10px_40px_-10px_rgba(0,0,0,0.8)]
                              hover:shadow-[inset_0px_0px_30px_rgba(59,130,246,0.1),0_0_25px_rgba(59,130,246,0.2)]">
                  
                  {/* Internal "Watery" Reflection Gradient */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_70%)] opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  
                  {/* Top Highlight "Lip" for Thickness */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50"></div>
                  
                  {/* Content Container */}
                  <div className="relative z-10 flex flex-col h-full">
                    
                    {/* Header: Icon & Stat Badge */}
                    <div className="flex justify-between items-start mb-8">
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-transparent border border-blue-500/30 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <span className="text-[10px] font-mono text-gray-400 border border-white/10 px-3 py-1.5 rounded-full bg-black/40 shadow-inner backdrop-blur-sm">
                        {feature.stat}
                      </span>
                    </div>
                    
                    {/* Title Area */}
                    <div className="mt-2">
                        <h3 className="text-xl font-bold text-white mb-2 font-sans tracking-tight leading-tight">
                        <GlitchText text={feature.title} />
                        </h3>
                        <div className="text-[10px] font-mono text-blue-400 mb-6 uppercase tracking-widest font-bold opacity-80">
                            {feature.subtitle}
                        </div>
                    </div>
                    
                    {/* Description - pushed to bottom */}
                    <p className="text-gray-400 text-sm leading-relaxed font-montserrat font-medium mt-auto border-t border-white/5 pt-6 group-hover:text-gray-300 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Hover Outer Glow Border */}
                  <div className="absolute inset-0 rounded-[40px] border-2 border-transparent group-hover:border-blue-500/30 transition-colors duration-500 pointer-events-none"></div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <section id="architecture" className="relative z-10 py-32 px-4 overflow-hidden border-y border-white/5 bg-[#030304]">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Trustless data flow secured by cryptographic proofs and smart contracts.">
            NETWORK TOPOLOGY
          </SectionTitle>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            <div className="space-y-6 relative">
              <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-500/0 via-blue-500/20 to-blue-500/0"></div>
              
              {[
                { title: 'Provider Node', desc: 'Dockerized MCPs running locally, exposed securely via Cloudflare tunnels.', icon: <Server size={18} />, id: '01' },
                { title: 'Onchain Registry', desc: 'Immutable smart contract registry. Discovery and billing settled in $AVAX.', icon: <Database size={18} />, id: '02' },
                { title: 'Context Stream', desc: 'Direct, encrypted pipe from provider to agent. Validated by Chainlink Automation.', icon: <Radio size={18} />, id: '03' }
              ].map((step, i) => (
                <div key={i} className="relative flex gap-8 group">
                  <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-[#0A0A0C] border border-blue-900/50 flex items-center justify-center text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.1)] group-hover:border-blue-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
                    {step.icon}
                  </div>
                  <div className="pt-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono text-blue-500/50">_SYS.{step.id}</span>
                      <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-md">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-[#050505] border border-gray-800 rounded-lg p-1 shadow-2xl">
                <div className="bg-[#111] px-4 py-2 flex items-center justify-between rounded-t border-b border-gray-800">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                  </div>
                  <div className="text-[10px] font-mono text-gray-500 uppercase">root@trigslink-node:~</div>
                </div>
                
                <div className="p-6 font-mono text-sm space-y-4 min-h-[300px] text-gray-300">
                  <div className="flex">
                    <span className="text-green-500 mr-2">➜</span>
                    <span>initiating_handshake...</span>
                  </div>
                  <div className="text-blue-400 text-xs pl-4 border-l border-blue-500/30 ml-1 py-1">
                    <div>[INFO] Provider identified: 0x8a...2b</div>
                    <div>[INFO] Verifying stake... <span className="text-green-400">OK</span></div>
                  </div>
                  
                  <div className="flex">
                    <span className="text-green-500 mr-2">➜</span>
                    <span>establishing_tunnel</span>
                  </div>
                  
                  <div className="bg-blue-900/10 p-3 rounded border border-blue-500/20 text-xs">
                    <div className="flex justify-between text-blue-300 mb-2">
                      <span>TUNNEL_STATUS</span>
                      <span className="animate-pulse text-green-400">ACTIVE</span>
                    </div>
                    <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-[85%] relative">
                        <div className="absolute top-0 right-0 bottom-0 w-2 bg-white/50 animate-ping"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-purple-400">
                    <span className="animate-spin">⟳</span>
                    <span>streaming_context_data</span>
                  </div>

                  <div className="text-gray-500 text-xs mt-8 pt-4 border-t border-gray-800/50">
                    {'>'} Last login: {new Date().toUTCString()} on ttys001
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="roadmap" className="relative z-10 py-32 bg-[#050507]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Execution plan towards autonomous economic agents.">
            MISSION TIMELINE
          </SectionTitle>

          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gray-800 -translate-x-0 -translate-y-1/2"></div>
            
            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              {ROADMAP.map((item, idx) => {
                const isCurrent = item.status === 'current';
                const isCompleted = item.status === 'completed';
                
                return (
                  <div key={idx} className={`relative pt-8 md:pt-12 group`}>
                    <div className={`hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 z-20 transition-all duration-300
                      ${isCurrent ? 'bg-black border-blue-500 shadow-[0_0_15px_#3b82f6] scale-125' : 
                        isCompleted ? 'bg-blue-900 border-blue-800' : 'bg-black border-gray-700'}
                    `}></div>

                    <div className={`
                      h-full p-8 border backdrop-blur-sm transition-all duration-300 flex flex-col
                      ${isCurrent ? 'bg-blue-900/5 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.1)]' : 'bg-[#0a0a0c] border-gray-800 hover:border-gray-700'}
                    `}>
                      <div className={`text-[10px] font-mono uppercase tracking-widest mb-4 
                        ${isCurrent ? 'text-blue-400' : 'text-gray-600'}
                      `}>
                        {item.phase}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-6">{item.title}</h3>
                      
                      <ul className="space-y-4 mt-auto">
                        {item.items.map((point, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className={`mt-1.5 w-1.5 h-1.5 rounded-sm ${isCurrent ? 'bg-blue-500' : 'bg-gray-700'}`}></span>
                            <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors font-mono">{point}</span>
                          </li>
                        ))}
                      </ul>

                      {isCurrent && (
                        <div className="absolute top-0 right-0 px-3 py-1 bg-blue-600 text-[9px] font-bold text-white uppercase tracking-wider">
                          Processing
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="relative z-10 py-32 px-4 bg-[#030304] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Core contributors & protocol architects.">
            OPERATORS
          </SectionTitle>

          <div className="flex flex-wrap justify-center gap-8">
            {TEAM.map((member, idx) => (
              <OperatorCard key={idx} member={member} />
            ))}
          </div>
        </div>
      </section>

      <footer className="relative z-10 py-16 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Logo className="w-8 h-8" />
                <span className="font-bold text-xl text-white tracking-widest font-mono">TRIGSLINK</span>
              </div>
              <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
                A decentralized coordination layer for AI context. 
                Built for autonomous agents, secured by Avalanche, verified by Chainlink.
              </p>
            </div>
            
            <div>
               <h4 className="text-white font-bold mb-6 font-mono text-sm uppercase">Protocol</h4>
               <ul className="space-y-4 text-sm text-gray-500">
                 <li className="hover:text-blue-400 cursor-pointer">Documentation</li>
                 <li className="hover:text-blue-400 cursor-pointer">Whitepaper</li>
                 <li className="hover:text-blue-400 cursor-pointer">Github</li>
                 <li className="hover:text-blue-400 cursor-pointer">Audits</li>
               </ul>
            </div>

            <div>
               <h4 className="text-white font-bold mb-6 font-mono text-sm uppercase">Community</h4>
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

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-mono uppercase tracking-wider">
            <div>
              © {new Date().getFullYear()} Trigslink Foundation. All rights reserved.
            </div>
            <div className="flex gap-8">
               <span>Privacy Policy</span>
               <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Styles */}
      <style jsx global>{`
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

        @media (prefers-reduced-motion: reduce) {
          .animate-gradient-roll, .animate-gold-border, .animate-noise {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}