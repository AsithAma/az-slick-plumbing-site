
import { useEffect, useRef } from 'react';
import { Award, Clock, Shield, Wrench } from 'lucide-react';

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureItem = ({ icon, title, description, delay }: FeatureItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            itemRef.current?.classList.add('revealed');
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, [delay]);

  return (
    <div ref={itemRef} className="flex items-start space-x-4 reveal-left">
      <div className="mt-1 bg-azplumbing-yellow/20 p-3 rounded-lg text-azplumbing-yellow">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-azplumbing-blue mb-1">{title}</h3>
        <p className="text-azplumbing-darkgray">{description}</p>
      </div>
    </div>
  );
};

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          titleRef.current?.classList.add('revealed');
          setTimeout(() => {
            contentRef.current?.classList.add('revealed');
          }, 200);
        }
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (contentRef.current) observer.unobserve(contentRef.current);
    };
  }, []);

  const features = [
    {
      icon: <Clock size={24} />,
      title: "20+ Years of Experience",
      description: "Two decades of industry experience delivering high-quality plumbing and heating solutions.",
      delay: 200
    },
    {
      icon: <Shield size={24} />,
      title: "Fully Licensed & Insured",
      description: "Complete peace of mind with our comprehensive insurance and professional certifications.",
      delay: 400
    },
    {
      icon: <Wrench size={24} />,
      title: "Expert Technicians",
      description: "Our team of skilled professionals undergoes regular training to stay current with industry standards.",
      delay: 600
    },
    {
      icon: <Award size={24} />,
      title: "Quality Guaranteed",
      description: "We stand behind our work with warranties and satisfaction guarantees on all services.",
      delay: 800
    }
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="py-20 bg-azplumbing-gray/30"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-azplumbing-blue reveal-up">
            About <span className="text-azplumbing-yellow">Us</span>
          </h2>
          <div className="w-24 h-1 bg-azplumbing-yellow mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Company Description */}
          <div ref={contentRef} className="reveal-right">
            <p className="text-lg mb-6 leading-relaxed">
              A-Z Heating & Plumbing based in Cardiff, South Wales is a business with over 20 years of experience in the plumbing industry. We take pride in delivering top-notch service and customer satisfaction.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              Our team of skilled plumbers undergoes regular training to stay up-to-date with the latest industry trends and techniques. We are fully licensed and insured for your peace of mind.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              Whether you have a minor plumbing issue or a major installation project, we are here to help. Contact us today for reliable and affordable heating and plumbing services.
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-8">
            {features.map((feature, index) => (
              <FeatureItem
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={feature.delay}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div 
        className="absolute w-40 h-40 bg-azplumbing-yellow/10 rounded-full -bottom-20 left-20 hidden lg:block" 
        style={{ zIndex: -1 }}
      ></div>
    </section>
  );
};

export default About;
