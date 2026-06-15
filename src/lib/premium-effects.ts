import { useEffect, RefObject } from 'react';
import { gsap } from 'gsap';

/**
 * Premium 3D Magnet-Tilt effect using GSAP.
 * When the mouse hovers, the element smoothly rotates and tilts towards the cursor
 * and returns with an elegant spring-back easing.
 */
export function useHoverTilt(ref: RefObject<HTMLElement | null>, intensity: number = 10) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const percentX = (x / rect.width) - 0.5; // -0.5 to 0.5
      const percentY = (y / rect.height) - 0.5; // -0.5 to 0.5
      
      // Calculate 3D rotations
      const rotateX = -percentY * intensity;
      const rotateY = percentX * intensity;
      
      // Calculate translations for subtle parallax
      const translateX = percentX * (intensity * 0.5);
      const translateY = percentY * (intensity * 0.5);

      gsap.to(el, {
        rotateX,
        rotateY,
        x: translateX,
        y: translateY,
        transformPerspective: 1000,
        ease: 'power3.out',
        duration: 0.5,
        overwrite: 'auto'
      });
    };

    const onMouseLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        x: 0,
        y: 0,
        ease: 'elastic.out(1.1, 0.65)',
        duration: 1.2,
        overwrite: 'auto'
      });
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [ref, intensity]);
}

/**
 * Holographic parallax for decorative ambient circles to slide subtly with cursor movement.
 */
export function useParallaxAmbient(containerRef: RefObject<HTMLElement | null>, targetSelector: string, intensity: number = 30) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets = container.querySelectorAll(targetSelector);
    if (!targets.length) return;

    const onMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const percentX = (e.clientX / innerWidth) - 0.5;
      const percentY = (e.clientY / innerHeight) - 0.5;

      targets.forEach((target, index) => {
        const factor = (index + 1) * intensity;
        gsap.to(target, {
          x: percentX * factor,
          y: percentY * factor,
          ease: 'power2.out',
          duration: 1.2,
          overwrite: 'auto'
        });
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [containerRef, targetSelector, intensity]);
}

/**
 * Ultra premium letter/word reveal. Splits heading strings into characters
 * and flips/reveals them into position with elegant cinematic motion.
 */
export function animateTextReveal(targetEl: HTMLElement | null) {
  if (!targetEl) return;
  
  const text = targetEl.textContent || '';
  targetEl.innerHTML = '';
  
  // Set container perspective
  gsap.set(targetEl, { style: 'perspective: 1000px; display: inline-block;' });

  const words = text.split(' ');
  words.forEach((wordStr, wIndex) => {
    const wordSpan = document.createElement('span');
    wordSpan.style.display = 'inline-block';
    wordSpan.style.whiteSpace = 'nowrap';
    wordSpan.style.marginRight = '0.25em';
    
    const chars = Array.from(wordStr);
    chars.forEach((charStr) => {
      const charSpan = document.createElement('span');
      charSpan.textContent = charStr;
      charSpan.style.display = 'inline-block';
      charSpan.style.transformOrigin = '50% 100%';
      charSpan.className = 'gsap-char-reveal-item';
      wordSpan.appendChild(charSpan);
    });
    
    targetEl.appendChild(wordSpan);
  });

  const chars = targetEl.querySelectorAll('.gsap-char-reveal-item');
  gsap.fromTo(chars, 
    {
      opacity: 0,
      y: 40,
      rotateX: -90,
      scaleY: 0.3,
    },
    {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scaleY: 1,
      stagger: 0.035,
      ease: 'power4.out',
      duration: 1.4,
      delay: 0.1
    }
  );
}

/**
 * Scroll trigger helper that reveals sections and staggers their children when visible.
 */
export function useScrollStagger(containerRef: RefObject<HTMLElement | null>, childrenSelector: string, triggerOffset: number = 0.8) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.querySelectorAll(childrenSelector);
    if (!children.length) return;

    // Initial state
    gsap.set(children, {
      opacity: 0,
      y: 35,
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(children, {
              opacity: 1,
              y: 0,
              stagger: 0.12,
              ease: 'power3.out',
              duration: 1.1,
              delay: 0.1,
              overwrite: 'auto'
            });
            // Stop observing after firing once
            observer.unobserve(container);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [containerRef, childrenSelector]);
}
