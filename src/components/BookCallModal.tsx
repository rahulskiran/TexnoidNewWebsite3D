import { useEffect, useState } from 'react';
import { X, Check, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import './BookCallModal.css';

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// PLACEHOLDER slots: connect to a real calendar before launch
const SLOTS = ['Tomorrow, 10:30 AM', 'Tomorrow, 4:00 PM', 'Day after, 11:30 AM', 'Day after, 3:00 PM'];
const SERVICES = ['Website', 'Web app', 'E-commerce', '3D & motion'];

export const BookCallModal = ({ isOpen, onClose }: BookCallModalProps) => {
  const [service, setService] = useState(SERVICES[0]);
  const [slot, setSlot] = useState(SLOTS[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Close on Escape and stop the page scrolling behind the modal
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 65,
      origin: { y: 0.7 },
      colors: ['#e11d2e', '#ff8a3d', '#c2337a'],
    });
  };

  const handleDone = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="bcm-backdrop" onClick={onClose}>
      <div
        className="bcm-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bcm-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="bcm-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        {!isSubmitted ? (
          <>
            <span className="bcm-eyebrow">Free 20-minute call</span>
            <h3 className="bcm-title" id="bcm-title">Book a discovery call</h3>
            <p className="bcm-sub">Tell us what you need and pick a time. We will confirm by email.</p>

            <form onSubmit={handleSubmit} className="bcm-form">
              <fieldset className="bcm-field">
                <legend>I need a</legend>
                <div className="bcm-chips">
                  {SERVICES.map((s) => (
                    <button
                      type="button"
                      key={s}
                      className={`bcm-chip${service === s ? ' active' : ''}`}
                      aria-pressed={service === s}
                      onClick={() => setService(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="bcm-field">
                <legend>Time (IST)</legend>
                <div className="bcm-chips">
                  {SLOTS.map((s) => (
                    <button
                      type="button"
                      key={s}
                      className={`bcm-chip${slot === s ? ' active' : ''}`}
                      aria-pressed={slot === s}
                      onClick={() => setSlot(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="bcm-inputs">
                <label className="bcm-field">
                  <span>Name</span>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <label className="bcm-field">
                  <span>Email</span>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>

              <button type="submit" className="bcm-submit">
                <span>CONFIRM CALL</span>
                <ArrowUpRight size={18} />
              </button>
            </form>
          </>
        ) : (
          <div className="bcm-success">
            <span className="bcm-check"><Check size={30} /></span>
            <h3 className="bcm-title">You're booked{name ? `, ${name.split(' ')[0]}` : ''}.</h3>
            <p className="bcm-sub">
              {slot} (IST) for a {service.toLowerCase()} call. We will email the meeting link to{' '}
              <strong>{email}</strong>.
            </p>
            <button className="bcm-submit" onClick={handleDone}>DONE</button>
          </div>
        )}
      </div>
    </div>
  );
};
