import { motion } from 'motion/react';
import { X, Tag, Compass, Layers } from 'lucide-react';
import { GalleryItem } from '../types';

interface MediaLightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export default function MediaLightbox({ item, onClose }: MediaLightboxProps) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
      {/* Dark blurry backdrop */}
      <motion.div
        id="lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-sage-950/75 backdrop-blur-md"
      />

      {/* Lightbox Content Container */}
      <motion.div
        id="lightbox-card"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-cream-50 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-cream-200 z-10 grid grid-cols-1 md:grid-cols-12 max-h-[85vh]"
      >
        {/* Close Button top-right over image */}
        <button
          id="close-media-lightbox"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-1.5 rounded-full bg-cream-100/80 hover:bg-cream-200 text-sage-800 backdrop-blur-sm shadow transition-colors"
          aria-label="Close details"
        >
          <X size={18} />
        </button>

        {/* Full image panel on left */}
        <div className="md:col-span-7 bg-black min-h-[300px] md:min-h-[450px] relative overflow-hidden group">
          <img
            src={item.image}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 select-none group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Narrative editorial panel on right */}
        <div className="md:col-span-5 p-6 md:p-8 flex flex-col justify-between bg-cream-50 overflow-y-auto">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 text-[9px] font-sans font-semibold text-gold-600 tracking-[0.25em] uppercase">
                <Tag size={10} />
                {item.category}
              </span>
              <h4 className="font-serif text-xl md:text-2xl text-sage-900 tracking-tight leading-snug">
                {item.title}
              </h4>
            </div>

            <div className="h-px bg-cream-300" />

            <div className="space-y-4">
              <p className="text-xs text-sage-700 leading-relaxed font-light font-sans">
                {item.description}
              </p>
              <p className="text-xs text-sage-600 italic leading-relaxed font-light font-serif">
                "Each element undergoes strict selection standards under the direct supervision of the ODE council, guaranteeing unparalleled tactile pleasure."
              </p>
            </div>
          </div>

          {/* Details footer */}
          <div className="pt-6 border-t border-cream-200/60 mt-6 flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-sage-500">
              <Compass size={13} className="text-gold-500" />
              <span className="text-[10px] font-sans tracking-wide uppercase font-medium">
                Ritual Signpost Curation
              </span>
            </div>
            <p className="text-[10px] text-sage-400 font-sans font-light leading-snug">
              Every curated box includes deep provenance records detailing the artisans, location of origins, and organic qualities of materials.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
