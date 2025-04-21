
import React, { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import FAQ from "@/components/FAQ";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import ContactUs from "@/components/ContactUs";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";

declare global {
  interface Window {
    initGoogleMap: () => void;
  }
}

const Index = () => {
  useEffect(() => {
    // Pre-load gallery images to ensure they're cached
    const preloadImages = () => {
      const galleryImages = [
        "/lovable-uploads/be3cec78-1c3d-4792-b317-ca4582abe649.png",
        "/lovable-uploads/e87baef5-3b6c-4561-860a-93f3727d01ba.png",
        "/lovable-uploads/3116340c-16c6-4172-ae6a-63fe9de1e6e4.png",
        "/lovable-uploads/3a2b41bf-c025-4b23-b226-33d0cc084b61.png",
        "/lovable-uploads/4b3e1340-f545-48d0-bf85-6ced937e6cc7.png",
        "/lovable-uploads/af850c21-57c9-47d4-8f45-223ada4b44b2.png",
        "/lovable-uploads/345e8800-accb-4edc-8a4e-750efd337c10.png",
        "/lovable-uploads/5ff362dc-38db-4d62-99bf-1632835ede72.png",
        "/lovable-uploads/3f807f73-366b-40cb-964a-e41da48b2065.png",
        "/lovable-uploads/c25c2d3f-1d25-464b-9f99-dbe384fe4369.png",
        "/lovable-uploads/e6747307-a130-4390-9729-b533b962e66c.png",
        "/lovable-uploads/025eb597-dc1b-4d01-8a54-738f77eeb1bd.png"
      ];
      
      galleryImages.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };
    
    preloadImages();
    
    const handleScroll = () => {
      const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
      
      revealElements.forEach((element) => {
        const elementTop = (element as HTMLElement).getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.85) {
          (element as HTMLElement).classList.add('revealed');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <FAQ />
        <About />
        <Gallery />
        <MapSection />
        <ContactUs />
      </main>
      <Footer />
      
      <a 
        href="#home" 
        className="fixed bottom-8 right-8 bg-azplumbing-yellow text-azplumbing-blue p-3 rounded-full shadow-lg hover:bg-azplumbing-blue hover:text-azplumbing-yellow transition-all duration-300 z-20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </a>
      
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', () => {
            const scrollElements = document.querySelectorAll('.animate-on-scroll');
            
            const elementInView = (el, dividend = 1) => {
              const elementTop = el.getBoundingClientRect().top;
              return (
                elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
              );
            };
            
            const displayScrollElement = (element) => {
              element.classList.add('visible');
            };
            
            const handleScrollAnimation = () => {
              scrollElements.forEach((el) => {
                if (elementInView(el, 1.25)) {
                  displayScrollElement(el);
                }
              });
            };
            
            window.addEventListener("scroll", () => {
              handleScrollAnimation();
            });
            
            handleScrollAnimation();
          });
        `
      }} />
    </div>
  );
};

export default Index;
