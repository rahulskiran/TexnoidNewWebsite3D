import { ArrowRight } from 'lucide-react';
import './Works.css';

interface WorksProps {
  onAllWorks: () => void;
}

// Placeholder projects: swap in Texnoid's real case studies and screenshots
const WORKS = [
  { name: 'NovaPay', type: 'Fintech Platform', image: '/assets/girl_bicycle.jpg' },
  { name: 'Helixa Health', type: 'Website Design', image: '/assets/editorial_girl.jpg' },
  { name: 'Northwind', type: 'E-commerce Store', image: '/assets/silhouette_portrait.jpg' },
  { name: 'Wildfern', type: '3D Web Experience', image: '/assets/dog_grass.jpg' },
];

export const Works = ({ onAllWorks }: WorksProps) => (
  <section className="wrk-section" id="works">
    <div className="wrk-container">
      <span className="wrk-eyebrow" data-reveal>
        <span className="wrk-dot" /> Works
      </span>

      <div className="wrk-head" data-reveal>
        <h2 className="wrk-title">Works</h2>
        <p className="wrk-sub">
          Each project is tailored to business goals and long-term scalability.
        </p>
        <button className="wrk-all" onClick={onAllWorks}>
          <ArrowRight size={16} /> All Works
        </button>
      </div>

      <div className="wrk-grid">
        {WORKS.map((w) => (
          <article className="wrk-card" key={w.name} data-reveal>
            <div className="wrk-img-wrap">
              <img src={w.image} alt={`${w.name}, ${w.type}`} loading="lazy" />
            </div>
            <div className="wrk-meta">
              <h3>{w.name}</h3>
              <span>{w.type}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
