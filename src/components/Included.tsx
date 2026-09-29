import { useEffect, useRef } from 'react';
import type { PointerEvent, ReactNode } from 'react';
import { Copy, Loader, Mail, MousePointerClick, Star } from 'lucide-react';
import './Included.css';

/* Card whose 3D stage tilts toward the pointer (mouse) or with the scroll position (touch) */
const TiltCard = ({ title, children }: { title: string; children: ReactNode }) => {
  const cardRef = useRef<HTMLElement>(null);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (!el || e.pointerType === 'touch') return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--ry', `${x * 22}deg`);
    el.style.setProperty('--rx', `${-y * 16}deg`);
    el.style.setProperty('--gx', `${(x + 0.5) * 100}%`);
    el.style.setProperty('--gy', `${(y + 0.5) * 100}%`);
  };

  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--rx', '0deg');
  };

  // Touch devices have no hover, so the tilt and the layer "explode" follow the scroll instead:
  // the card sways as it travels through the screen and its layers separate near the middle.
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const touchOnly = window.matchMedia('(hover: none)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!touchOnly || reduce) return;

    el.classList.add('inc-scroll');
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // -1 when the card centre is at the bottom edge, 0 at screen centre, 1 at the top edge
      const p = Math.max(-1.2, Math.min(1.2, (vh / 2 - (r.top + r.height / 2)) / (vh / 2)));
      el.style.setProperty('--rx', `${p * 22}deg`);
      el.style.setProperty('--ry', `${Math.sin(p * Math.PI) * -18}deg`);
      el.style.setProperty('--gx', `${50 + p * 30}%`);
      el.style.setProperty('--gy', `${50 - p * 30}%`);
      el.classList.toggle('is-active', Math.abs(p) < 0.55);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <article
      className="inc-card"
      ref={cardRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      data-reveal
    >
      <span className="inc-glow" aria-hidden="true" />
      <h3 className="inc-card-title">{title}</h3>
      <div className="inc-stage" aria-hidden="true">
        {children}
      </div>
    </article>
  );
};

export const Included = () => (
  <section className="inc-section" id="included" data-anim>
    <div className="inc-container">
      <h2 className="inc-title" data-reveal>Included in every Texnoid website</h2>
      <p className="inc-sub" data-reveal>
        Every project comes with everything you need to get your website off the ground.
      </p>

      <div className="inc-grid">
        {/* Card 1: fanned stack of pages */}
        <TiltCard title="Custom pages">
          <div className="inc-pages">
            <div className="inc-pg inc-pg-3" />
            <div className="inc-pg inc-pg-2" />
            <div className="inc-pg inc-pg-1">
              <span className="inc-pg-bar" />
              <span className="inc-pg-block" />
              <span className="inc-pg-line" />
              <span className="inc-pg-line short" />
            </div>
          </div>
        </TiltCard>

        {/* Card 2: exploded view of a section */}
        <TiltCard title="Reusable sections">
          <div className="inc-layers">
            <div className="inc-layer inc-layer-back" />
            <div className="inc-layer inc-layer-mid" />
            <div className="inc-layer inc-layer-front">
              <span className="inc-thumb" />
              <span className="inc-line long" />
              <span className="inc-line" />
            </div>
          </div>
        </TiltCard>

        {/* Card 3: floating interface pieces */}
        <TiltCard title="Styles & symbols">
          <div className="inc-floats">
            <div className="inc-chip inc-chip-brand">Texnoid™</div>
            <div className="inc-chip inc-chip-stars">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>
            <div className="inc-chip inc-chip-btn">BUTTON TEXT</div>
            <div className="inc-icon-row">
              <span className="inc-tile"><MousePointerClick size={20} /></span>
              <span className="inc-tile"><Mail size={20} /></span>
              <span className="inc-tile"><Loader size={20} /></span>
              <span className="inc-tile"><Copy size={20} /></span>
            </div>
          </div>
        </TiltCard>
      </div>
    </div>
  </section>
);
