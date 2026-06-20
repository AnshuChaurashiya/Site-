import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

interface SplitTextHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: string;
  className?: string;
  delay?: number;
  triggerOnce?: boolean;
}

export default function SplitTextHeading({
  children,
  delay = 0,
  triggerOnce = true,
  className = '',
  ...props
}: SplitTextHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const el = headingRef.current;
    if (!el || (animatedRef.current && triggerOnce)) return;

    const context = gsap.context(() => {
      el.style.overflow = 'hidden';
      el.style.perspective = '1000px';
      el.style.willChange = 'transform';
      el.innerHTML = children;

      const split = SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'split-line',
        autoSplit: true,
      });

      gsap.set(split.lines, {
        opacity: 0,
        yPercent: 110,
        transformPerspective: 1000,
        transformOrigin: '50% 100%',
      });

      gsap.to(split.lines, {
        opacity: 1,
        yPercent: 0,
        duration: 1.15,
        ease: 'power3.out',
        stagger: 0.08,
        delay,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: triggerOnce,
          toggleActions: 'play none none none',
        },
        onComplete: () => {
          if (triggerOnce) {
            animatedRef.current = true;
          }
        },
      });
    });

    return () => {
      context.revert();
    };
  }, [children, delay, triggerOnce]);

  return (
    <h3
      ref={headingRef}
      className={`select-none leading-none ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}
