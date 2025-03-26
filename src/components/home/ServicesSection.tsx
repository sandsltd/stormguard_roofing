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
    description: "Professional roofing solutions for residential and commercial properties in Dorchester and surrounding areas."
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'home': 
        return <FaHome className="w-12 h-12" />;
      case 'tools': 
        return <FaTools className="w-12 h-12" />;
      case 'search': 
        return <FaSearch className="w-12 h-12" />;
      case 'calendar': 
        return <FaCalendarAlt className="w-12 h-12" />;
      case 'rain': 
        return <FaCloudRain className="w-12 h-12" />;
      case 'alert': 
        return <FaExclamationCircle className="w-12 h-12" />;
      case 'office': 
        return <MdApartment className="w-12 h-12" />;
      case 'refresh': 
        return <FaSync className="w-12 h-12" />;
      case 'building': 
        return <FaBuilding className="w-12 h-12" />;
      case 'shield': 
        return <FaShieldAlt className="w-12 h-12" />;
      case 'phone': 
        return <FaPhone className="w-12 h-12" />;
      case 'leaf': 
        return <FaLeaf className="w-12 h-12" />;
      case 'wrench': 
        return <FaWrench className="w-12 h-12" />;
      case 'snow': 
        return <FaSnowflake className="w-12 h-12" />;
      case 'lightning': 
        return <FaBolt className="w-12 h-12" />;
      case 'wind': 
        return <FaWind className="w-12 h-12" />;
      case 'hardhat': 
        return <FaHardHat className="w-12 h-12" />;
      case 'ruler': 
        return <FaRuler className="w-12 h-12" />;
      case 'star': 
        return <FaStar className="w-12 h-12" />;
      case 'dollar': 
        return <FaDollarSign className="w-12 h-12" />;
      case 'chart': 
        return <FaChartLine className="w-12 h-12" />;
      case 'clock': 
        return <FaClock className="w-12 h-12" />;
      case 'roofing': 
        return <MdRoofing className="w-12 h-12" />;
      case 'house': 
        return <MdHouse className="w-12 h-12" />;
      case 'construction': 
        return <MdConstruction className="w-12 h-12" />;
      case 'waterdrop': 
        return <MdWaterDrop className="w-12 h-12" />;
      case 'housealt':
        return <GiHouse className="w-12 h-12" />;
      case 'window': 
        return <GiWindow className="w-12 h-12" />;
      case 'cement': 
        return <GiCementShoes className="w-12 h-12" />;
      case 'officealt': 
        return <HiOutlineOfficeBuilding className="w-12 h-12" />;
      case 'houseoutline': 
        return <BsHouseDoor className="w-12 h-12" />;
      default: 
        return <FaHome className="w-12 h-12" />;
    }
  };

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              {servicesSection.title}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {servicesSection.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.homepage.services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
              <div className="bg-cream p-8 flex justify-center">
                <div className="w-16 h-16 flex items-center justify-center text-blue-600">
                  {getIconComponent(service.icon)}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-center">{service.title}</h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <div className="text-center">
                  <a 
                    href={service.buttonLink || "/contact"} 
                    className="inline-flex items-center justify-center px-5 py-3 bg-amber-400 hover:bg-amber-500 text-gray-900 font-medium rounded-full transition-colors"
                  >
                    {service.buttonText || "Get a Free Quote"}
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
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