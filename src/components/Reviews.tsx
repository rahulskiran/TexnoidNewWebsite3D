import { Star } from 'lucide-react';
import './Reviews.css';

interface Review {
  name: string;
  role: string;
  text: string;
}

// PLACEHOLDER reviews: replace with real client testimonials (with permission) before launch
const ROW_ONE: Review[] = [
  { name: 'Aarav Sharma', role: 'Founder, Kaveri Home Decor', text: 'Honestly did not expect this much change. Our old site was slow and confusing, and now customers actually complete their orders.' },
  { name: 'Ananya Reddy', role: 'Marketing Lead, Bloom Organics', text: 'They listened properly to what we wanted and never made us feel silly for asking questions. The site feels exactly like our brand.' },
  { name: 'Vikram Malhotra', role: 'Director, Malhotra Interiors', text: 'Site went live a day before our showroom event and it was spot on. Even my father, who hates technology, could use it.' },
  { name: 'Priya Nair', role: 'Owner, Spice Route Kitchen', text: 'The little 3D touches make people stop and look, and it still opens fast on mobile. We get more table bookings now.' },
];

const ROW_TWO: Review[] = [
  { name: 'Rohan Iyer', role: 'Co-founder, Craftly', text: 'Good communication, no surprises on the invoice and clean work. When we asked for changes late on a Friday, they still did it.' },
  { name: 'Sneha Kulkarni', role: 'Head of Growth, Loop Fitness', text: 'Enquiries have nearly doubled since the redesign. I did not think a website could make such a difference so quickly.' },
  { name: 'Arjun Patel', role: 'CEO, Patel Logistics', text: 'Took a complicated business and made it simple to understand. Our clients keep telling us the new site looks very professional.' },
  { name: 'Meera Joshi', role: 'Founder, Studio Meera', text: 'Very easy to work with. They explained everything in simple words, and now I can update my own pages without calling anyone.' },
];

const Card = ({ review }: { review: Review }) => (
  <figure className="rev-card">
    <div className="rev-stars" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={16} fill="currentColor" />
      ))}
    </div>
    <blockquote className="rev-text">“{review.text}”</blockquote>
    <figcaption className="rev-person">
      <span className="rev-avatar" aria-hidden="true">{review.name.charAt(0)}</span>
      <span>
        <strong>{review.name}</strong>
        <small>{review.role}</small>
      </span>
    </figcaption>
  </figure>
);

const Row = ({ items, reverse }: { items: Review[]; reverse?: boolean }) => (
  <div className="rev-row">
    <div className={`rev-track${reverse ? ' reverse' : ''}`}>
      {/* the list is repeated so the loop is seamless */}
      {[...items, ...items].map((r, i) => (
        <div className="rev-item" key={i} aria-hidden={i >= items.length ? true : undefined}>
          <Card review={r} />
        </div>
      ))}
    </div>
  </div>
);

type RevTheme = 'ember' | 'midnight' | 'sunset' | 'orchid' | 'aurora';

export const Reviews = ({ theme = 'ember' }: { theme?: RevTheme }) => (
  <section className={`rev-section rev-theme-${theme}`} id="reviews" data-anim>
    <div className="rev-head" data-reveal>
      <span className="rev-eyebrow">
        <span className="rev-dot" /> Customer reviews
      </span>
      <h2 className="rev-title">Loved by the teams we build for</h2>
    </div>

    <Row items={ROW_ONE} />
    <Row items={ROW_TWO} reverse />
  </section>
);
