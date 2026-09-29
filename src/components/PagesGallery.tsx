import { useEffect, useRef } from 'react';
import './PagesGallery.css';

// How far the columns drift apart as you scroll. Scales with the screen so it stays in step
// with the crop margins in PagesGallery.css (which are in vw) — those must stay bigger than
// this, or a drifting column would expose a gap at the section edge.
const travelFor = (width: number) => Math.min(120, width * 0.06);

// PLACEHOLDER project screenshots: swap these for real Texnoid client work before launch.
// Each entry's ratio is the actual image's width/height, so the panel is sized to the
// picture instead of leaving empty space around it.
const SHOTS = [
  { src: '/assets/gallery/project-realestate.jpg', ratio: 2890 / 1566 },
  { src: '/assets/gallery/project-automotive.jpg', ratio: 1905 / 935 },
  { src: '/assets/gallery/project-fashion.jpg', ratio: 1899 / 948 },
  { src: '/assets/gallery/project-nonprofit.jpg', ratio: 1318 / 793 },
  { src: '/assets/gallery/project-bathroom.jpg', ratio: 1559 / 829 },
  { src: '/assets/gallery/project-lawn.jpg', ratio: 1339 / 932 },
  { src: '/assets/gallery/project-coffee.jpg', ratio: 1876 / 920 },
  { src: '/assets/gallery/project-petcare.jpg', ratio: 1579 / 828 },
  { src: '/assets/gallery/project-niha.jpg', ratio: 2902 / 1542 },
];

// Plain panel: sized to its picture's own aspect ratio, so the panel never runs taller
// than the image (no cropping, no empty letterbox strip).
const Panel = ({ className = '', shot }: { className?: string; shot: (typeof SHOTS)[number] }) => (
  <article className={`pg-card ${className}`} style={{ aspectRatio: shot.ratio }}>
    <img className="pg-shot" src={shot.src} alt="" loading="lazy" />
  </article>
);

export const PagesGallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Vertical scroll parallax only (a translate, never a scale) — this never resamples the
  // images, so it can't soften them the way stretching the whole grid with CSS transform:
  // scale() used to.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const p = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const t = (Math.min(1, Math.max(0, p)) - 0.5) * 2 * travelFor(window.innerWidth);
      colRefs.current.forEach((col, i) => {
        if (col) col.style.transform = `translate3d(0, ${i === 1 ? t : -t}px, 0)`;
      });
    };
    const onFrame = () => { if (!raf) raf = requestAnimationFrame(update); };

    update();
    window.addEventListener('scroll', onFrame, { passive: true });
    window.addEventListener('resize', onFrame);
    return () => {
      window.removeEventListener('scroll', onFrame);
      window.removeEventListener('resize', onFrame);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
  <section className="pg-section" data-anim ref={sectionRef}>
    <div className="pg-grid">
      {/* Column 1 */}
      <div className="pg-col" ref={(el) => { colRefs.current[0] = el; }}>
        <Panel className="pg-card-a" shot={SHOTS[0]} />
        <Panel className="pg-card-d" shot={SHOTS[1]} />
        <Panel className="pg-card-x" shot={SHOTS[2]} />
        <Panel className="pg-card-x" shot={SHOTS[3]} />
      </div>

      {/* Column 2 */}
      <div className="pg-col pg-col-mid" ref={(el) => { colRefs.current[1] = el; }}>
        <Panel className="pg-card-x" shot={SHOTS[2]} />
        <Panel className="pg-card-b" shot={SHOTS[3]} />
        <Panel className="pg-card-e" shot={SHOTS[7]} />
        <Panel className="pg-card-x" shot={SHOTS[4]} />
      </div>

      {/* Column 3 */}
      <div className="pg-col" ref={(el) => { colRefs.current[2] = el; }}>
        <Panel className="pg-card-c" shot={SHOTS[8]} />
        <Panel className="pg-card-f" shot={SHOTS[5]} />
        <Panel className="pg-card-g" shot={SHOTS[6]} />
        <Panel className="pg-card-x" shot={SHOTS[7]} />
      </div>
    </div>
  </section>
  );
};
