import { useState } from 'react';
import './App.css';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Included } from './components/Included';
import { Services } from './components/Services';
import { Works } from './components/Works';
import { Reviews } from './components/Reviews';
import { Faq } from './components/Faq';
import { PagesGallery } from './components/PagesGallery';
import { FooterSection } from './components/FooterSection';
import { BookCallModal } from './components/BookCallModal';
import { MenuDrawer } from './components/MenuDrawer';
import { CartDrawer } from './components/CartDrawer';
import { ExplorePagesModal } from './components/ExplorePagesModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { sound } from './utils/sound';
import { useScrollEffects } from './hooks/useScrollEffects';

export function App() {
  useScrollEffects();
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isExplorePagesOpen, setIsExplorePagesOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const handleOpenBookCall = () => {
    sound.playPop();
    setIsBookCallOpen(true);
  };

  const handleOpenCart = () => {
    sound.playPop();
    setIsCartOpen(true);
  };

  const handleViewWork = () => {
    sound.playPop();
    document.getElementById('works')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleExplorePages = () => {
    sound.playPop();
    setIsExplorePagesOpen(true);
  };

  const handleSelectPageFromModal = (pageId: string) => {
    sound.playPop();
    if (pageId === 'shop') {
      setIsCartOpen(true);
    } else if (pageId === 'single-case') {
      setSelectedProject({
        title: 'Crafting Chaos With A Smile',
        category: 'Brand Identity & Visual Narrative',
        client: 'Texnoid Studio',
        year: '2026',
        image: '/assets/editorial_girl.jpg',
        description: 'A provocative identity system blending brutalist typography, playful 3D iconography, and editorial nature photography to redefine modern agency culture.'
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="app-root">
      <div className="scroll-progress" aria-hidden="true" />
      {/* Top Header */}
      <Header />

      {/* Main Content */}
      <main>
        {/* Section 01: Hero Section */}
        <Hero
          onExplorePages={handleViewWork}
          onBuyTemplate={handleOpenBookCall}
        />

        <PagesGallery />

        <Included />

        <Services onExplore={handleExplorePages} />

        <Works />

        <Reviews />

        <Faq onBookCall={handleOpenBookCall} />
      </main>

      {/* Extended Footer & Client Marquee */}
      <FooterSection
        onOpenBookCall={handleOpenBookCall}
        onExplorePages={handleViewWork}
      />

      {/* Floating WhatsApp chat button, bottom right */}
      <WhatsAppButton />

      {/* Bottom Right Floating Cart Button & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOpen={handleOpenCart}
      />

      {/* Interactive Modals */}
      <BookCallModal
        isOpen={isBookCallOpen}
        onClose={() => setIsBookCallOpen(false)}
      />

      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenBookCall={handleOpenBookCall}
        onExplorePages={handleExplorePages}
        onOpenCart={handleOpenCart}
      />

      <ExplorePagesModal
        isOpen={isExplorePagesOpen}
        onClose={() => setIsExplorePagesOpen(false)}
        onSelectPage={handleSelectPageFromModal}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenBookCall={handleOpenBookCall}
      />
    </div>
  );
}

export default App;
