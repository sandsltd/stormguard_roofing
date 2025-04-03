import React from 'react';
import { Content } from '@/utils/content';
import { 
  FaHome, FaTools, FaSearch, FaCalendarAlt, FaCloudRain, 
  FaExclamationCircle, FaBuilding, FaSync, FaShieldAlt, 
  FaPhone, FaLeaf, FaWrench, FaSnowflake, FaBolt, 
  FaWind, FaHardHat, FaRuler, FaStar, FaDollarSign,
  FaChartLine, FaClock
} from 'react-icons/fa';
import { MdApartment, MdRoofing, MdHouse, MdConstruction, MdWaterDrop } from 'react-icons/md';
import { GiHouse, GiWindow, GiCementShoes } from 'react-icons/gi';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { BsHouseDoor } from 'react-icons/bs';

interface ServicesSectionProps {
  content: Content;
}

export default function ServicesSection({ content }: ServicesSectionProps) {
  // Initialize servicesSection with default values if it doesn't exist
  const servicesSection = content.homepage.servicesSection || {
    title: "Our Services",
    description: "Professional roofing solutions for residential and commercial properties."
  };

  // Use primary color from theme or default to blue
  const primaryColor = content.theme?.primaryColor || '#3b82f6';
  const secondaryColor = content.theme?.secondaryColor || '#1e2756';
  
  const getIconComponent = (iconName?: string) => {
    switch (iconName) {
      case 'home': return <FaHome size={20} />;
      case 'tools': return <FaTools size={20} />;
      case 'search': return <FaSearch size={20} />;
      case 'calendar': return <FaCalendarAlt size={20} />;
      case 'rain': return <FaCloudRain size={20} />;
      case 'alert': return <FaExclamationCircle size={20} />;
      case 'office': return <MdApartment size={20} />;
      case 'refresh': return <FaSync size={20} />;
      case 'building': return <FaBuilding size={20} />;
      case 'shield': return <FaShieldAlt size={20} />;
      case 'phone': return <FaPhone size={20} />;
      case 'leaf': return <FaLeaf size={20} />;
      case 'wrench': return <FaWrench size={20} />;
      case 'snow': return <FaSnowflake size={20} />;
      case 'lightning': return <FaBolt size={20} />;
      case 'wind': return <FaWind size={20} />;
      case 'hardhat': return <FaHardHat size={20} />;
      case 'ruler': return <FaRuler size={20} />;
      case 'star': return <FaStar size={20} />;
      case 'dollar': return <FaDollarSign size={20} />;
      case 'chart': return <FaChartLine size={20} />;
      case 'clock': return <FaClock size={20} />;
      case 'roofing': return <MdRoofing size={20} />;
      case 'house': return <MdHouse size={20} />;
      case 'construction': return <MdConstruction size={20} />;
      case 'waterdrop': return <MdWaterDrop size={20} />;
      case 'housealt': return <GiHouse size={20} />;
      case 'window': return <GiWindow size={20} />;
      case 'cement': return <GiCementShoes size={20} />;
      case 'officealt': return <HiOutlineOfficeBuilding size={20} />;
      case 'houseoutline': return <BsHouseDoor size={20} />;
      default: return <FaHome size={20} />;
    }
  };
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{servicesSection.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {servicesSection.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.homepage.services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                {/* Service Icon */}
                <div className="mb-4">
                  <span className="inline-block p-3 rounded-lg bg-red-50 text-red-600">
                    {service.icon && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    )}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>

                {/* Learn More Link */}
                <a
                  href={service.buttonLink || "/contact"}
                  className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
                >
                  {service.buttonText || "Get a Free Quote"}
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 