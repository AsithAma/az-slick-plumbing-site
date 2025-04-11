
import { useEffect, useRef } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

// Add type declaration for global initMap function
declare global {
  interface Window {
    initMap: () => void;
  }
}

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create map after the component mounts
    if (!mapRef.current) return;
    
    // Create a script element to load the Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?callback=initMap`;
    script.async = true;
    script.defer = true;
    
    // Define the callback function
    window.initMap = () => {
      const location = { lat: 51.5217, lng: -3.1748 }; // A-Z Heating & Plumbing, Heol Hir, Llanishen, Cardiff
      const map = new google.maps.Map(mapRef.current!, {
        center: location,
        zoom: 15,
        styles: [
          {
            "featureType": "all",
            "elementType": "geometry.fill",
            "stylers": [{ "weight": "2.00" }]
          },
          {
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }]
          },
          {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{ "color": "#f2f2f2" }, { "lightness": 20 }]
          },
          {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }]
          },
          {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }]
          },
          {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }]
          },
          {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }]
          },
          {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }]
          },
          {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{ "color": "#d3eef7" }, { "lightness": 17 }]
          }
        ]
      });

      // Create a custom marker
      const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: "A-Z Heating & Plumbing",
        animation: google.maps.Animation.DROP,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: "#eee106",
          fillOpacity: 1,
          strokeColor: "#1A1F2C",
          strokeWeight: 2,
          scale: 10,
        }
      });

      // Add info window
      const infoContent = `
        <div style="padding: 10px; text-align: center;">
          <h4 style="font-weight: bold; margin-bottom: 5px;">A-Z Heating & Plumbing</h4>
          <p style="margin: 0;">Heol Hir, Llanishen, Cardiff CF14 5AA, UK</p>
        </div>
      `;

      const infoWindow = new google.maps.InfoWindow({
        content: infoContent
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      // Open info window by default
      infoWindow.open(map, marker);
    };

    // Append the script to the document
    document.head.appendChild(script);

    return () => {
      window.initMap = undefined;
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
            id="map" 
            className="w-full h-full"
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
