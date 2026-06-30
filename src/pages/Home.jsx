import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Toolbox from '../components/Toolbox';
import GitHubStats from '../components/GitHubStats';
import Education from '../components/Education';
import Certifications from '../components/Certifications';
import Activities from '../components/Activities';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ResumePopup from '../components/ResumePopup';
import ExperienceModal from '../components/ExperienceModal';

export default function Home() {
  const [showResume, setShowResume] = useState(false);
  const [selectedExp, setSelectedExp] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Check if redirect scroll state exists
    if (location.state?.scrollToHash) {
      const hash = location.state.scrollToHash;
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
      // Reset router state to prevent scrolling again on subsequent renders
      window.history.replaceState(null, '');
    }
  }, [location]);

  // Disable body scrolling when modal is open
  useEffect(() => {
    if (showResume || selectedExp) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showResume, selectedExp]);

  return (
    <div className="home-page">
      <Navbar />
      
      <main>
        <Hero onResumeClick={() => setShowResume(true)} />
        <About />
        <Projects />
        <Experience onViewDetails={(item) => setSelectedExp(item)} />
        <Toolbox />
        <GitHubStats />
        <Education />
        <Certifications />
        <Activities />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      {/* Popups and Modals with AnimatePresence */}
      <AnimatePresence>
        {showResume && (
          <ResumePopup onClose={() => setShowResume(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedExp && (
          <ExperienceModal 
            item={selectedExp} 
            onClose={() => setSelectedExp(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
