
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const Gallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [imagesLoaded, setImagesLoaded] = useState(0);

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

  // Fallback images from Unsplash (plumbing/bathroom related)
  const fallbackImages = [
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523772354886-34a1dc2f72e7?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606341799659-708ebe896249?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1594731884638-8197c3102d1d?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1595514535261-f9d397b84a2c?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1613545325268-9265e1609167?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1536714545872-6da8056a4130?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584622781880-a5d06f57686a?w=800&auto=format&fit=crop"
  ];

  useEffect(() => {
    // Preload all images before rendering
    const preloadAllImages = () => {
      console.log("Preloading gallery images...");
      
      // Preload original images
      images.forEach((src, index) => {
        const img = new Image();
        img.onload = () => {
          console.log(`Loaded image ${index + 1}/${images.length}: ${src}`);
          setImagesLoaded(prev => prev + 1);
        };
        img.onerror = () => {
          console.error(`Failed to load image ${index + 1}/${images.length}: ${src}`);
          setImageErrors(prev => ({ ...prev, [index]: true }));
          
          // Try to load fallback image
          const fallbackImg = new Image();
          fallbackImg.src = fallbackImages[index % fallbackImages.length];
        };
        img.src = src;
      });
      
      // Preload fallback images
      fallbackImages.forEach((src, index) => {
        const img = new Image();
        img.src = src;
      });
    };
    
    preloadAllImages();

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

  const getImageSrc = (index: number) => {
    return imageErrors[index] ? fallbackImages[index % fallbackImages.length] : images[index];
  };

  return (
    <section id="gallery" ref={sectionRef} className="py-20 bg-[#202020] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-white reveal-up">
            Our <span className="text-azplumbing-yellow">Gallery</span>
          </h2>
          <div className="w-24 h-1 bg-azplumbing-yellow mx-auto mt-4"></div>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Explore our portfolio of completed bathroom renovations and other plumbing projects.
          </p>
        </div>

        {imagesLoaded < 3 && (
          <div className="flex justify-center items-center my-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-azplumbing-yellow"></div>
            <p className="ml-4 text-azplumbing-yellow">Loading gallery...</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((src, index) => (
            <div
              key={index}
              className="gallery-item animate-on-scroll cursor-pointer border border-gray-700 rounded-xl overflow-hidden"
              onClick={() => openLightbox(index)}
            >
              <img
                src={getImageSrc(index)}
                alt={`Bathroom project ${index + 1}`}
                className="w-full h-64 object-cover"
                loading="lazy"
                onError={() => setImageErrors(prev => ({ ...prev, [index]: true }))}
              />
            </div>
          ))}
        </div>

        {process.env.NODE_ENV !== 'production' && (
          <div className="mt-8 p-4 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Debug Info</h3>
            <p>Images array length: {images.length}</p>
            <p>Images loaded: {imagesLoaded}/{images.length}</p>
            <p>Images with errors: {Object.keys(imageErrors).length}</p>
            <p>Image paths:</p>
            <div className="text-xs overflow-x-auto max-h-40 bg-gray-900 p-2 rounded">
              {images.map((src, i) => (
                <div key={i} className="mb-1">
                  {i + 1}: {src} {imageErrors[i] ? '(Error loading - using fallback)' : ''}
                </div>
              ))}
            </div>
          </div>
        )}
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
              src={getImageSrc(selectedImage)}
              alt={`Bathroom project ${selectedImage + 1}`}
              className="max-h-[80vh] max-w-[80vw] object-contain"
              onError={() => setImageErrors(prev => ({ ...prev, [selectedImage]: true }))}
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
    </section>
  );
};

export default Gallery;
