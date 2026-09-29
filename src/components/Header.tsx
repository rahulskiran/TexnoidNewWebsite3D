import { PHONE_TEL } from '../config/contact';

export const Header = () => {
  return (
    <header className="header-wrapper">
      <div className="header-container">
        {/* Brand Logo */}
        <div className="brand-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="brand-name">Texnoid</span>
          <sup className="brand-trademark">™</sup>
          <span className="brand-tag">WEB AGENCY</span>
        </div>

        {/* Right Actions */}
        <div className="header-actions">
          {/* Call Now */}
          <a
            className="menu-pill-btn"
            href={`tel:${PHONE_TEL}`}
            id="call-now-btn"
          >
            CALL NOW
          </a>
        </div>
      </div>
    </header>
  );
};
