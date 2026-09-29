import { useRef, useState } from 'react';
import { ThreePillsCanvas } from './ThreePillsCanvas';
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface ProjectShowcaseProps {
  onOpenBookCall: () => void;
  onExplorePages: () => void;
  onSelectProject: (project: any) => void;
}

export const ProjectShowcase = ({
  onOpenBookCall,
  onExplorePages,
  onSelectProject,
}: ProjectShowcaseProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [umbrellaTilted, setUmbrellaTilted] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="showcase-section" id="projects-showcase">
      {/* Controls header */}
      <div className="showcase-controls-bar">
        <div className="showcase-tag">
          <span className="dot-pulse" />
          <span>CURATED ARCHIVE (03/08)</span>
        </div>
        <div className="carousel-nav-btns">
          <button 
            className="carousel-arrow-btn" 
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            className="carousel-arrow-btn" 
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Horizontal Cards Rail */}
      <div className="showcase-cards-rail" ref={scrollRef}>
        
        {/* ================= CARD 1: CRAFTING CHAOS WITH A SMILE! ================= */}
        <div 
          className="showcase-card card-chaos"
          onClick={() => onSelectProject({
            title: 'Crafting Chaos With A Smile',
            category: 'Brand Identity & Visual Narrative',
            client: 'Texnoid Studio',
            year: '2026',
            image: '/assets/editorial_girl.jpg',
            description: 'A provocative identity system blending brutalist typography, playful 3D iconography, and editorial nature photography to redefine modern agency culture.'
          })}
        >
          {/* Card Header Typography */}
          <div className="card-top-content">
            <h2 className="chaos-headline font-display">
              CRAFTING<br />
              CHAOS WITH<br />
              A SMILE!
            </h2>
          </div>

          {/* Interactive Floating 3D Rainbow Umbrella */}
          <div 
            className={`umbrella-floating-wrap ${umbrellaTilted ? 'tilted' : ''}`}
            onMouseEnter={() => setUmbrellaTilted(true)}
            onMouseLeave={() => setUmbrellaTilted(false)}
          >
            <img 
              src="/assets/rainbow_umbrella.jpg" 
              alt="3D Rainbow Umbrella" 
              className="umbrella-img"
            />
            <div className="umbrella-shadow" />
            <span className="umbrella-interactive-tooltip">Playful 3D Element</span>
          </div>

          {/* Editorial Photo Frame */}
          <div className="editorial-photo-frame">
            <img 
              src="/assets/editorial_girl.jpg" 
              alt="Editorial portrait under lush green trees" 
              className="editorial-img"
            />
            <div className="photo-overlay-tag">
              <span className="overlay-pill">CAMP. 26</span>
              <button className="preview-icon-btn" aria-label="View project details">
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ================= CARD 2: MOTION ECOMMERCE & DESIGN DEVELOPMENT ================= */}
        <div 
          className="showcase-card card-services-lavender"
          onClick={() => onSelectProject({
            title: 'Motion Ecommerce & 3D Systems',
            category: 'Creative Tech & Experience Design',
            client: 'HyperFuture Labs',
            year: '2026',
            description: 'Interactive WebGL architecture and bespoke 3D physics-driven web experiences that increase user engagement by over 300%.'
          })}
        >
          {/* Upper Section: Motion Ecommerce */}
          <div className="services-upper-pane">
            <div className="pane-header-row">
              <span className="pane-badge">INTERACTIVE ARCHITECTURE</span>
              <span className="pane-num">02 // 05</span>
            </div>
            <h3 className="motion-headline font-display">
              MOTION<br />
              ECOMMERCE
            </h3>
            <div className="motion-grid-accent" />
          </div>

          {/* Lower Section: Design & Development with 3D Pills Canvas */}
          <div className="services-lower-pane">
            <div className="lower-pane-header">
              <span className="services-label">OUR SERVICES</span>
              <span className="three-d-badge">
                <Sparkles size={11} /> LIVE 3D WEBGL
              </span>
            </div>

            <h2 className="design-dev-headline font-display">
              DESIGN &amp;<br />
              DEVELOPMENT
            </h2>

            {/* Interactive 3D Canvas with candy capsules */}
            <div className="three-pills-embed-wrap">
              <ThreePillsCanvas className="canvas-pills" />
              <div className="pills-hint-badge">
                <span>✦ Move &amp; drag 3D capsules</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= CARD 3: AGENCY DIRECTORY & GET IN TOUCH ================= */}
        <div className="showcase-card card-footer-preview">
          {/* Top Row: 3 rounded artistic image previews */}
          <div className="footer-preview-media-row">
            <div className="media-chip chip-chair">
              <img 
                src="/assets/chair_fashion.jpg" 
                alt="Architectural chair detail" 
                className="chip-img"
              />
              <span className="chip-label">STUDIO</span>
            </div>
            
            <div className="media-chip chip-goat">
              <img 
                src="/assets/goat_greenery.jpg" 
                alt="Goat in emerald greenery" 
                className="chip-img"
              />
              <span className="chip-label">ORIGIN</span>
            </div>

            <div className="media-chip chip-silhouette">
              <img 
                src="/assets/silhouette_portrait.jpg" 
                alt="Silhouette profile" 
                className="chip-img"
              />
              <span className="chip-label">PEOPLE</span>
            </div>
          </div>

          {/* Middle: Editorial Directory Grid */}
          <div className="footer-preview-directory">
            {/* Nav Links */}
            <div className="dir-column">
              <ul className="dir-links-list">
                <li><a href="#hero">Home</a></li>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); onExplorePages(); }}>About</a></li>
                <li><a href="#careers" onClick={(e) => { e.preventDefault(); onOpenBookCall(); }}>Careers</a></li>
                <li><a href="#faq" onClick={(e) => { e.preventDefault(); onExplorePages(); }}>FAQ</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); onOpenBookCall(); }}>Contact</a></li>
              </ul>
            </div>

            {/* Follow Us */}
            <div className="dir-column">
              <span className="dir-heading">FOLLOW US</span>
              <ul className="dir-text-list">
                <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter (X)</a></li>
                <li><a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
              </ul>
            </div>

            {/* Office & Email */}
            <div className="dir-column">
              <span className="dir-heading">OFFICE</span>
              <p className="dir-address">
                Laugh Lane 42,<br />
                1017 DK Amsterdam,<br />
                The Netherlands
              </p>
              
              <span className="dir-heading email-heading">EMAIL</span>
              <a href="mailto:heyhello@thesmiling.agency" className="dir-email-link">
                heyhello@thesmiling.agency
              </a>
            </div>

            {/* Boring Links */}
            <div className="dir-column">
              <span className="dir-heading">BORING LINKS</span>
              <ul className="dir-text-list">
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#cookies">Cookie Settings</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Headline: TOUCH GET IN TOUCH */}
          <div className="footer-preview-bottom-bar" onClick={onOpenBookCall}>
            <h2 className="touch-headline font-display">
              TOUCH GET IN TOUCH
            </h2>
            <div className="touch-action-arrow">
              <ArrowUpRight size={26} />
            </div>
          </div>
        </div>

        {/* ================= CARD 4: EXTENDED 3D DIGITAL CRAFT ================= */}
        <div 
          className="showcase-card card-extended-3d"
          onClick={() => onSelectProject({
            title: 'Synthetic Realities & Brand Holograms',
            category: 'Spatial Design & WebGL',
            client: 'AURA London',
            year: '2026',
            description: 'Real-time shader explorations, generative canvas installations, and next-generation WebGL digital flagship experiences.'
          })}
        >
          <div className="card-extended-header">
            <span className="pane-badge">EXPERIMENT 04</span>
            <span className="sparkle-tag"><Sparkles size={12} /> SPATIAL LAB</span>
          </div>

          <h3 className="extended-headline font-display">
            IMMERSIVE<br />
            SPATIAL<br />
            WORLDS
          </h3>

          <div className="extended-graphic-wrap">
            <div className="orb-3d-visual">
              <div className="orb-ring ring-1" />
              <div className="orb-ring ring-2" />
              <div className="orb-ring ring-3" />
              <div className="orb-core" />
            </div>
          </div>

          <div className="extended-bottom-meta">
            <span>WEBGL / SHADERS / GLSL</span>
            <span className="explore-tag">EXPLORE CASE →</span>
          </div>
        </div>

      </div>
    </section>
  );
};
