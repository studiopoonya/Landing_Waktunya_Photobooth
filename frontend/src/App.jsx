import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TrustBar from './components/TrustBar';
import HowItWorks from './components/HowItWorks';
import FeaturesSection from './components/FeaturesSection';
import GallerySection from './components/GallerySection';
import BeforeAfter from './components/BeforeAfter';
import PricingSection from './components/PricingSection';
import TestimonialSection from './components/TestimonialSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import LeadForm from './components/LeadForm';
import WhatsAppButton from './components/WhatsAppButton';
import StickyMobileCTA from './components/StickyMobileCTA';

export default function App() {
  const [formOpen, setFormOpen] = useState(false);
  const dismissed = useRef(false);

  useEffect(() => {
    if (dismissed.current) return;
    const timer = setTimeout(() => setFormOpen(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const openForm = () => setFormOpen(true);
  const closeForm = () => {
    dismissed.current = true;
    setFormOpen(false);
  };

  return (
    <>
      <Navbar onOpenForm={openForm} />
      <main>
        <HeroSection onOpenForm={openForm} />
        <TrustBar />
        <HowItWorks />
        <FeaturesSection />
        <GallerySection />
        <BeforeAfter />
        <PricingSection onOpenForm={openForm} />
        <TestimonialSection />
        <FAQSection />
        <CTASection onOpenForm={openForm} />
      </main>
      <Footer />
      <LeadForm isOpen={formOpen} onClose={closeForm} />
      <WhatsAppButton />
      <StickyMobileCTA onOpenForm={openForm} />
    </>
  );
}
