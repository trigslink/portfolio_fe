import { useEffect } from 'react';
import Lenis from 'lenis';
import { Database, Radio, Zap } from 'lucide-react';

// Layout & Components
import { Navigation } from './components/Navigation';
import { Footer } from './components/Foot';
import { CyberGlobe } from './components/CyberGlobe';
import { OperatorCard } from './components/OperatorCard';
import { SectionTitle, GlitchText } from './components/ui/Elements';
import { CyberMetallicIcon, TiltCard } from './components/ui/Cards';

// Data
import { FEATURES, ROADMAP, TEAM } from './constants/data';
import asciiTerminal from '/images/ascii.png'; 

export default function App() {
  
  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({ 
      duration: 2.0, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      syncTouch: true 
    });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => { lenis.destroy(); };
  }, []);

  return (
    <div className="min-h-screen bg-[#030304] text-white font-sans selection:bg-blue-500/40 selection:text-white overflow-x-clip relative w-full max-w-[100vw]">
      
      <Navigation />

      {/* Hero Section */}
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

      {/* Features Section */}
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
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-8 md:mb-10">
                        <CyberMetallicIcon>{feature.icon}</CyberMetallicIcon>
                        <div className="text-right pt-2 flex-shrink-0">
                          <div className="text-2xl md:text-3xl font-mono font-black text-white tracking-tighter mb-0.5 leading-none group-hover:text-blue-400 transition-colors">{statValue}</div>
                          <div className="text-[8px] md:text-[9px] text-blue-400/60 font-mono uppercase tracking-[0.2em] font-bold">{statUnit}</div>
                        </div>
                      </div>
                      <div className="mb-6 relative">
                        <h3 className="text-lg md:text-2xl font-bold text-white mb-3 font-sans tracking-tight leading-tight"><GlitchText text={feature.title.trim()} /></h3>
                        <div className="inline-block px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                          <span className="text-[8px] font-mono text-blue-400 uppercase tracking-[0.2em] font-black">{feature.subtitle}</span>
                        </div>
                      </div>
                      <p className="text-gray-500 text-xs md:text-[13px] leading-relaxed mt-auto border-t border-white/5 pt-6 group-hover:text-gray-300 transition-colors duration-300">{feature.description}</p>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>
        <svg className="absolute w-0 h-0 pointer-events-none"><defs><filter id="black-chrome" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur in="SourceAlpha" stdDeviation="0.8" result="blur" /><feSpecularLighting in="blur" surfaceScale="7" specularConstant="1.5" specularExponent="40" lightingColor="#ffffff" result="specOut"><fePointLight x="-5000" y="-10000" z="20000" /></feSpecularLighting><feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut" /><feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" /></filter></defs></svg>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="relative z-10 py-16 md:py-32 px-4 overflow-hidden border-y border-white/5 bg-[#030304] w-full">
        <div className="max-w-6xl mx-auto w-full">
          <SectionTitle subtitle="A multi-layered execution proxy replacing human subjectivity with deterministic trust.">NETWORK TOPOLOGY</SectionTitle>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="space-y-8 md:space-y-10 relative">
              <div className="absolute left-8 top-10 bottom-10 w-[2px] z-0 overflow-visible">
                <div className="absolute inset-0 bg-white/5 w-[1px] mx-auto"></div>
                <div className="absolute inset-0 w-full h-full opacity-30 animate-dotted-flow" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 40%, transparent 50%)', backgroundSize: '4px 20px', backgroundRepeat: 'repeat-y' }}></div>
              </div>
              {[
                { title: 'Autonomous Resolution Layer', desc: 'Intrigue logic replaces manual proposers.', icon: <Zap size={20} /> },
                { title: 'Unified Liquidity Layer', desc: 'The ULR aggregates depth across chains.', icon: <Database size={20} /> },
                { title: 'Autonomous Grounding Layer', desc: 'Independent nodes run AI checks.', icon: <Radio size={20} /> }
              ].map((step, i) => (
                <div key={i} className="relative flex gap-4 md:gap-8 items-start group">
                  <div className="relative z-10 flex-shrink-0 w-12 md:w-16 flex justify-center"><CyberMetallicIcon>{step.icon}</CyberMetallicIcon></div>
                  <div className="pt-2 md:pt-3">
                    <h3 className="text-base md:text-xl font-bold text-white mb-2 tracking-tighter uppercase group-hover:text-blue-400 transition-colors">{step.title}</h3>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-sm border-l border-white/10 pl-3 md:pl-4 group-hover:border-blue-500/50 transition-colors">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Terminal View */}
            <div className="relative group w-full mt-8 lg:mt-0">
              <div className="relative bg-[#08080a] border border-white/10 rounded-xl md:rounded-2xl overflow-hidden shadow-[inset_0px_1px_2px_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.8)] w-full">
                <div className="bg-white/5 px-3 py-3 flex items-center justify-between border-b border-white/5">
                  <div className="flex gap-1.5 md:gap-2"><div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div><div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div></div>
                  <div className="text-[8px] md:text-[9px] font-mono text-gray-500 uppercase tracking-widest font-bold">trigslink_mainnet.sh</div>
                </div>
                <div className="p-4 md:p-8 font-mono text-[10px] md:text-xs text-gray-400 h-[280px] md:h-[340px] bg-black/40 flex flex-col justify-between overflow-x-hidden">
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex gap-2 md:gap-3"><span className="text-blue-500">➜</span><span className="truncate">initiating_autonomous_handshake...</span></div>
                    <div className="pl-4 md:pl-6 text-blue-400/80 truncate">[INFO] Verifying grounding evidence... <span className="text-green-500 ml-1">SUCCESS</span></div>
                  </div>
                  <div className="flex justify-center py-4"><img src={asciiTerminal} alt="ASCII" className="w-24 h-24 md:w-32 md:h-32 object-contain" /></div>
                  <div className="bg-blue-900/10 p-3 md:p-4 rounded-xl border border-blue-500/20 shadow-inner w-full">
                     <div className="flex justify-between mb-2"><span className="text-[9px] md:text-[10px] font-black text-blue-300 tracking-widest uppercase">Truth_Sync</span><span className="text-[9px] md:text-[10px] text-green-400 animate-pulse font-bold">100% SECURE</span></div>
                     <div className="h-1 bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-blue-500 w-full shadow-[0_0_10px_#3b82f6]"></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="relative z-10 py-16 md:py-32 bg-[#050507] w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Evolution from deterministic trust to a global ecosystem of autonomous truth.">
            MISSION TIMELINE
          </SectionTitle>
          
          <div className="relative">
            {/* The Horizontal Dotted Line & Falling Star */}
            <div className="hidden md:block absolute top-[130px] left-0 w-full h-[2px] overflow-visible z-0">
                <div className="absolute inset-0 bg-blue-900/20"></div>
                <div className="absolute inset-0 opacity-50 animate-dotted-flow-horizontal" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 40%, transparent 50%)', backgroundSize: '20px 4px', backgroundRepeat: 'repeat-x' }}></div>
                
                {/* FALLING STAR INTENSITY */}
                <div className="absolute top-[-3px] bottom-[-3px] w-64 bg-gradient-to-r from-transparent via-blue-500 to-cyan-300 blur-sm opacity-0 animate-shooting-star"></div>
                <div className="absolute top-[-1px] bottom-[-1px] w-64 bg-gradient-to-r from-transparent via-blue-400 to-white opacity-0 animate-shooting-star">
                     {/* The bright hot core at the head of the star */}
                     <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full blur-[2px] shadow-[0_0_20px_5px_rgba(255,255,255,0.9),0_0_40px_10px_rgba(59,130,246,0.8)]"></div>
                </div>
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
                      
                      {/* The Synapse Nodes */}
                      <div className="hidden md:flex relative h-[40px] items-center justify-start mb-6 z-20">
                           <div className={`w-4 h-4 rounded-full border-4 transition-all duration-500 relative ${isCurrent ? 'bg-black border-blue-500 shadow-xl scale-125' : isCompleted ? 'bg-blue-900 border-blue-800' : 'bg-black border-gray-700'}`}>
                              {/* INCREASED GLOW ON CURRENT NODE TO MATCH STAR */}
                              {isCurrent && (
                                <>
                                  <div className="absolute inset-0 rounded-full bg-blue-300 animate-ping opacity-100"></div>
                                  <div className="absolute inset-0 rounded-full bg-white blur-[4px] opacity-70 shadow-[0_0_15px_#ffffff]"></div>
                                </>
                              )}
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

      {/* Team Section */}
      <section id="team" className="relative z-10 py-16 md:py-32 px-4 bg-[#030304] border-t border-white/5 w-full">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Founding Team of the Trigslink Protocol">HALL OF FAME</SectionTitle>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 w-full">
            {TEAM.map((member, idx) => (<OperatorCard key={idx} member={member} />))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Global CSS injected into component tree */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap');
        @font-face { font-family: 'kora'; src: url('/fonts/kora.ttf') format('opentype'); font-weight: normal; font-style: normal; font-display: block; }
        
        html { scroll-behavior: smooth; }
        
        .font-lastica { 
          font-family: 'kora', 'Michroma', sans-serif; text-transform: uppercase; display: block; 
          transform: scaleX(1.05); transform-origin: center left; backface-visibility: hidden; 
          -webkit-backface-visibility: hidden; perspective: 1000px; transform-style: preserve-3d; 
          will-change: transform; letter-spacing: -0.02em; line-height: 1; 
        }
        
        @media (min-width: 768px) { .font-lastica { display: inline-block; transform: scaleX(1.25); transform-origin: center; } }

        .font-montserrat { font-family: 'Montserrat', sans-serif; }
        .clip-path-slant { clip-path: polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%); }
        .font-kora { font-family: 'kora', sans-serif; }

        @keyframes silver-rotate { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-silver-rotate { animation: silver-rotate 2.5s ease-in-out infinite; }
        
        @keyframes noise { 0% { background-position: 0 0; } 10% { background-position: -5% -10%; } 100% { background-position: 0 0; } }
        .animate-noise { animation: noise 0.5s steps(3) infinite; }

        @keyframes dotted-flow { 0% { background-position: 0 0; } 100% { background-position: 0 20px; } }
        .animate-dotted-flow { animation: dotted-flow 1s linear infinite; }

        @keyframes dotted-flow-horizontal { 0% { background-position: 0px center; } 100% { background-position: 20px center; } }
        .animate-dotted-flow-horizontal { animation: dotted-flow-horizontal 1s linear infinite; }

        /* The New Shooting Star Animation */
        @keyframes shooting-star { 
          0% { left: -30%; opacity: 0; } 
          5% { opacity: 1; } 
          80% { opacity: 1; } 
          100% { left: 110%; opacity: 0; } 
        }
        .animate-shooting-star { animation: shooting-star 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite; }

        @media (prefers-reduced-motion: reduce) { .animate-noise, .animate-dotted-flow, .animate-dotted-flow-horizontal, .animate-shooting-star, .animate-silver-rotate { animation: none; } }
      `}} />
    </div>
  );
}