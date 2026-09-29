import { useState } from 'react';
import { ArrowUpRight, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PHONE_DISPLAY, PHONE_TEL } from '../config/contact';
import './Footer.css';

interface FooterSectionProps {
  onOpenBookCall: () => void;
  onExplorePages: () => void;
}

// TODO: replace with Texnoid's real contact email
const EMAIL = 'hello@texnoid.com';

const SERVICES = ['Web Design', 'Web Development', 'E-commerce', '3D & Motion'];

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

export const FooterSection = ({ onOpenBookCall, onExplorePages }: FooterSectionProps) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.9 },
      colors: ['#e11d2e', '#ff8a3d', '#c2337a'],
    });
  };

  return (
    <footer className="ftr" data-anim>
      {/* Call to action */}
      <div className="ftr-cta">
        <p className="ftr-kicker" data-reveal>Start a project</p>
        <h2 className="ftr-headline" data-reveal>
          Have a project in <span className="ftr-accent">mind?</span>
        </h2>

        <div className="ftr-cta-row" data-reveal>
          <a className="ftr-mail" href={`mailto:${EMAIL}`}>
            <span>{EMAIL}</span>
            <ArrowUpRight size={28} />
          </a>
          <div className="ftr-cta-buttons">
            <button className="ftr-btn ftr-btn-red" onClick={onOpenBookCall}>
              <span>BOOK A CALL</span>
              <ArrowUpRight size={18} />
            </button>
            <button className="ftr-btn ftr-btn-ghost" onClick={onExplorePages}>
              VIEW OUR WORK
            </button>
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="ftr-main">
        <div className="ftr-grid" data-reveal>
          <div className="ftr-brand">
            <button className="ftr-logo" onClick={scrollToTop} aria-label="Back to top">
              <img className="ftr-logo-mark" src="/assets/brand/logo-mark.png" alt="" />
              <span>Texnoid<sup>™</sup></span>
            </button>
            <p className="ftr-mission">
              We design and build fast, beautiful websites and web apps, with a touch of 3D and
              motion, for brands that want to grow.
            </p>
            <a className="ftr-phone" href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
          </div>

          <div className="ftr-col">
            <span className="ftr-label">Explore</span>
            <ul>
              <li><a href="#services">Services</a></li>
              <li><a href="#works">Works</a></li>
              <li><a href="#reviews">Reviews</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          <div className="ftr-col">
            <span className="ftr-label">What we do</span>
            <ul>
              {SERVICES.map((s) => (
                <li key={s}><a href="#services">{s}</a></li>
              ))}
            </ul>
          </div>

          <div className="ftr-col ftr-news">
            <span className="ftr-label">Newsletter</span>
            <p className="ftr-news-text">Occasional notes on web design, 3D and performance.</p>
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="ftr-form">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address"
                  required
                />
                <button type="submit" aria-label="Subscribe">
                  <Send size={16} />
                </button>
              </form>
            ) : (
              <p className="ftr-success">Thanks, you're on the list.</p>
            )}
          </div>
        </div>

        <div className="ftr-bottom">
          <span>© {new Date().getFullYear()} Texnoid Solutions LLP. All rights reserved.</span>
          <span className="ftr-legal">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#cookies">Cookies</a>
          </span>
          <button className="ftr-top" onClick={scrollToTop}>
            Back to top <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
