import { useEffect } from 'react';
import { gsap } from 'gsap';

/**
 * "acroll" reveal (typo kept intentionally to match request).
 * Reveals any elements matching selector when they enter the viewport.
 */
export function useAcrollReveal(selector: string = '.acroll-reveal') {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (!elements.length) return;

    // Initial hidden state
    gsap.set(elements, {
      opacity: 0,
      y: 28,
      rotateX: 10,
      transformPerspective: 900,
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;

          gsap.to(el, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.0,
            ease: 'power3.out',
            overwrite: 'auto',
          });

          observer.unobserve(el);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selector]);
}

