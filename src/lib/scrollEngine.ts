import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

let lenisInstance: Lenis | null = null;

export function initSmoothScroll(): () => void {
  const lenis = new Lenis({
    duration: 1.35,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.4,
  });

  lenisInstance = lenis;
  lenis.on('scroll', ScrollTrigger.update);

  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    lenis.destroy();
    lenisInstance = null;
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}

export function scrollToTarget(target: string | HTMLElement) {
  if (!lenisInstance) return;
  lenisInstance.scrollTo(target, { offset: -80, duration: 1.6 });
}

export function initScrollAnimations(root: HTMLElement): () => void {
  const ctx = gsap.context(() => {
    initHeroSequence(root);
    initRevealBlocks(root);
    initParallaxLayers(root);
    initHorizontalPanels(root);
    initMembershipReveal(root);
    initGalleryTape(root);
    initGiftPath(root);
    initMarquees(root);
    initFounderParallax(root);
  }, root);

  ScrollTrigger.refresh();
  return () => ctx.revert();
}

function initHeroSequence(root: HTMLElement) {
  const hero = root.querySelector('#hero-pin');
  if (!hero) return;

  const bg = hero.querySelector('.hero-bg');
  const overlay = hero.querySelector('.hero-overlay');
  const title = hero.querySelector('.hero-title');
  const subtitle = hero.querySelector('.hero-subtitle');
  const tagline = hero.querySelector('.hero-tagline');
  const cta = hero.querySelector('.hero-cta');
  const badge = hero.querySelector('.hero-badge');
  const scrollHint = hero.querySelector('.hero-scroll-hint');
  const outline = hero.querySelector('.hero-outline-text');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: '+=130%',
      pin: true,
      scrub: 0.85,
      anticipatePin: 1,
    },
  });

  if (bg) {
    tl.fromTo(bg, { scale: 1.12, y: 0 }, { scale: 1.45, y: '-18%', ease: 'none' }, 0);
  }
  if (overlay) {
    tl.fromTo(overlay, { opacity: 0.55 }, { opacity: 0.92, ease: 'none' }, 0);
  }
  if (outline) {
    tl.fromTo(outline, { y: 0, opacity: 0.35 }, { y: '-28%', opacity: 0.08, ease: 'none' }, 0);
  }
  if (title) {
    tl.fromTo(title, { y: 0, scale: 1 }, { y: '-22%', scale: 0.88, ease: 'none' }, 0);
  }
  if (subtitle) {
    tl.fromTo(subtitle, { y: 0, opacity: 1 }, { y: '-35%', opacity: 0, ease: 'none' }, 0.15);
  }
  if (tagline) {
    tl.fromTo(tagline, { y: 0, opacity: 1 }, { y: '-20%', opacity: 0, ease: 'none' }, 0.2);
  }
  if (cta) {
    tl.fromTo(cta, { y: 0, opacity: 1 }, { y: 40, opacity: 0, ease: 'none' }, 0.25);
  }
  if (badge) {
    tl.fromTo(badge, { x: 0, opacity: 1 }, { x: 80, opacity: 0, ease: 'none' }, 0.2);
  }
  if (scrollHint) {
    tl.fromTo(scrollHint, { opacity: 1, y: 0 }, { opacity: 0, y: 30, ease: 'none' }, 0.1);
  }
}

function initRevealBlocks(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    const direction = el.dataset.reveal || 'up';
    const delay = parseFloat(el.dataset.revealDelay || '0');
    const scrub = el.dataset.revealScrub === 'true';

    const from: gsap.TweenVars = { opacity: 0 };
    const to: gsap.TweenVars = { opacity: 1, ease: 'power3.out' };

    if (direction === 'up') from.y = 72;
    if (direction === 'down') from.y = -72;
    if (direction === 'left') from.x = 80;
    if (direction === 'right') from.x = -80;
    if (direction === 'scale') {
      from.scale = 0.88;
      from.y = 40;
    }
    if (direction === 'clip') {
      gsap.set(el, { clipPath: 'inset(100% 0% 0% 0%)' });
      gsap.to(el, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: scrub ? undefined : 1.2,
        ease: scrub ? 'none' : 'power4.inOut',
        delay,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          end: scrub ? 'top 40%' : undefined,
          scrub: scrub || false,
          once: !scrub,
        },
      });
      return;
    }

    to.y = 0;
    to.x = 0;
    to.scale = 1;

    gsap.fromTo(el, from, {
      ...to,
      duration: scrub ? undefined : 1.15,
      delay,
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        end: scrub ? 'top 35%' : undefined,
        scrub: scrub || false,
        once: !scrub,
      },
    });
  });

  root.querySelectorAll<HTMLElement>('[data-stagger]').forEach((container) => {
    const children = container.querySelectorAll('[data-stagger-item]');
    if (!children.length) return;

    gsap.fromTo(
      children,
      { opacity: 0, y: 48 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.14,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 82%',
          once: true,
        },
      }
    );
  });

  root.querySelectorAll<HTMLElement>('[data-split-chars]').forEach((el) => {
    const text = el.textContent?.trim() || '';
    el.textContent = '';
    el.style.overflow = 'hidden';
    el.style.display = 'inline-block';

    text.split('').forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.className = 'split-char';
      el.appendChild(span);
    });

    gsap.fromTo(
      el.querySelectorAll('.split-char'),
      { opacity: 0, yPercent: 120, rotateX: -70 },
      {
        opacity: 1,
        yPercent: 0,
        rotateX: 0,
        stagger: 0.028,
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      }
    );
  });
}

function initParallaxLayers(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallax || '0.2');
    gsap.to(el, {
      y: () => window.innerHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement || el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}

function initHorizontalPanels(root: HTMLElement) {
  const track = root.querySelector<HTMLElement>('#editions-track');
  const wrap = root.querySelector<HTMLElement>('#editions-horizontal');
  if (!track || !wrap) return;

  const scrollTween = gsap.to(track, {
    x: () => -(track.scrollWidth - window.innerWidth),
    ease: 'none',
    scrollTrigger: {
      trigger: wrap,
      start: 'top top',
      end: () => `+=${track.scrollWidth}`,
      pin: true,
      scrub: 0.55,
      invalidateOnRefresh: true,
    },
  });

  track.querySelectorAll('.edition-panel').forEach((panel) => {
    const inner = panel.querySelector('.edition-panel-inner');
    if (!inner) return;
    gsap.fromTo(
      inner,
      { scale: 0.92, filter: 'brightness(0.65)' },
      {
        scale: 1,
        filter: 'brightness(1)',
        ease: 'none',
        scrollTrigger: {
          trigger: panel,
          containerAnimation: scrollTween,
          start: 'left 85%',
          end: 'left 35%',
          scrub: true,
        },
      }
    );
  });
}

function initMembershipReveal(root: HTMLElement) {
  const section = root.querySelector('#membership');
  if (!section) return;

  const cards = section.querySelectorAll('.tier-card');
  cards.forEach((card, i) => {
    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 100,
        rotateY: i === 0 ? 8 : -8,
        transformPerspective: 1200,
      },
      {
        opacity: 1,
        y: 0,
        rotateY: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 92%',
          once: true,
        },
      }
    );
  });

  const counter = section.querySelector('.member-counter');
  if (counter) {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: 40,
      duration: 2.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: counter,
        start: 'top 85%',
        once: true,
      },
      onUpdate: () => {
        counter.textContent = Math.round(obj.val).toString();
      },
    });
  }
}

function initGalleryTape(root: HTMLElement) {
  const tape = root.querySelector<HTMLElement>('#gallery-tape');
  const section = root.querySelector('#gallery');
  if (!tape || !section) return;

  gsap.to(tape, {
    x: () => -(tape.scrollWidth - window.innerWidth + 120),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.2,
    },
  });

  section.querySelectorAll('.gallery-card').forEach((card) => {
    gsap.fromTo(
      card,
      { y: 60, rotate: 2 },
      {
        y: 0,
        rotate: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'center center',
          scrub: 0.8,
        },
      }
    );
  });
}

function initGiftPath(root: HTMLElement) {
  const section = root.querySelector('#gift-path');
  if (!section) return;

  const giftBox = section.querySelector('.gift-box-path') as HTMLElement | null;
  const markers = gsap.utils.toArray<HTMLElement>('.gift-path-marker', section);
  if (!giftBox || !markers.length) return;

  const startRect = giftBox.getBoundingClientRect();
  const points = markers.map((marker) => {
    const rect = marker.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2 - (startRect.left + startRect.width / 2),
      y: rect.top + rect.height / 2 - (startRect.top + startRect.height / 2),
    };
  });

  gsap.to(giftBox, {
    motionPath: { path: points, curviness: 1.4 },
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top 15%',
      end: 'bottom 75%',
      scrub: 1,
    },
  });
}

function initMarquees(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('.marquee-track').forEach((track) => {
    const direction = track.dataset.direction === 'reverse' ? -1 : 1;
    gsap.to(track, {
      xPercent: direction * -50,
      ease: 'none',
      duration: 28,
      repeat: -1,
    });
  });
}

function initFounderParallax(root: HTMLElement) {
  const section = root.querySelector('#community');
  if (!section) return;

  const portrait = section.querySelector('.founder-portrait');
  const letter = section.querySelector('.founder-letter');

  if (portrait) {
    gsap.fromTo(
      portrait,
      { y: 80, scale: 1.08 },
      {
        y: -40,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      }
    );
  }

  if (letter) {
    gsap.fromTo(
      letter,
      { opacity: 0.4, x: 40 },
      {
        opacity: 1,
        x: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'center center',
          scrub: 0.6,
        },
      }
    );
  }
}
