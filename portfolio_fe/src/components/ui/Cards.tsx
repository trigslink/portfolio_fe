import { useRef, useState, useEffect } from 'react';
import type { ReactNode, MouseEvent } from 'react';

export const CyberMetallicIcon = ({ children }: { children: ReactNode }) => (
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

export const TiltCard = ({ children, className = "" }: { children: ReactNode, className?: string }) => {
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