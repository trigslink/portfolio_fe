import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X as XIcon, Github, Youtube, ArrowRight } from 'lucide-react';
import { Logo, XTwitterIcon, Button } from './ui/Elements';
import { NAVIGATION, SOCIAL_LINKS } from '../constants/data';
import trigslinkFont from '/images/trigslink_font.png';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setMobileMenuOpen(false)}>
          <div className={`w-full max-w-[340px] bg-[#0A0A0C]/95 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl transform transition-all duration-500 flex flex-col relative ${mobileMenuOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`} onClick={(e) => e.stopPropagation()}>
             <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-3 opacity-90"><Logo className="w-8 h-8" /><img src={trigslinkFont} alt="Trigslink" className="h-5 object-contain" /></div>
                <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-white transition-colors p-2"><XIcon size={24} /></button>
             </div>
             <div className="flex flex-col gap-8 items-center text-center mb-12">
             {NAVIGATION.map((item) => (
                  item.href === '/mcp' ? (
                    <Link key={item.name} to="/mcp" onClick={() => setMobileMenuOpen(false)} className="text-[12px] font-mono font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">{item.name}</Link>
                  ) : (
                    <a key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)} className="text-[12px] font-mono font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">{item.name}</a>
                  )
              ))}
             </div>
             <div className="flex justify-center gap-6 mt-auto">
                <a href={SOCIAL_LINKS.github} className="text-gray-500 hover:text-white transition-colors"><Github size={24}/></a>
                <a href={SOCIAL_LINKS.x} className="text-gray-500 hover:text-white transition-colors"><XTwitterIcon size={24}/></a>
                <a href={SOCIAL_LINKS.youtube} className="text-gray-500 hover:text-white transition-colors"><Youtube size={24}/></a>
             </div>
          </div>
      </div>

      {/* Main Navbar */}
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
            <button onClick={() => setMobileMenuOpen(true)} className="text-gray-300 hover:text-white p-2"><Menu size={24} /></button>
          </div>
        </div>
      </nav>
    </>
  );
};