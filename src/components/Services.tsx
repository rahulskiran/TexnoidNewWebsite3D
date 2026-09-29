import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import './Services.css';

interface ServicesProps {
  onExplore: () => void;
}

// All four use AI-generated images matched to their service.
const SERVICES = [
  {
    title: 'Web Design',
    image: '/assets/services/web-design.jpg',
    text: 'Clean, conversion-focused interfaces and design systems, planned around your brand and your customers.',
  },
  {
    title: 'Web Development',
    image: '/assets/services/web-development.jpg',
    text: 'Fast, accessible, responsive websites and web apps built with React, TypeScript and modern tooling.',
  },
  {
    title: 'E-commerce',
    image: '/assets/services/ecommerce.jpg',
    text: 'Shopify and custom storefronts that load quickly, look sharp and make buying effortless.',
  },
  {
    title: '3D & Motion',
    image: '/assets/services/3d-motion.jpg',
    text: 'Interactive 3D scenes and thoughtful animation that make your site memorable without slowing it down.',
  },
];

export const Services = ({ onExplore }: ServicesProps) => {
  const trackRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  // Scroll progress through the tall track decides which service is active
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = track.getBoundingClientRect();
      const scrollable = track.offsetHeight - window.innerHeight;
      const p = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
      setActive(Math.min(SERVICES.length - 1, Math.floor(p * SERVICES.length)));
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

  // Clicking a row scrolls to that service's slice of the track
  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const scrollable = track.offsetHeight - window.innerHeight;
    const top = track.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: top + (scrollable * (i + 0.5)) / SERVICES.length,
      behavior: 'smooth',
    });
  };

  return (
    <section className="svc-track" id="services" ref={trackRef}>
      <div className="svc-section" data-anim>
        <div className="svc-container">
          <div className="svc-top">
            <span className="svc-eyebrow">OUR<br />SERVICES</span>
            <p className="svc-intro">
              We create custom digital experiences that connect with audiences, drive engagement,
              and deliver real results. From modern websites and e-commerce platforms to
              interactive 3D, we take care of your presence across every digital touchpoint.
            </p>
          </div>

          <div className="svc-body">
            <div className="svc-left">
              <div className="svc-image-wrap">
                {SERVICES.map((s, i) => (
                  <img
                    key={s.title}
                    className={`svc-image${i === active ? ' active' : ''}`}
                    src={s.image}
                    alt={i === active ? s.title : ''}
                    loading="lazy"
                  />
                ))}
              </div>
              <button className="svc-link" onClick={onExplore}>
                <span>Explore our work</span>
                <ArrowUpRight size={20} />
              </button>
            </div>

            <ul className="svc-list">
              {SERVICES.map((s, i) => {
                const isOpen = active === i;
                return (
                  <li className={`svc-item${isOpen ? ' open' : ''}`} key={s.title}>
                    <button className="svc-row" onClick={() => goTo(i)} aria-expanded={isOpen}>
                      <span className="svc-num">{String(i + 1).padStart(2, '0')}.</span>
                      <span className="svc-name">{s.title}</span>
                      <span className="svc-toggle" aria-hidden="true">
                        <Plus size={20} />
                      </span>
                    </button>
                    <div className="svc-panel">
                      <p>{s.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
