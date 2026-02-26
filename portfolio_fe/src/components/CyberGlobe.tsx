import { useEffect, useRef } from 'react';
import type { Dot, ProjectedDot, Signal } from '../types';

export const CyberGlobe = () => {
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