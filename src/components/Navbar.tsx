
import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "HOME", href: "#home" },
  { name: "SERVICES", href: "#services" },
  { name: "FAQ", href: "#faq" },
  { name: "ABOUT", href: "#about" },
  { name: "GALLERY", href: "#gallery" },
  { name: "CONTACT US", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const toggleMobileMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Calculate which section is currently in view
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled 
          ? 'bg-white/95 shadow-md backdrop-blur-sm py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a 
              href="#home" 
              className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105"
            >
              <span className="text-2xl font-extrabold">
                <span className="text-azplumbing-blue">A-Z</span>
                <span className="text-azplumbing-yellow"> H&P</span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`nav-link ${activeSection === link.href.replace('#', '') ? 'active' : ''}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Phone Number Button (Desktop) */}
          <div className="hidden md:block">
            <a href="tel:07912555608" className="fancy-button group flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>07912 555608</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-azplumbing-blue hover:bg-azplumbing-yellow/20"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full bg-white/95 backdrop-blur-sm transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 max-h-screen shadow-md' : 'opacity-0 max-h-0 overflow-hidden'
        }`}
      >
        <div className="container mx-auto px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block py-2 px-4 text-azplumbing-blue hover:bg-azplumbing-yellow/20 hover:text-azplumbing-yellow rounded-md"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="px-4 py-2">
            <a href="tel:07912555608" className="fancy-button w-full justify-center flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>07912 555608</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
