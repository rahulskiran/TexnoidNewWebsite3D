import './Works.css';

const WORKS = [
  { name: 'Garage91', type: 'Shopify Store, Custom API Build', image: '/assets/works/garage91.jpg' },
  { name: 'Trove', type: 'Fashion E-commerce Store', image: '/assets/works/trove.jpg' },
  { name: 'Golden Key Properties', type: 'Real Estate Website', image: '/assets/works/goldenkey.jpg' },
  { name: 'BathUrChoice', type: 'Service Business Website', image: '/assets/works/bathurchoice.jpg' },
];

export const Works = () => (
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
