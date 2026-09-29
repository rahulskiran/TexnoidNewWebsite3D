import { useState, useEffect } from 'react';
import { X, ArrowUpRight } from 'lucide-react';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBookCall: () => void;
  onExplorePages: () => void;
  onOpenCart: () => void;
}

export const MenuDrawer = ({
  isOpen,
  onClose,
  onOpenBookCall,
  onExplorePages,
  onOpenCart,
}: MenuDrawerProps) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-GB', {
          timeZone: 'Europe/Amsterdam',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="menu-overlay" onClick={onClose}>
      <div className="menu-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="menu-header">
          <div className="menu-header-left">
            <span className="pulsing-dot" />
            <span className="live-clock">AMSTERDAM {time} CET</span>
          </div>
          <button className="menu-close-btn" onClick={onClose} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>

        {/* Main Links */}
        <div className="menu-nav-links">
          <a
            href="#hero"
            className="menu-link-item"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="link-num">01</span>
            <span className="link-text font-display">HOME</span>
            <ArrowUpRight size={22} className="link-arrow" />
          </a>

          <a
            href="#projects"
            className="menu-link-item"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              const el = document.getElementById('projects-showcase');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="link-num">02</span>
            <span className="link-text font-display">SELECTED WORK</span>
            <ArrowUpRight size={22} className="link-arrow" />
          </a>

          <a
            href="#pages"
            className="menu-link-item"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              onExplorePages();
            }}
          >
            <span className="link-num">03</span>
            <span className="link-text font-display">EXPLORE PAGES</span>
            <span className="link-badge">18+ PREVIEWS</span>
          </a>

          <a
            href="#shop"
            className="menu-link-item"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              onOpenCart();
            }}
          >
            <span className="link-num">04</span>
            <span className="link-text font-display">BUY TEMPLATE</span>
            <span className="link-badge-pill">$129 LICENSE</span>
          </a>

          <a
            href="#book"
            className="menu-link-item"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              onOpenBookCall();
            }}
          >
            <span className="link-num">05</span>
            <span className="link-text font-display">BOOK A CALL</span>
            <span className="link-badge">AVAILABLE</span>
          </a>
        </div>

        {/* Bottom Agency Metadata */}
        <div className="menu-footer-meta">
          <div className="meta-col">
            <span className="meta-heading">HEADQUARTERS</span>
            <p className="meta-desc">
              Laugh Lane 42, 1017 DK<br />
              Amsterdam, The Netherlands
            </p>
          </div>

          <div className="meta-col">
            <span className="meta-heading">GET IN TOUCH</span>
            <a href="mailto:heyhello@thesmiling.agency" className="meta-email">
              heyhello@thesmiling.agency
            </a>
          </div>

          <div className="meta-col">
            <span className="meta-heading">FOLLOW</span>
            <div className="social-tags-list">
              <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter (X)</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
