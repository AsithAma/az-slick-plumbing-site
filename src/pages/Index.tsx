
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

const Index = () => {
  useEffect(() => {
    // Initialize smooth scrolling and animation observers
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
      
      {/* Back to top button */}
      <a 
        href="#home" 
        className="fixed bottom-8 right-8 bg-azplumbing-yellow text-azplumbing-blue p-3 rounded-full shadow-lg hover:bg-azplumbing-blue hover:text-azplumbing-yellow transition-all duration-300 z-20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </a>
      
      {/* Script for animation observers */}
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
            
            // Run once to check for elements in view on page load
            handleScrollAnimation();
          });
        `
      }} />
    </div>
  );
};

export default Index;
