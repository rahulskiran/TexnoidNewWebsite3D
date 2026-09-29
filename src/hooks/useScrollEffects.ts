import { useEffect } from 'react';

/**
 * One lightweight scroll system for the whole page:
 * 1. Reveals every [data-reveal] element once as it scrolls into view.
 * 2. Toggles .in-view on every [data-anim] section so its background animation
 *    only runs while the section is on screen.
 * 3. Writes --scroll-progress (0-1) and --hero-p (0-1) CSS variables from a single
 *    passive scroll listener, batched with requestAnimationFrame.
 * Elements the user scrolls past too fast for the observer to see are revealed by a
 * sweep on the scroll listener, so nothing is ever left invisible.
 * Everything is skipped for people who prefer reduced motion.
 */
export const useScrollEffects = () => {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1 + 2: intersection observers
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    const animObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('in-view', entry.isIntersecting);
        });
      },
      { rootMargin: '200px 0px' },
    );

    if (!reduce) {
      root.classList.add('js-reveal');
      document.querySelectorAll('[data-reveal]').forEach((el) => revealObserver.observe(el));
    }
    document.querySelectorAll('[data-anim]').forEach((el) => animObserver.observe(el));

    // Sweep: reveal anything already above the bottom of the viewport (missed by the observer)
    const sweep = () => {
      document.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
          el.classList.add('is-revealed');
          revealObserver.unobserve(el);
        }
      });
    };

    // 3: scroll-linked variables
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!reduce) sweep();
      const y = window.scrollY;
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty('--scroll-progress', String(max > 0 ? Math.min(1, y / max) : 0));
      if (!reduce) {
        root.style.setProperty('--hero-p', String(Math.min(1, y / (window.innerHeight * 0.9))));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      revealObserver.disconnect();
      animObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
      root.classList.remove('js-reveal');
    };
  }, []);
};
