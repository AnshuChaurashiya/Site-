import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: string;
  as?: 'h1' | 'h2' | 'h3';
  scrub?: boolean;
}

export default function RevealHeading({
  children,
  as: Tag = 'h2',
  scrub = false,
  className = '',
  ...props
}: RevealHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const text = children;
    el.innerHTML = '';
    el.style.overflow = 'hidden';

    text.split(' ').forEach((word, wi) => {
      const wordWrap = document.createElement('span');
      wordWrap.style.display = 'inline-block';
      wordWrap.style.overflow = 'hidden';
      wordWrap.style.verticalAlign = 'top';
      wordWrap.style.marginRight = '0.28em';

      const inner = document.createElement('span');
      inner.style.display = 'inline-block';
      inner.textContent = word;
      inner.className = 'reveal-word';
      wordWrap.appendChild(inner);
      el.appendChild(wordWrap);

      if (wi < text.split(' ').length - 1) {
        el.appendChild(document.createTextNode(''));
      }
    });

    const words = el.querySelectorAll('.reveal-word');
    gsap.set(words, { yPercent: 110, rotateX: -40, opacity: 0, transformOrigin: '50% 100%' });

    gsap.to(words, {
      yPercent: 0,
      rotateX: 0,
      opacity: 1,
      stagger: scrub ? 0.04 : 0.07,
      ease: scrub ? 'none' : 'power4.out',
      duration: scrub ? undefined : 1.1,
      scrollTrigger: {
        trigger: el,
        start: scrub ? 'top 90%' : 'top 85%',
        end: scrub ? 'top 40%' : undefined,
        scrub: scrub || false,
        once: !scrub,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [children, scrub]);

  return <Tag ref={ref} className={`font-display ${className}`} {...props} />;
}
