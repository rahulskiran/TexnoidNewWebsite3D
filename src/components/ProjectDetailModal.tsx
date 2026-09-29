import { X, ArrowUpRight, Award, CheckCircle2 } from 'lucide-react';

interface ProjectDetailModalProps {
  project: {
    title: string;
    category: string;
    client: string;
    year: string;
    image?: string;
    description: string;
  } | null;
  onClose: () => void;
  onOpenBookCall: () => void;
}

export const ProjectDetailModal = ({
  project,
  onClose,
  onOpenBookCall,
}: ProjectDetailModalProps) => {
  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="project-detail-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close details">
          <X size={20} />
        </button>

        <div className="project-detail-content">
          <div className="project-meta-top">
            <span className="project-badge">{project.category}</span>
            <span className="project-year">{project.year}</span>
          </div>

          <h2 className="project-detail-title font-display">{project.title}</h2>
          
          <p className="project-detail-description">
            {project.description}
          </p>

          {project.image && (
            <div className="project-detail-banner-wrap">
              <img src={project.image} alt={project.title} className="project-detail-banner" />
            </div>
          )}

          <div className="project-specs-grid">
            <div className="spec-col">
              <span className="spec-label">CLIENT</span>
              <span className="spec-val">{project.client}</span>
            </div>
            <div className="spec-col">
              <span className="spec-label">DISCIPLINE</span>
              <span className="spec-val">Branding, 3D WebGL, Design</span>
            </div>
            <div className="spec-col">
              <span className="spec-label">RECOGNITION</span>
              <span className="spec-val flex-center-gap"><Award size={14} /> Site of the Day / Awwwards</span>
            </div>
          </div>

          <div className="project-deliverables-box">
            <h4 className="deliverables-title">CORE DELIVERABLES</h4>
            <div className="deliverables-tags">
              <span className="deliverable-tag"><CheckCircle2 size={13} /> Realtime 3D Shader Pipelines</span>
              <span className="deliverable-tag"><CheckCircle2 size={13} /> Custom Grotesque Typography</span>
              <span className="deliverable-tag"><CheckCircle2 size={13} /> Dynamic React &amp; Three.js Architecture</span>
              <span className="deliverable-tag"><CheckCircle2 size={13} /> E-commerce Motion Framework</span>
            </div>
          </div>

          <div className="project-detail-actions">
            <button 
              className="btn-pill-lavender" 
              onClick={() => {
                onClose();
                onOpenBookCall();
              }}
            >
              <span>INQUIRE ABOUT A SIMILAR PROJECT</span>
              <ArrowUpRight size={15} />
            </button>
            <button className="btn-pill-outline" onClick={onClose}>
              CLOSE PREVIEW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
