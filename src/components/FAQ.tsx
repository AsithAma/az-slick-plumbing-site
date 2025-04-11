
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
  return (
    <div className="border-b border-gray-600 last:border-0">
      <button
        className="w-full text-left py-6 flex justify-between items-center focus:outline-none"
        onClick={onClick}
      >
        <h3 className="text-lg font-semibold text-azplumbing-yellow">{question}</h3>
        <ChevronDown
          className={`w-5 h-5 text-azplumbing-yellow transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-white pr-8">{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First FAQ open by default

  const faqItems = [
    {
      question: "What types of plumbing services do you offer?",
      answer: "We offer a wide range of plumbing services, including repairs, installations, and renovations. Whether you have a leaky tap, clogged drain, or need a new bathroom installed, we have you covered."
    },
    {
      question: "Do you provide free estimates?",
      answer: "Yes, we provide free estimates for all our services. Simply give us a call or fill out the contact form, and we will be happy to provide you with a detailed estimate for your plumbing project."
    },
    {
      question: "Are your plumbers licensed and insured?",
      answer: "Yes, all our plumbers are fully licensed, insured, and undergo regular training to stay updated with the latest industry standards and techniques."
    },
    {
      question: "How quickly can you respond to emergency plumbing issues?",
      answer: "We understand that plumbing emergencies require immediate attention. Our team is equipped to respond quickly to emergency calls, typically arriving within 1-2 hours depending on your location in South Wales."
    },
    {
      question: "What areas do you service?",
      answer: "We provide heating and plumbing services throughout South Wales, primarily focusing on Cardiff and the surrounding areas."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-[#202020] relative overflow-hidden text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Frequently Asked <span className="text-azplumbing-yellow">Questions</span>
          </h2>
          <div className="w-24 h-1 bg-azplumbing-yellow mx-auto mt-4"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </div>

        {/* Testimonial */}
        <div 
          className="mt-20 max-w-2xl mx-auto bg-[#2a2a2a] rounded-2xl shadow-service-card p-8 relative"
        >
          <div className="absolute -top-6 left-10 text-7xl text-azplumbing-yellow opacity-30">"</div>
          <blockquote className="relative z-10">
            <p className="text-lg italic text-white mb-4">
              "Great service from A-Z Heating and Plumbing. Came out promptly when requested, on time, courteous and efficient. Serviced boiler and relinked Hive. Good value, great response. Would definitely recommend this service."
            </p>
            <footer className="text-right">
              <cite className="font-medium text-azplumbing-yellow">— Dee Costa</cite>
            </footer>
          </blockquote>
          <div className="absolute -bottom-6 right-10 text-7xl text-azplumbing-yellow opacity-30">"</div>
        </div>
      </div>

      {/* Decorative circles */}
      <div className="absolute -left-20 top-40 w-80 h-80 rounded-full bg-azplumbing-yellow/5"></div>
      <div className="absolute -right-20 bottom-40 w-80 h-80 rounded-full bg-azplumbing-yellow/10"></div>
    </section>
  );
};

export default FAQ;
