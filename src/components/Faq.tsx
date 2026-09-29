import { useState } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import './Faq.css';

interface FaqProps {
  onBookCall: () => void;
}

// PLACEHOLDER answers: check timelines, pricing and process against how Texnoid really works
const FAQS = [
  {
    q: 'What does Texnoid do?',
    a: 'We design and build websites and web apps, including e-commerce stores and interactive 3D experiences. We handle design, development and launch, so you have one team from idea to live site.',
  },
  {
    q: 'How long does a website project take?',
    a: 'It depends on the size of the site. A simple marketing site usually takes a few weeks, while larger builds with e-commerce or 3D take longer. We agree a clear timeline with you before we start.',
  },
  {
    q: 'How much does a website cost?',
    a: 'Every project is scoped individually, based on the pages, features and integrations you need. Book a call and we will give you a clear estimate after a short conversation.',
  },
  {
    q: 'Will my website work well on phones?',
    a: 'Yes. Every site we build is responsive and tested on phones, tablets and desktops, with speed and accessibility in mind.',
  },
  {
    q: 'Can you redesign or improve my existing website?',
    a: 'Absolutely. We can refresh the design, rebuild it on a faster foundation, or improve specific areas such as speed, checkout or SEO without starting from scratch.',
  },
  {
    q: 'Do you offer support after launch?',
    a: 'Yes. We can help with updates, fixes and new features after your site goes live, and we will show you how to manage content yourself.',
  },
];

export const Faq = ({ onBookCall }: FaqProps) => {
  const [open, setOpen] = useState(0);

  return (
    <section className="faq-section" id="faq" data-anim>
      <div className="faq-container">
        <aside className="faq-left" data-reveal>
          <span className="faq-eyebrow">
            <span className="faq-dot" /> FAQ
          </span>
          <h2 className="faq-title">Questions, answered.</h2>
          <p className="faq-sub">
            Can't find what you're looking for? Talk to us and we'll get back to you.
          </p>
          <button className="faq-cta" onClick={onBookCall}>
            <span>BOOK A CALL</span>
            <ArrowUpRight size={18} />
          </button>
        </aside>

        <ul className="faq-list">
          {FAQS.map((f, i) => {
            // open state is a data attribute, not a class: React would overwrite the is-revealed
            // class added by useScrollEffects and hide the row again
            const isOpen = open === i;
            return (
              <li className="faq-item" data-open={isOpen} key={f.q} data-reveal>
                <button
                  className="faq-q"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                >
                  <span className="faq-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="faq-q-text">{f.q}</span>
                  <span className="faq-icon" aria-hidden="true">
                    <Plus size={18} />
                  </span>
                </button>
                <div className="faq-a" id={`faq-a-${i}`} role="region">
                  <p>{f.a}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
