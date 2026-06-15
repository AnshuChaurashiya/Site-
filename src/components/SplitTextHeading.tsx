import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

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
    const el = headingRef.current;
    if (!el) return;
    if (animatedRef.current && triggerOnce) return;

    // Split text into characters in a clean, accessible manner
    const originalText = children;
    el.innerHTML = '';
    
    // Set viewport perspective for rich 3D rotating angles
    el.style.perspective = '1000px';

    const words = originalText.split(' ');
    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.whiteSpace = 'nowrap';
      wordSpan.style.marginRight = '0.3em'; // Clean natural space
      wordSpan.style.verticalAlign = 'bottom';
      
      Array.from(word).forEach((char) => {
        const charSpan = document.createElement('span');
        charSpan.textContent = char;
        charSpan.style.display = 'inline-block';
        charSpan.style.transformOrigin = '50% 100%';
        charSpan.className = 'gsap-char-reveal';
        charSpan.style.opacity = '0';
        wordSpan.appendChild(charSpan);
      });

      el.appendChild(wordSpan);
    });

    const chars = el.querySelectorAll('.gsap-char-reveal');

    const triggerAnimation = () => {
      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: 42,
          rotateX: -75,
          scaleY: 0.6,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scaleY: 1,
          stagger: 0.03,
          ease: 'power4.out',
          duration: 1.35,
          delay: delay,
          overwrite: 'auto',
          onComplete: () => {
            if (triggerOnce) {
              animatedRef.current = true;
            }
          },
        }
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            triggerAnimation();
            if (triggerOnce) {
              observer.unobserve(el);
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
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
