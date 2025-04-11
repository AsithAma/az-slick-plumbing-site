
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const Gallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = [
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          titleRef.current?.classList.add('revealed');
        }
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction: number) => {
    if (selectedImage === null) return;
    
    const newIndex = selectedImage + direction;
    if (newIndex >= 0 && newIndex < images.length) {
      setSelectedImage(newIndex);
    } else if (newIndex < 0) {
      setSelectedImage(images.length - 1);
    } else {
      setSelectedImage(0);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        navigateImage(1);
      } else if (e.key === 'ArrowLeft') {
        navigateImage(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage]);

  return (
    <section id="gallery" ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-azplumbing-blue reveal-up">
            Our <span className="text-azplumbing-yellow">Gallery</span>
          </h2>
          <div className="w-24 h-1 bg-azplumbing-yellow mx-auto mt-4"></div>
          <p className="mt-4 text-lg text-azplumbing-darkgray max-w-2xl mx-auto">
            Explore our portfolio of completed bathroom renovations and other plumbing projects.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((src, index) => (
            <div
              key={index}
              className="gallery-item animate-on-scroll cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <img
                src={src}
                alt={`Bathroom project ${index + 1}`}
                className="w-full h-64 object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-azplumbing-yellow p-2 z-50"
          >
            <X size={32} />
          </button>
          
          <button
            onClick={() => navigateImage(-1)}
            className="absolute left-4 text-white hover:text-azplumbing-yellow p-2"
          >
            <ChevronLeft size={40} />
          </button>
          
          <div className="max-h-[80vh] max-w-[80vw]">
            <img
              src={images[selectedImage]}
              alt={`Bathroom project ${selectedImage + 1}`}
              className="max-h-[80vh] max-w-[80vw] object-contain"
            />
          </div>
          
          <button
            onClick={() => navigateImage(1)}
            className="absolute right-4 text-white hover:text-azplumbing-yellow p-2"
          >
            <ChevronRight size={40} />
          </button>
          
          <div className="absolute bottom-4 text-white text-center w-full">
            <p>{selectedImage + 1} / {images.length}</p>
          </div>
        </div>
      )}

      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', () => {
            const animatedElements = document.querySelectorAll('.animate-on-scroll');
            
            const observer = new IntersectionObserver((entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add('visible');
                }
              });
            }, { threshold: 0.1 });
            
            animatedElements.forEach((el) => {
              observer.observe(el);
            });
          });
        `
      }} />
    </section>
  );
};

export default Gallery;
