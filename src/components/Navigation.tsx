import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { IMAGES } from '../constants/images';
import { scrollToTarget } from '../lib/scrollEngine';

interface NavigationProps {
  onRequestAccess: () => void;
}

const LINKS = [
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Experience', href: '#experience' },
  { label: 'Membership', href: '#membership' },
  { label: 'Editions', href: '#editions-horizontal' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Community', href: '#community' },
];

export default function Navigation({ onRequestAccess }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigate = (href: string) => {
    setOpen(false);
    scrollToTarget(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
          scrolled ? 'glass-dark py-4 shadow-[0_8px_32px_rgba(0,0,0,0.35)]' : 'bg-transparent py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <a
            href="#hero-pin"
            onClick={(e) => { e.preventDefault(); scrollToTarget('#hero-pin'); }}
            className="flex items-center gap-3 group"
          >
            <img
              src={IMAGES.logo}
              alt="Lumina"
              referrerPolicy="no-referrer"
              className="w-9 h-9 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
            />
            <div className="leading-none">
              <span className="font-script text-3xl gold-gradient-text block pl-2">Lumina</span>
              <span className="text-[8px] tracking-[0.4em] uppercase text-gold-500/70 font-sans">Celebrate You</span>
            </div>
          </a>

          <nav className="hidden xl:flex items-center gap-8">
            {LINKS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => navigate(item.href)}
                className="nav-link cursor-pointer text-[10px] tracking-[0.28em] uppercase text-cream-100/70 hover:text-gold-300 transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:block">
            <button type="button" onClick={onRequestAccess} className="btn-primary cursor-pointer">
              Request Invitation
            </button>
          </div>

          <button
            type="button"
            // onClick={() => setOpen(!open)}
            className="xl:hidden p-2 text-gold-400"
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="fixed inset-x-0 top-0 z-40 pt-28 pb-10 px-8 glass-dark border-b border-gold-400/10 xl:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {LINKS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => navigate(item.href)}
                  className="text-sm tracking-[0.25em] uppercase text-cream-100/80 hover:text-gold-300"
                >
                  {item.label}
                </button>
              ))}
              <button type="button" onClick={() => { setOpen(false); onRequestAccess(); }} className="btn-primary mx-auto mt-4">
                Request Invitation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
