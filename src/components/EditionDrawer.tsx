import { motion } from 'motion/react';
import { X, Sparkles, AlertCircle, Info, Heart } from 'lucide-react';
import { Edition } from '../types';

interface EditionDrawerProps {
  edition: Edition | null;
  onClose: () => void;
  onRequestAccess: () => void;
}

export default function EditionDrawer({ edition, onClose, onRequestAccess }: EditionDrawerProps) {
  if (!edition) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-end justify-center">
      {/* Dark overlay backdrop */}
      <motion.div
        id="edition-drawer-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-sage-950/45 backdrop-blur-sm"
      />

      {/* Concrete sliding sheet */}
      <motion.div
        id="edition-drawer-container"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
        className="relative w-full max-w-5xl bg-cream-100 rounded-t-3xl shadow-2xl p-6 md:p-10 border-t border-cream-200 overflow-y-auto max-h-[90vh] z-10"
      >
        {/* Header decoration */}
        <div className="flex items-center justify-between border-b border-cream-200 pb-5 mb-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-sans tracking-[0.3em] text-gold-500 font-semibold uppercase">
              CURATED ARRIVAL
            </span>
            <h3 className="font-serif text-2xl md:text-3xl tracking-tight text-sage-900 mt-1">
              The {edition.title}
            </h3>
          </div>
          <button
            id="close-edition-drawer"
            className="p-1.5 rounded-full hover:bg-cream-200 transition-colors duration-200 text-sage-700"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content body layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Images Section on the Left */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative overflow-hidden rounded-2xl bg-cream-200 aspect-[4/3] border border-cream-300 shadow-sm group">
              <img
                src={edition.image}
                alt={edition.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 py-1.5 px-3 rounded-full bg-cream-100/95 backdrop-blur-sm border border-gold-300/30 text-[9px] font-sans font-medium tracking-widest text-gold-600">
                {edition.date} EDITION
              </div>
            </div>

            {/* Quote of the edition */}
            <div className="p-5 rounded-2xl bg-sage-50 border border-sage-200/50 flex flex-col justify-between">
              <span className="text-gold-500/80 mb-2">
                <Sparkles size={16} />
              </span>
              <p className="font-serif italic text-sage-800 text-[13px] leading-relaxed">
                "{edition.philosophy}"
              </p>
            </div>
          </div>

          {/* Details Section on the Right */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <h4 className="text-[10px] font-sans uppercase tracking-[0.2em] text-sage-500 font-semibold">
                CURATION THEME
              </h4>
              <p className="font-serif italic text-xl md:text-2xl text-gold-600">
                {edition.theme}
              </p>
              <p className="text-xs text-sage-700 leading-relaxed font-light mt-3">
                {edition.description}
              </p>
            </div>

            {/* List and deep dive of what arrives */}
            <div className="space-y-4 pt-4 border-t border-cream-200">
              <h5 className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-sage-800">
                WHAT ARRIVES AT YOUR DOOR:
              </h5>

              <div className="space-y-4">
                {edition.curatedItems.map((item) => (
                  <div
                    key={item.id}
                    id={`curated-item-${item.id}`}
                    className="p-4 rounded-xl bg-cream-50 hover:bg-cream-200/30 border border-cream-300/50 transition-all duration-300"
                  >
                    <div className="flex md:items-center justify-between flex-col md:flex-row gap-1">
                      <span className="text-[10px] font-sans uppercase font-medium tracking-[0.16em] text-gold-500">
                        {item.category}
                      </span>
                      <span className="text-[9px] font-mono text-sage-500 tracking-tight">
                        {item.material}
                      </span>
                    </div>
                    <h6 className="font-serif text-base tracking-normal text-sage-900 font-medium mt-1">
                      {item.title}
                    </h6>
                    <p className="text-xs text-sage-700 leading-relaxed font-light mt-1.5">
                      {item.description}
                    </p>

                    {/* Care Instructions / Notes */}
                    <div className="mt-3 pt-2.5 border-t border-cream-200/50 flex items-start gap-1.5 text-[10px] text-sage-600">
                      <Info size={12} className="text-gold-400 mt-0.5 shrink-0" />
                      <p className="italic leading-snug">
                        <strong className="not-italic font-normal text-sage-800">Ritual guidance:</strong> {item.careNote}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Section */}
            <div className="pt-6 border-t border-cream-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sage-600">
                <Heart size={14} className="text-gold-500" />
                <span className="text-[11px] font-sans font-light tracking-wide">
                  Limited to 40 annual memberships globally.
                </span>
              </div>
              <button
                id="apply-for-edition-btn"
                onClick={() => {
                  onClose();
                  onRequestAccess();
                }}
                className="w-full sm:w-auto px-8 py-3 bg-sage-800 text-cream-100 font-sans text-xs tracking-[0.2em] font-medium hover:bg-gold-500 transition-all duration-500 shadow-md"
              >
                APPLY FOR MEMBERSHIP
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
