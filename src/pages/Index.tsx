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
import { toast } from "@/hooks/use-toast";

declare global {
  interface Window {
    initGoogleMap: () => void;
  }
}

const Index = () => {
  useEffect(() => {
    // Pre-load gallery images to ensure they're cached
    const preloadImages = () => {
      console.log("Index: Starting image preload");
      
      // We'll let the Gallery component handle its own preloading
      // This is just for critical above-the-fold images
      const criticalImages = [
        "/lovable-uploads/be3cec78-1c3d-4792-b317-ca4582abe649.png",
        "/lovable-uploads/e87baef5-3b6c-4561-860a-93f3727d01ba.png",
      ];
      
      let loadedCount = 0;
      let errorCount = 0;
      
      criticalImages.forEach((src, index) => {
        const img = new Image();
        img.onload = () => {
          console.log(`Loaded critical image ${index + 1}: ${src}`);
          loadedCount++;
        };
        img.onerror = () => {
          console.error(`Failed to load critical image: ${src}`);
          errorCount++;
          
          // Only show toast for critical errors
          if (errorCount === 1) {
            toast({
              title: "Some images failed to load",
              description: "We're using fallback images instead.",
              duration: 5000,
            });
          }
        };
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
