import { useState } from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';

interface ExplorePagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPage: (pageId: string) => void;
}

export const ExplorePagesModal = ({
  isOpen,
  onClose,
  onSelectPage,
}: ExplorePagesModalProps) => {
  const [filter, setFilter] = useState<'all' | 'agency' | 'case-study' | 'commerce'>('all');

  if (!isOpen) return null;

  const pages = [
    {
      id: 'home',
      name: 'Homepage — Editorial Hero & 3D Cards',
      category: 'agency',
      tag: 'HERO ACTIVE',
      thumb: '/assets/editorial_girl.jpg',
      desc: 'The master landing page with condensed display typography, 3D pills canvas, and editorial horizontal cards.'
    },
    {
      id: 'cases',
      name: 'Projects Archive & Filterable Grid',
      category: 'case-study',
      tag: 'PORTFOLIO',
      thumb: '/assets/chair_fashion.jpg',
      desc: 'Masonry visual showcase featuring hover video reels, category filters, and award badges.'
    },
    {
      id: 'single-case',
      name: 'Case Study Deep-Dive — Crafting Chaos',
      category: 'case-study',
      tag: 'CASE STUDY',
      thumb: '/assets/rainbow_umbrella.jpg',
      desc: 'Editorial storytelling layout with full-bleed typography, deliverables breakdown, and metrics.'
    },
    {
      id: 'services',
      name: 'Our Services & WebGL 3D Lab',
      category: 'agency',
      tag: 'SERVICES',
      thumb: '/assets/goat_greenery.jpg',
      desc: 'Interactive 3D geometry demonstrations, services accordion, and engagement pricing.'
    },
    {
      id: 'studio',
      name: 'Studio Amsterdam — About & Team',
      category: 'agency',
      tag: 'ABOUT',
      thumb: '/assets/silhouette_portrait.jpg',
      desc: 'Meet the creative directors, philosophy, office gallery, and career openings.'
    },
    {
      id: 'shop',
      name: 'Template Store & Instant Checkout',
      category: 'commerce',
      tag: 'ECOMMERCE',
      thumb: '/assets/editorial_girl.jpg',
      desc: 'Complete digital commerce drawer and storefront with license options and instant downloads.'
    }
  ];

  const filteredPages = filter === 'all' ? pages : pages.filter(p => p.category === filter);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="pages-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-top">
            <span className="modal-badge">
              <Sparkles size={12} /> TEMPLATE SYSTEM
            </span>
            <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </button>
          </div>
          <h3 className="modal-title font-display">EXPLORE TEMPLATE PAGES</h3>
          <p className="modal-sub">
            Texnoid™ builds thoughtfully crafted pages built with React 19, TypeScript, and interactive 3D WebGL scenes.
          </p>

          {/* Filter Pills */}
          <div className="pages-filter-strip">
            <button 
              className={`filter-pill ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Pages (18)
            </button>
            <button 
              className={`filter-pill ${filter === 'agency' ? 'active' : ''}`}
              onClick={() => setFilter('agency')}
            >
              Agency &amp; Studio (6)
            </button>
            <button 
              className={`filter-pill ${filter === 'case-study' ? 'active' : ''}`}
              onClick={() => setFilter('case-study')}
            >
              Case Studies &amp; Work (8)
            </button>
            <button 
              className={`filter-pill ${filter === 'commerce' ? 'active' : ''}`}
              onClick={() => setFilter('commerce')}
            >
              Shop &amp; Checkout (4)
            </button>
          </div>
        </div>

        {/* Grid of Pages */}
        <div className="pages-grid">
          {filteredPages.map((page) => (
            <div 
              key={page.id} 
              className="page-preview-card"
              onClick={() => {
                onSelectPage(page.id);
                onClose();
              }}
            >
              <div className="page-thumb-wrap">
                <img src={page.thumb} alt={page.name} className="page-thumb-img" />
                <span className="page-tag-badge">{page.tag}</span>
              </div>
              <div className="page-info">
                <h4 className="page-name font-display">{page.name}</h4>
                <p className="page-desc">{page.desc}</p>
                <div className="page-card-footer">
                  <span className="view-page-btn">
                    <span>VIEW LAYOUT</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
