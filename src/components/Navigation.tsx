import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationProps {
  onRequestAccess: () => void;
}

export default function Navigation({ onRequestAccess }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'PHILOSOPHY', href: '#philosophy' },
    { label: 'MEMBERSHIP', href: '#membership' },
    { label: 'COMMUNITY   ', href: '#Community' },
    { label: 'Retreats', href: '#editions' },
    { label: 'FAQs', href: '#gallery' },
  ];

  return (
    <>
      <nav
        id="main-nav"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'bg-cream-100/90 backdrop-blur-md border-b border-cream-200/50 py-4 shadow-sm'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-8xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex flex-col items-center  items-center justify-center group">
            <img
            src="https://res.cloudinary.com/dbqgnaqqa/image/upload/v1781510557/ODELOGO_wtwz1j.png"
            alt="ODE background texture"
            referrerPolicy="no-referrer"
            className="w-[40px] ml-2  object-cover filter contrast-[1.05]"
          />
            <span className="log text-4xl  text-gold-400 transition-colors duration-300 group-hover:text-gold-500">
              Lumina
            </span>
          
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                id={`nav-link-${item.label.toLowerCase().replace(/ /g, '-')}`}
                key={item.label}
                href={item.href}
                className="font-medium text-xs uppercase tracking-[0.25em] text-gold-400 hover:text-gold-500 transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:block">
            <button
              id="nav-btn-request-access"
              onClick={onRequestAccess}
              className="px-6 py-4 text-black border border-gold-400/80 rounded-full text-sm font-sans tracking-[0.25em]   bg-gold-500 hover:text-white hover:border-gold-500 transition-all duration-500 font-medium"
            >
                 INVITE
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-1 text-gold-500 hover:text-gold-500 transition-colors duration-300"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-x-0 top-0 pt-24 pb-8 px-6 bg-cream-50 z-40 border-b border-cream-200/80 shadow-lg flex flex-col space-y-6 lg:hidden"
          >
            <div className="flex flex-col space-y-6 text-center">
              {menuItems.map((item) => (
                <a
                  id={`mobile-nav-link-${item.label.toLowerCase().replace(/ /g, '-')}`}
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-sans font-medium tracking-[0.2em] text-sage-800 hover:text-gold-500 transition-colors duration-300 py-1"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="pt-4 border-t border-cream-200 flex justify-center">
              <button
                id="mobile-nav-btn-request-access"
                onClick={() => {
                  setIsOpen(false);
                  onRequestAccess();
                }}
                className="w-full font-semibold  max-w-xs py-3 bg-sage-800 text-cream-100 hover:bg-gold-600 font-sans text-xs tracking-[0.25em] font-medium rounded-md transition-all duration-500"
              >
                REQUEST ACCESS
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
