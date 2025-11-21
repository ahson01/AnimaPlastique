// src/lib/actions/revealOnScroll.ts
export function revealOnScroll(
  node: HTMLElement,
  options?: { threshold?: number; rootMargin?: string; once?: boolean }
) {
  if (typeof window === 'undefined') return;

  const { threshold = 0.2, rootMargin = '0px 0px -10% 0px', once = true } = options ?? {};

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('animate-pop-up');
        if (once) observer.unobserve(node);
      }
    },
    { threshold, rootMargin }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    }
  };
}
