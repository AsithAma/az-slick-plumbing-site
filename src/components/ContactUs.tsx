
import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const ContactUs = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          titleRef.current?.classList.add('revealed');
          setTimeout(() => {
            formRef.current?.classList.add('revealed');
          }, 300);
        }
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }
    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (formRef.current) observer.unobserve(formRef.current);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
        duration: 5000,
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 bg-azplumbing-gray/30"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-azplumbing-blue reveal-up"
          >
            Contact <span className="text-azplumbing-yellow">Us</span>
          </h2>
          <div className="w-24 h-1 bg-azplumbing-yellow mx-auto mt-4"></div>
          <p className="mt-6 text-lg max-w-2xl mx-auto text-azplumbing-darkgray">
            For any inquiries or to schedule a service, please fill out the form below or give us a call at 07912 555608. We look forward to hearing from you!
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form 
            ref={formRef}
            onSubmit={handleSubmit} 
            className="bg-white rounded-2xl shadow-lg p-8 md:p-10 reveal-up"
          >
            <div className="mb-6">
              <label 
                htmlFor="name" 
                className="block mb-2 text-sm font-medium text-azplumbing-blue"
              >
                Name <span className="text-azplumbing-yellow">*</span>
              </label>
              <input 
                type="text" 
                id="name" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-azplumbing-yellow/50 focus:border-azplumbing-yellow transition-colors"
                placeholder="Your name"
              />
            </div>

            <div className="mb-6">
              <label 
                htmlFor="email" 
                className="block mb-2 text-sm font-medium text-azplumbing-blue"
              >
                Email address <span className="text-azplumbing-yellow">*</span>
              </label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-azplumbing-yellow/50 focus:border-azplumbing-yellow transition-colors"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="mb-6">
              <label 
                htmlFor="message" 
                className="block mb-2 text-sm font-medium text-azplumbing-blue"
              >
                Message <span className="text-azplumbing-yellow">*</span>
              </label>
              <textarea 
                id="message" 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-azplumbing-yellow/50 focus:border-azplumbing-yellow transition-colors"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <div className="text-center">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="fancy-button w-full sm:w-auto px-8 py-3 bg-azplumbing-yellow text-azplumbing-blue relative overflow-hidden group"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-azplumbing-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
