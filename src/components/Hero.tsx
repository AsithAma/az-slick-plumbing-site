import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (heroRef.current) {
        // Parallax effect
        heroRef.current.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center items-center bg-azplumbing-blue bg-hero-pattern bg-cover bg-center"
    >
      {/* Background overlay with subtle noise texture */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-white font-light mb-2 animate-fade-in opacity-0 [animation-delay:0.2s] text-lg md:text-xl">
            Your trusted heating and plumbing experts
          </p>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 animate-fade-in opacity-0 [animation-delay:0.4s]">
            <span className="block text-white">Welcome to</span>
            <span className="block hero-text-gradient text-5xl md:text-7xl lg:text-8xl mt-2">
              A-Z
            </span>
            <span className="block text-white text-4xl md:text-6xl lg:text-7xl">
              Heating & Plumbing
            </span>
          </h1>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mt-8 animate-fade-in opacity-0 [animation-delay:0.8s]">
            <p className="text-white text-base md:text-lg">
              We are a professional plumbing and heating company offering a wide range of services to residential clients in South Wales. Our team of highly trained and experienced engineers are dedicated to providing exceptional service and quality workmanship. Whether you need a simple repair or a complete plumbing and heating system installation, we have the skills and expertise to get the job done right. Contact us today for all your heating and plumbing needs.
            </p>
          </div>
          
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4 animate-fade-in opacity-0 [animation-delay:1s]">
            <a 
              href="#services" 
              className="fancy-button bg-azplumbing-yellow"
            >
              Our Services
            </a>
            <a 
              href="#contact" 
              className="fancy-button bg-white text-azplumbing-blue hover:text-white"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-10 w-full flex justify-center animate-bounce-light">
        <a 
          href="#services" 
          className="flex flex-col items-center text-white hover:text-azplumbing-yellow transition-colors duration-300"
        >
          <span className="mb-2 text-sm">Scroll Down</span>
          <ChevronDown size={24} />
        </a>
      </div>

      {/* Yellow accent shape */}
      <div className="absolute bottom-0 left-0 right-0 h-[10vh] bg-azplumbing-yellow clip-path-diagonal"></div>
      
      <style>{`
        .clip-path-diagonal {
          clip-path: polygon(0 100%, 100% 100%, 100% 0);
        }
      `}</style>
    </section>
  );
};

export default Hero;
