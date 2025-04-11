
import { Phone, Mail, MapPin } from 'lucide-react';
import { useEffect, useRef } from 'react';

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Google Maps
    const initMap = () => {
      if (mapRef.current) {
        // A-Z Heating & Plumbing location coordinates
        const location = { lat: 51.5179, lng: -3.1925 }; // Cardiff coordinates
        const mapOptions = {
          center: location,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        // Create the map
        const map = new google.maps.Map(mapRef.current, mapOptions);

        // Add marker for A-Z Heating & Plumbing
        new google.maps.Marker({
          position: location,
          map: map,
          title: 'A-Z Heating & Plumbing'
        });
      }
    };

    // Load Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC2pyiVh9hyJzPmzXxLHMZI-QGTy56VtXA&callback=initGoogleMap`;
    script.async = true;
    script.defer = true;
    window.initGoogleMap = initMap;
    document.head.appendChild(script);

    return () => {
      // Clean up
      delete window.initGoogleMap;
      document.head.removeChild(script);
    };
  }, []);

  return (
    <section className="relative py-12 md:py-0">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Map Container */}
        <div className="h-[400px] md:h-[600px] relative">
          <div 
            ref={mapRef} 
            className="w-full h-full"
            aria-label="Google Map showing A-Z Heating & Plumbing location"
          ></div>
        </div>

        {/* Contact Information */}
        <div className="bg-azplumbing-blue text-white flex items-center">
          <div className="p-12 lg:p-20">
            <h3 className="text-3xl font-bold mb-8 relative">
              <span className="text-azplumbing-yellow">Find</span> Us
              <span className="block w-16 h-1 bg-azplumbing-yellow mt-4"></span>
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin size={24} className="text-azplumbing-yellow mt-1 flex-shrink-0" />
                <p className="text-lg">
                  A-Z Heating & Plumbing<br />
                  Heol Hir, Llanishen, Cardiff CF14 5AA, UK
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Phone size={24} className="text-azplumbing-yellow flex-shrink-0" />
                <a href="tel:07912555608" className="text-lg hover:text-azplumbing-yellow transition-colors">
                  07912 555608
                </a>
              </div>

              <div className="flex items-center gap-4">
                <Mail size={24} className="text-azplumbing-yellow flex-shrink-0" />
                <a href="mailto:info@azheatingplumbing.co.uk" className="text-lg hover:text-azplumbing-yellow transition-colors">
                  info@azheatingplumbing.co.uk
                </a>
              </div>
            </div>

            <div className="mt-12">
              <p className="mb-4 text-lg font-medium">Opening Hours</p>
              <table className="w-full text-left">
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-2">Monday - Friday</td>
                    <td className="py-2">8:00 AM - 5:00 PM</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">Saturday</td>
                    <td className="py-2">9:00 AM - 2:00 PM</td>
                  </tr>
                  <tr>
                    <td className="py-2">Sunday</td>
                    <td className="py-2">Closed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
