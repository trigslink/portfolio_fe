import { useState, useEffect, useRef, type ReactNode } from 'react';
import { 
  ShieldCheck, Globe, Zap, Menu, X, Github, Youtube, 
  Activity, Database, Radio, ArrowRight, Cpu, Lock, Layers
} from 'lucide-react';

// --- NEW DATA CONSTANTS ---

const FEATURES = [
  {
    title: 'Autonomous Resolution',
    subtitle: 'Zero-Human Bottleneck',
    description: 'Collapses the "Zombie Period" by replacing human-governed dispute windows with a deterministic resolution engine that triggers upon event conclusion[cite: 121, 124].',
    icon: <Zap className="w-8 h-8 text-blue-400" />, 
    stat: '15s Finality' // cite: 125
  },
  {
    title: 'Universal Liquidity (ULR)',
    subtitle: 'Cross-Chain Rails',
    description: 'Unifies fragmented cross-chain capital into a single "Global Truth Pool," allowing instant bets from any network while eliminating shadow spreads[cite: 127, 128, 129].',
    icon: <Globe className="w-8 h-8 text-blue-400" />,
    stat: 'Omni-chain'
  },
  {
    title: 'Machine Grounding',
    subtitle: 'Evidence-Based Integrity',
    description: 'Independent nodes verify outcomes against official news wires and document repositories, eliminating the heuristic inference vulnerability of human voting[cite: 147, 148].',
    icon: <ShieldCheck className="w-8 h-8 text-blue-400" />,
    stat: 'AI-Verified'
  },
  {
    title: 'Capital Velocity',
    subtitle: 'Institutional Efficiency',
    description: 'Eliminates non-productive "Dead Capital" states, allowing market makers to recycle liquidity instantly for real-time risk management[cite: 72, 75].',
    icon: <Activity className="w-8 h-8 text-blue-400" />,
    stat: '100% Utility'
  },
];

const ROADMAP = [
  {
    phase: 'PHASE 01',
    title: 'Deterministic Foundation',
    items: [
      'Autonomous Resolution Layer Deployment [cite: 123]',
      'Verification Script SDK Release [cite: 118]',
      'Core Handshake Logic Integration [cite: 125]'
    ],
    status: 'current'
  },
  {
    phase: 'PHASE 02',
    title: 'Universal Rails & Scale',
    items: [
      'ULR Cross-Chain Bridge [cite: 127]',
      'Global Truth Pool Aggregator [cite: 160]',
      'Institutional API Launch [cite: 233]',
      'High-Scale SDK Integration [cite: 157]'
    ],
    status: 'upcoming'
  },
  {
    phase: 'PHASE 03',
    title: 'Autonomous Economy',
    items: [
      'DAO Governance Transition [cite: 245]',
      'Parametric Underwriting Hub [cite: 251]',
      'Enterprise Compliance Gateways [cite: 248]'
    ],
    status: 'upcoming'
  },
];

const TEAM = [
  { name: 'Aakash Jaiswal', role: 'Architect & Author ', initials: 'AJ', image: '/images/aakash.png' },
  { name: 'Charles Cai', role: 'System Architect', initials: 'CC', image: '/images/charles.png' },
  { name: 'Gianluca Godfrey', role: 'Onchain Evangelist', initials: 'GG', image: '/images/gianluca.png' },
  { name: 'Yellie Cefalù', role: 'CryptoKitana', initials: 'YC', image: '/images/yellie.png' },
  { name: 'Odudu Essien', role: 'Pixel Crafter', initials: 'OE', image: '/images/odudu.png' },
];

// --- CORE UI COMPONENTS ---

export default function TrigslinkTruthEngine() {
  return (
    <div className="min-h-screen bg-[#030304] text-white font-sans selection:bg-blue-500/40 selection:text-white">
      
      {/* 1. NAVIGATION BAR */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold">T</div>
          <span className="font-mono text-sm tracking-widest uppercase opacity-80">Trigslink Protocol</span>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] font-mono tracking-widest uppercase">
          <a href="#features" className="hover:text-blue-400 transition-colors">Infrastructure</a>
          <a href="#architecture" className="hover:text-blue-400 transition-colors">Topology</a>
          <a href="#roadmap" className="hover:text-blue-400 transition-colors">Mission</a>
          <a href="https://mcp.trigslink.com" className="text-blue-500 hover:text-blue-300">Trigslink MCP</a>
        </div>
        <Button variant="silverRotating">Read Whitepaper</Button>
      </nav>

      {/* 2. HERO SECTION: THE TRUTH ENGINE */}
      <section className="relative pt-48 pb-32 px-6 flex flex-col items-center text-center overflow-hidden">
        {/* Animated Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        
        <h1 className="text-[12vw] sm:text-[10vw] md:text-[9vw] lg:text-[8.5vw] font-black tracking-[-0.05em] leading-[0.8] font-lastica uppercase mb-8 scale-y-[0.9]">
          Truth Engine
        </h1>
        
        <p className="max-w-2xl text-slate-400 text-sm md:text-lg font-light tracking-widest uppercase leading-relaxed mb-12">
          Collapsing the "Zombie Period" of settlement through 15-second autonomous finality and machine-verified grounding[cite: 4, 33].
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <div className="px-6 py-3 border border-white/10 rounded bg-white/5 backdrop-blur flex items-center gap-3">
            <Cpu size={16} className="text-blue-400" />
            <span className="text-[10px] font-mono uppercase tracking-tighter">Autonomous Execution</span>
          </div>
          <div className="px-6 py-3 border border-white/10 rounded bg-white/5 backdrop-blur flex items-center gap-3">
            <Layers size={16} className="text-blue-400" />
            <span className="text-[10px] font-mono uppercase tracking-tighter">Universal Liquidity Rails</span>
          </div>
        </div>
      </section>

      {/* 3. PROTOCOL PILLARS (The Grid) */}
      <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-3xl font-bold uppercase tracking-tight mb-4 font-lastica">Deterministic Infrastructure</h2>
          <p className="text-slate-500 max-w-xl text-sm">Replacing "Optimistic Trust" with architectural certainty through decentralized compute and machine-learning grounded logic[cite: 32, 163].</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => (
            <div key={i} className="p-8 border border-white/5 bg-[#0A0A0C] hover:border-blue-500/50 transition-all group">
              <div className="mb-6">{f.icon}</div>
              <h3 className="font-bold text-lg mb-2 uppercase group-hover:text-blue-400 transition-colors">{f.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">{f.description}</p>
              <div className="pt-4 border-t border-white/5 text-[10px] font-mono text-blue-500 tracking-widest uppercase font-bold">{f.stat}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TEAM SECTION: HALL OF FAME */}
      <section id="team" className="py-32 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-[5vw] font-black uppercase tracking-tighter font-lastica mb-20 leading-none">The Architects</h2>
          <div className="flex flex-wrap justify-center gap-12">
            {TEAM.map((member, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-32 h-32 bg-[#111] border border-white/10 rounded-full mb-6 flex items-center justify-center text-3xl font-black text-white/20 grayscale hover:grayscale-0 transition-all cursor-crosshair">
                  {member.initials}
                </div>
                <h4 className="font-bold uppercase text-sm tracking-widest">{member.name}</h4>
                <p className="text-[10px] text-blue-500 uppercase font-mono mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INFRASTRUCTURE FOOTER */}
      <footer className="py-20 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Logo className="w-10 h-10" />
              <img src={trigslinkFont} alt="TRIGSLINK" className="h-6 opacity-80" />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Trigslink is envisioned as a decentralized public good[cite: 258], engineering the convergence of autonomous computation and global information markets.
            </p>
          </div>
          
          <div className="space-y-6">
            <h5 className="text-[10px] font-mono uppercase tracking-widest text-white/40">Infrastructure Stack</h5>
            <ul className="space-y-4 text-xs font-mono">
              <li className="flex items-center gap-3 text-slate-500">
                <img src="https://cryptologos.cc/logos/chainlink-link-logo.svg" className="w-4 h-4" /> 
                CRE (Chainlink Runtime Environment) [cite: 132]
              </li>
              <li className="flex items-center gap-3 text-slate-500">
                <img src="https://cryptologos.cc/logos/chainlink-link-logo.svg" className="w-4 h-4" /> 
                Chainlink CCIP / Universal Liquidity Bridge [cite: 134]
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h5 className="text-[10px] font-mono uppercase tracking-widest text-white/40">Connect</h5>
            <div className="flex gap-4">
              <a href={SOCIAL_LINKS.github} className="p-3 border border-white/10 rounded hover:bg-white/5 transition-all"><Github size={18} /></a>
              <a href={SOCIAL_LINKS.x} className="p-3 border border-white/10 rounded hover:bg-white/5 transition-all"><XTwitterIcon size={18} /></a>
            </div>
            <p className="text-[10px] text-slate-600 font-mono italic">Contact: {cite: 261}</p>
          </div>
        </div>
      </footer>

      {/* Global CSS for unique animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes silver-rotate {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animate-silver-rotate {
          background: linear-gradient(90deg, #1a1a1a, #e5e5e5, #1a1a1a);
          background-size: 200% 100%;
          animation: silver-rotate 3s linear infinite;
        }
        .font-lastica {
          font-family: 'Korataki', 'Michroma', sans-serif;
          letter-spacing: -0.05em;
        }
      `}} />
    </div>
  );
}

// Sub-component for the specific metallic button style requested
function Button({ children, variant, className }: any) {
  if (variant === 'silverRotating') {
    return (
      <button className="relative p-[1px] rounded overflow-hidden group active:scale-95 transition-transform">
        <div className="absolute inset-0 animate-silver-rotate" />
        <div className="relative px-6 py-2 bg-black rounded-[3px] text-[10px] font-mono tracking-widest uppercase text-white group-hover:bg-transparent transition-colors">
          {children}
        </div>
      </button>
    );
  }
  return <button className={className}>{children}</button>;
}