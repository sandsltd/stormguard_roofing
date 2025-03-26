import React from 'react';
import { Content } from '@/types/content';
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
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div 
                className="h-3" 
                style={{ backgroundColor: primaryColor }}
              ></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                    style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                  >
                    {getIconComponent(service.icon)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <div className="pt-2 mt-auto">
                  <a 
                    href={service.buttonLink || "/contact"} 
                    className="inline-block px-5 py-2 rounded-lg text-white text-sm font-medium transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {service.buttonText || "Learn More"}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 