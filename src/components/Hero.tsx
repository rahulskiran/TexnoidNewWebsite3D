import { useEffect, useRef } from 'react';
import { ArrowRight, Layers, Star } from 'lucide-react';

interface HeroProps {
  onExplorePages: () => void;
  onBuyTemplate: () => void;
}

/* Animated dotted-wave field drawn on a 2D canvas */
const useDotWave = (canvasRef: React.RefObject<HTMLCanvasElement | null>, playing: boolean) => {
  const playingRef = useRef(playing);
  playingRef.current = playing;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let t = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const mobile = w < 700;
      const gap = mobile ? 28 : 20;
      const fade = mobile ? 0.45 : 1; // keep the dots subtle on small screens
      const cols = Math.ceil(w / gap) + 1;
      const rows = Math.ceil(h / gap) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x0 = c * gap;
          const y0 = r * gap;
          const nx = x0 / w;
          const ny = y0 / h;
          const wave =
            Math.sin(nx * 5 + t * 0.8 + ny * 2) * 22 +
            Math.sin(ny * 6 - t * 0.6 + nx * 3) * 16;
          const y = y0 + wave;
          // brighter ridge band running diagonally across the field
          const ridge = Math.exp(-Math.pow((ny - (0.28 + nx * 0.25) + Math.sin(nx * 4 + t * 0.5) * 0.08) * 5, 2));
          const alpha = (0.3 + ridge * 0.7) * fade;
          const size = mobile ? 0.8 + ridge * 0.9 : 1 + ridge * 1.5;
          // soft coral at the edges -> deep crimson along the ridge
          ctx.fillStyle = `rgba(${240 - ridge * 15}, ${110 - ridge * 85}, ${100 - ridge * 65}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x0, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    // Smooth but cheap: cap at ~30fps and stop drawing while the hero is off screen
    let visible = true;
    let last = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || now - last < 33) return;
      last = now;
      if (playingRef.current) t += 0.02;
      draw();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    resize();
    window.addEventListener('resize', resize);
    if (reduce) draw();
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, [canvasRef]);
};

export const Hero = ({ onExplorePages, onBuyTemplate }: HeroProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useDotWave(canvasRef, true);

  return (
    <section className="hero-section" id="hero" data-anim>
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />

      <div className="hero-container">
        <div className="hero-badge">
          <span className="hero-badge-rating">
            <Star size={13} fill="currentColor" /> 4.5 Review
          </span>
          <span className="hero-badge-text">Modern Web Agency</span>
        </div>

        <h1 className="hero-title" data-text="Texnoid">
          Your partner in <span className="accent">web design &amp;</span> development.
        </h1>

        <p className="hero-subtitle">
          <strong>Texnoid builds fast, beautiful websites and web apps</strong> that help modern
          brands grow with <span className="dim">clarity, 3D motion, and direction, from first idea to launch.</span>
        </p>

        <div className="hero-buttons">
          <button
            className="hero-btn hero-btn-green"
            onClick={onExplorePages}
            id="explore-pages-btn"
          >
            <span>VIEW OUR WORK</span>
            <Layers size={15} className="btn-icon" />
          </button>

          <button
            className="hero-btn hero-btn-ghost"
            onClick={onBuyTemplate}
            id="buy-template-hero-btn"
          >
            <span>START A PROJECT</span>
            <ArrowRight size={15} className="btn-icon" />
          </button>
        </div>
      </div>

    </section>
  );
};
