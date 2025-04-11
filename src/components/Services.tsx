
import { useEffect, useRef } from 'react';
import { Wrench, Flame, Bath } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number; // Animation delay
}

const ServiceCard = ({ icon, title, description, delay }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            cardRef.current?.classList.add('revealed');
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div 
      ref={cardRef}
      className="service-card bg-white shadow-lg reveal-up"
    >
      <div className="mb-5 inline-flex p-3 rounded-lg bg-azplumbing-yellow/20 text-azplumbing-yellow">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-azplumbing-blue">
        {title}
      </h3>
      <p className="text-azplumbing-darkgray">
        {description}
      </p>
    </div>
  );
};

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          headingRef.current?.classList.add('revealed');
        }
      },
      { threshold: 0.1 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-white to-azplumbing-gray/30 relative"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold text-azplumbing-blue reveal-up"
          >
            Our <span className="text-azplumbing-yellow">Services</span>
          </h2>
          <div className="w-24 h-1 bg-azplumbing-yellow mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard 
            icon={<Wrench size={28} />}
            title="Plumbing Repairs"
            description="Our experienced plumbers can handle all types of plumbing repairs, from fixing leaky pipes to toilet flush systems. We use the latest tools and techniques to ensure the job is done right the first time."
            delay={100}
          />
          
          <ServiceCard 
            icon={<Flame size={28} />}
            title="Boiler Installation"
            description="Need a new boiler? Our team can install high-quality boilers that are energy-efficient and reliable. We will assess your heating needs and recommend the best boiler for your home or business."
            delay={300}
          />
          
          <ServiceCard 
            icon={<Bath size={28} />}
            title="Bathroom Renovation"
            description="Looking to renovate your bathroom? We offer complete bathroom renovation services, including plumbing installation, fixture replacement, and tiling. Transform your bathroom into a beautiful and functional space with our help."
            delay={500}
          />
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg mb-6">Follow the link below to take you to a catalogue of bathrooms completed by the team</p>
          <a 
            href="#gallery" 
            className="inline-block fancy-button"
          >
            Bathroom design catalogue
          </a>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-azplumbing-yellow/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-azplumbing-yellow/10 rounded-full translate-y-1/2 -translate-x-1/3"></div>
    </section>
  );
};

export default Services;
