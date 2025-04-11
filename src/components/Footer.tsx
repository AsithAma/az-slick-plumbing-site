
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-azplumbing-blue text-white">
      {/* Top section with logo and links */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and description */}
          <div>
            <div className="mb-4">
              <a 
                href="#home" 
                className="inline-flex items-center space-x-2 transition-transform duration-300 hover:scale-105"
              >
                <span className="text-2xl font-extrabold">
                  <span className="text-white">A-Z</span>
                  <span className="text-azplumbing-yellow"> H&P</span>
                </span>
              </a>
            </div>
            <p className="text-gray-300 mb-4 pr-4">
              Professional plumbing and heating services in South Wales. Quality workmanship and exceptional customer service guaranteed.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-azplumbing-yellow transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-azplumbing-yellow transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-azplumbing-yellow transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 relative inline-block">
              Quick Links
              <span className="block w-full h-1 bg-azplumbing-yellow mt-1"></span>
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-gray-300 hover:text-azplumbing-yellow transition-colors">Home</a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-azplumbing-yellow transition-colors">Services</a>
              </li>
              <li>
                <a href="#gallery" className="text-gray-300 hover:text-azplumbing-yellow transition-colors">Gallery</a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-azplumbing-yellow transition-colors">About Us</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-azplumbing-yellow transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 relative inline-block">
              Contact Info
              <span className="block w-full h-1 bg-azplumbing-yellow mt-1"></span>
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <span className="text-azplumbing-yellow mt-1">📍</span>
                <span>A-Z Heating & Plumbing, Heol Hir, Llanishen, Cardiff CF14 5AA, UK</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-azplumbing-yellow">📱</span>
                <a href="tel:07912555608" className="hover:text-azplumbing-yellow transition-colors">07912 555608</a>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-azplumbing-yellow">✉️</span>
                <a href="mailto:info@azheatingplumbing.co.uk" className="hover:text-azplumbing-yellow transition-colors">info@azheatingplumbing.co.uk</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom copyright section */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} A-Z Heating & Plumbing. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 text-gray-400 text-sm">
              <a href="#" className="hover:text-azplumbing-yellow transition-colors">Privacy Policy</a>
              <span className="mx-2">|</span>
              <a href="#" className="hover:text-azplumbing-yellow transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
