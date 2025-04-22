
import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = [
    "../src/assets/be3cec78-1c3d-4792-b317-ca4582abe649.png",
    "../src/assets/e87baef5-3b6c-4561-860a-93f3727d01ba.png",
    "../src/assets/3116340c-16c6-4172-ae6a-63fe9de1e6e4.png",
    "../src/assets/3a2b41bf-c025-4b23-b226-33d0cc084b61.png",
    "../src/assets/4b3e1340-f545-48d0-bf85-6ced937e6cc7.png",
    "../src/assets/af850c21-57c9-47d4-8f45-223ada4b44b2.png",
    "../src/assets/345e8800-accb-4edc-8a4e-750efd337c10.png",
    "../src/assets/5ff362dc-38db-4d62-99bf-1632835ede72.png",
    "../src/assets/3f807f73-366b-40cb-964a-e41da48b2065.png",
    "../src/assets/c25c2d3f-1d25-464b-9f99-dbe384fe4369.png",
    "../src/assets/e6747307-a130-4390-9729-b533b962e66c.png",
    "../src/assets/025eb597-dc1b-4d01-8a54-738f77eeb1bd.png"
  ];

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

  return (
    <section id="gallery" className="py-20 bg-[#202020] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Our <span className="text-azplumbing-yellow">Gallery</span>
          </h2>
          <div className="w-24 h-1 bg-azplumbing-yellow mx-auto mt-4"></div>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Explore our portfolio of completed bathroom renovations and other plumbing projects.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((src, index) => (
            <div
              key={index}
              className="cursor-pointer border border-gray-700 rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-105"
              onClick={() => openLightbox(index)}
            >
              <img
                src={src}
                alt={`Bathroom project ${index + 1}`}
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-azplumbing-yellow p-2"
          >
            <X size={32} />
          </button>
          
          <button
            onClick={() => navigateImage(-1)}
            className="absolute left-4 text-white hover:text-azplumbing-yellow p-2"
          >
            <ChevronLeft size={40} />
          </button>
          
          <img
            src={images[selectedImage]}
            alt={`Bathroom project ${selectedImage + 1}`}
            className="max-h-[80vh] max-w-[80vw] object-contain"
          />
          
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
