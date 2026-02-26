import { useState, useEffect, useRef } from 'react';
import type { TeamMember } from '../types';

export const OperatorCard = ({ member }: { member: TeamMember }) => {
  const [glitchState, setGlitchState] = useState(0); 
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 1. Setup Intersection Observer to detect when the card is on screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "100px" } // Load slightly before it scrolls into view
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  // 2. Only run the glitch loop when the card is visible
  useEffect(() => {
    if (!isVisible) {
      setGlitchState(0);
      return;
    }
    
    let timeoutId: ReturnType<typeof setTimeout>;
    const runGlitchLoop = () => {
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
  }, [isVisible]);

  return (
    <div ref={cardRef} className="relative group w-full max-w-[288px] h-[420px] bg-[#0A0A0C] flex-shrink-0 mx-auto transform-gpu will-change-transform">
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
            
            {/* 3. Conditionally render the heavy noise animations so they don't block scrolling */}
            {isVisible && (
              <>
                <div className="absolute inset-0 z-10 opacity-30 mix-blend-overlay pointer-events-none animate-noise bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                <div className="absolute inset-0 z-10 opacity-20 pointer-events-none bg-[repeating-linear-gradient(transparent,transparent_2px,#000_3px)]"></div>
              </>
            )}
            
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 transform-gpu"
              style={{ backgroundImage: `url(${member.image})`, filter: 'grayscale(100%) sepia(100%) hue-rotate(180deg) saturate(1.5) brightness(0.8) contrast(1.2)' }}
            />
            
            {/* 4. Only render the glitch layer when active, rather than hiding it with opacity: 0 */}
            {isVisible && glitchState === 1 && (
              <div 
                  className="absolute inset-0 bg-cover bg-center z-20 pointer-events-none mix-blend-hard-light transform-gpu"
                  style={{ backgroundImage: `url(${member.image})`, opacity: 0.8, clipPath: 'inset(10% 0 60% 0)', transform: 'translate(-5px, 0)', filter: 'grayscale(100%) sepia(100%) hue-rotate(180deg) brightness(1.5) contrast(1.5)' }}
              />
            )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-[#0f0f12] border-t border-blue-900/30 p-6 flex flex-col justify-center transform-gpu">
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