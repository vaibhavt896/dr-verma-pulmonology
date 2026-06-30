import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Motion tokens - the entire site speaks one easing language.
 * Entrances: rise + fade only. No bounce, no elastic, no blur filters.
 */
export const MOTION = {
  ease: 'power3.out',
  easeSlow: 'expo.out',
  dur: { fast: 0.3, base: 0.6, slow: 1 },
  rise: 24,
  stagger: 0.08,
} as const;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Scroll to a section by id using native browser scroll. */
export function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

/**
 * Standard scroll entrance: fade + 24px rise.
 * Use for every section; one motion idea, executed consistently.
 */
export function revealOnScroll(
  targets: gsap.DOMTarget,
  trigger: Element | null,
  opts: { stagger?: number; start?: string; delay?: number } = {}
) {
  if (prefersReducedMotion()) return;
  gsap.fromTo(
    targets,
    { opacity: 0, y: MOTION.rise },
    {
      opacity: 1,
      y: 0,
      duration: MOTION.dur.base,
      ease: MOTION.ease,
      stagger: opts.stagger ?? 0,
      delay: opts.delay ?? 0,
      scrollTrigger: trigger
        ? { trigger, start: opts.start ?? 'top 75%' }
        : undefined,
    }
  );
}
