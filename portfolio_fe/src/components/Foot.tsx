import { Github, Youtube } from 'lucide-react';
import { Logo, XTwitterIcon } from './ui/Elements';
import { SOCIAL_LINKS } from '../constants/data';
import trigslinkFont from '/images/trigslink_font.png';

export const Footer = () => {
  return (
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
  );
};