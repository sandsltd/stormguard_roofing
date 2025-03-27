import fs from 'fs';
import path from 'path';

export interface BusinessContent {
  name: string;
  tagline?: string;
  phone: string;
  email: string;
  address: string;
  logo: string;
  establishedYear?: string;
  description?: string;
  mission?: string;
  hero?: string;
  about?: {
    image?: string;
  };
  coreValues?: Array<{
    title: string;
    description: string;
  }>;
}

export interface Content {
  business: BusinessContent;
  theme?: {
    primaryColor?: string; // Primary brand color
    secondaryColor?: string; // Secondary brand color
    header?: {
      backgroundColor?: string;
      textColor?: string;
      linkColor?: string;
      linkHoverColor?: string;
      iconColor?: string;
    };
    footer?: {
      backgroundColor?: string;
      textColor?: string;
      linkColor?: string;
      linkHoverColor?: string;
      iconColor?: string;
      borderColor?: string;
    };
    buttons?: {
      primaryBackground?: string;
      primaryText?: string;
      secondaryBackground?: string;
      secondaryText?: string;
    };
    sections?: {
      altBackground?: string;
      cardBackground?: string;
      borderColor?: string;
    };
  };
  header?: {
    businessHours?: string;
    insuranceText?: string;
    experienceText?: string;
    showTopBar?: boolean;
    menuItems?: Array<{
      text: string;
      link: string;
    }>;
    ctaButton?: {
      text?: string;
      link?: string;
      show?: boolean;
    };
  };
  homepage: {
    premiumHero: {
      backgroundImage: string;
      title: {
        line1: string;
        line2: string;
        line3: string;
      };
      subtitle: string;
      ctaPrimary: {
        text: string;
        link: string;
      };
      ctaSecondary: {
        text: string;
        link: string;
      };
      featureBadges: string[];
    };
    introduction?: {
      title: string;
      subtitle: string;
      description: string;
      image: string;
      yearFounded: string;
      projectsCompleted: string;
      satisfaction: string;
    };
    featuresSection?: {
      title: string;
      description: string;
      ctaText?: string;
      ctaLink?: string;
    };
    servicesSection?: {
      title: string;
      description: string;
    };
    servingAreasSection?: {
      title: string;
      description: string;
    };
    serviceAreasSection?: {
      title: string;
      subtitle: string;
      description: string;
    };
    serviceAreas?: {
      name: string;
      link?: string;
    }[];
    faqSection?: {
      title: string;
      description: string;
    };
    faqs?: {
      question: string;
      answer: string;
    }[];
    gallerySection?: {
      title: string;
      description: string;
    };
    servingAreas?: Array<{
      name: string;
      description: string;
      image: string;
      tags: string[];
      ctaText?: string;
      ctaLink?: string;
    }>;
    features: Array<{
      title: string;
      description: string;
      icon?: string;
      learnMoreLink?: string;
      learnMoreText?: string;
    }>;
    services: Array<{
      title: string;
      description: string;
      icon?: string;
      buttonText?: string;
      buttonLink?: string;
    }>;
    testimonials: Array<{
      quote: string;
      author: string;
      role: string;
    }>;
  };
  about: {
    title: string;
    subtitle: string;
    heroImage: string;
    mainContent: {
      title: string;
      description: string;
      history: string;
      mission: string;
    };
    team: Array<{
      name: string;
      role: string;
      bio: string;
      image: string;
    }>;
    values: Array<{
      title: string;
      description: string;
    }>;
  };
  services: {
    hero: {
      title: string;
      subtitle: string;
      subtitle2: string;
      backgroundImage: string;
      badge: string;
      ctaPrimary: {
        text: string;
        link: string;
      };
      ctaSecondary: {
        text: string;
        link: string;
      };
    };
    services: Array<{
      title: string;
      description: string;
      icon?: string;
      buttonText?: string;
      buttonLink?: string;
    }>;
    cta: {
      title: string;
      description: string;
      buttonText: string;
      buttonLink: string;
    };
  };
  contact: {
    address: string;
    phone: string;
    email: string;
    hours: string;
    formTitle: string;
    formDescription: string;
    heroImage?: string;
    mapUrl?: string;
    formFields?: {
      name: { enabled: boolean; required: boolean; label: string; }
      email: { enabled: boolean; required: boolean; label: string; }
      phone: { enabled: boolean; required: boolean; label: string; }
      service: { enabled: boolean; required: boolean; label: string; }
      message: { enabled: boolean; required: boolean; label: string; }
      submitButtonText: string;
    };
    emailSettings?: {
      recipient: string;
      smtpHost: string;
      smtpPort: number;
      username: string;
      password: string;
      fromEmail: string;
      subject: string;
    };
  };
  socials: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  seo?: {
    global: {
      siteTitle: string;
      siteDescription: string;
      siteTitleTemplate?: string;
      defaultOgImage?: string;
      keywords?: string;
    };
    pages: {
      home?: {
        title: string;
        description: string;
        ogImage?: string;
        keywords?: string;
      };
      about?: {
        title: string;
        description: string;
        ogImage?: string;
        keywords?: string;
      };
      services?: {
        title: string;
        description: string;
        ogImage?: string;
        keywords?: string;
      };
      contact?: {
        title: string;
        description: string;
        ogImage?: string;
        keywords?: string;
      };
    };
  };
}

const contentPath = path.join(process.cwd(), 'src/data/content.json');

export async function getContent(): Promise<Content> {
  try {
    const fileContents = await fs.promises.readFile(contentPath, 'utf8');
    const content = JSON.parse(fileContents);
    
    // Ensure logo path has a leading slash
    if (content.business.logo && !content.business.logo.startsWith('/')) {
      content.business.logo = '/' + content.business.logo;
    }
    
    return content;
  } catch (error) {
    return getDefaultContent();
  }
}

export async function saveContent(content: Content): Promise<void> {
  try {
    // Ensure logo path has a leading slash
    if (content.business.logo && !content.business.logo.startsWith('/')) {
      content.business.logo = '/' + content.business.logo;
    }
    
    await fs.promises.writeFile(contentPath, JSON.stringify(content, null, 2));
  } catch (error) {
    throw error;
  }
}

function getDefaultContent(): Content {
  return {
    business: {
      name: 'Your Business Name',
      phone: '07956 530018',
      email: 'info@yourbusiness.com',
      address: '123 Business Street, City, Country',
      logo: '/images/logo.png'
    },
    theme: {
      primaryColor: '#3b82f6',
      secondaryColor: '#1e2756',
      header: {
        backgroundColor: '#1e2756',
        textColor: '#ffffff',
        linkColor: '#4B5563',
        linkHoverColor: '#3b82f6',
        iconColor: '#4B5563'
      },
      footer: {
        backgroundColor: '#1F2937',
        textColor: '#ffffff',
        linkColor: '#60A5FA',
        linkHoverColor: '#93C5FD',
        iconColor: '#60A5FA',
        borderColor: '#374151'
      },
      buttons: {
        primaryBackground: '#3b82f6',
        primaryText: '#ffffff',
        secondaryBackground: '#ffffff',
        secondaryText: '#1e2756'
      },
      sections: {
        altBackground: '#f3f4f6',
        cardBackground: '#ffffff',
        borderColor: '#e5e7eb'
      }
    },
    header: {
      businessHours: 'Mon-Fri: 8am-6pm',
      insuranceText: 'Fully Insured',
      experienceText: '5+ Years Experience',
      showTopBar: true,
      menuItems: [
        { text: 'Home', link: '/' },
        { text: 'About', link: '/about' },
        { text: 'Services', link: '/services' },
        { text: 'Areas', link: '/areas' },
        { text: 'Blog', link: '/blog' },
        { text: 'FAQ', link: '/faq' },
        { text: 'Contact', link: '/contact' }
      ],
      ctaButton: {
        text: 'Get a Free Quote',
        link: '/quote',
        show: true
      }
    },
    homepage: {
      premiumHero: {
        backgroundImage: '/images/hero.jpg',
        title: {
          line1: 'Welcome',
          line2: 'to',
          line3: 'Your Business'
        },
        subtitle: 'Professional Services You Can Trust',
        ctaPrimary: {
          text: 'Get a Free Quote',
          link: '/quote'
        },
        ctaSecondary: {
          text: 'Learn More',
          link: '/about'
        },
        featureBadges: ['Quality', 'Reliable', 'Professional']
      },
      introduction: {
        title: 'Introduction Title',
        subtitle: 'Introduction Subtitle',
        description: 'Introduction description',
        image: '/images/introduction.jpg',
        yearFounded: '2024',
        projectsCompleted: '100+',
        satisfaction: '95%'
      },
      featuresSection: {
        title: 'Features Section Title',
        description: 'Features section description',
        ctaText: 'Learn More',
        ctaLink: '/about'
      },
      servicesSection: {
        title: 'Services Section Title',
        description: 'Services section description'
      },
      servingAreasSection: {
        title: 'Serving Areas Section Title',
        description: 'Serving areas section description'
      },
      serviceAreasSection: {
        title: 'Service Areas Section Title',
        subtitle: 'Service Areas Subtitle',
        description: 'Service areas section description'
      },
      serviceAreas: [
        {
          name: 'Area 1',
          link: '/areas'
        }
      ],
      faqSection: {
        title: 'FAQ Section Title',
        description: 'FAQ section description'
      },
      faqs: [
        {
          question: 'Question 1',
          answer: 'Answer 1'
        },
        {
          question: 'Question 2',
          answer: 'Answer 2'
        }
      ],
      gallerySection: {
        title: 'Gallery Section Title',
        description: 'Gallery section description'
      },
      servingAreas: [
        {
          name: 'Area 1',
          description: 'Description of area 1',
          image: '/images/area1.jpg',
          tags: ['Tag1', 'Tag2'],
          ctaText: 'Learn More',
          ctaLink: '/areas'
        }
      ],
      features: [
        {
          title: 'Expert Team',
          description: 'Our certified professionals bring years of experience to every project, ensuring top-quality workmanship and attention to detail.',
          icon: '/images/expert-team.png',
          learnMoreLink: '/about',
          learnMoreText: 'Learn More'
        },
        {
          title: 'Quality Materials',
          description: 'We use only the highest quality materials from trusted manufacturers, providing durability and peace of mind for all our clients.',
          icon: '/images/quality-materials.png',
          learnMoreLink: '/about',
          learnMoreText: 'Learn More'
        },
        {
          title: 'Warranty',
          description: 'All our work comes with comprehensive warranty coverage, reflecting our confidence in the quality of our craftsmanship.',
          icon: '/images/warranty.png',
          learnMoreLink: '/about',
          learnMoreText: 'Learn More'
        }
      ],
      services: [
        {
          title: 'Service 1',
          description: 'Description of service 1',
          icon: '/images/service1.jpg',
          buttonText: 'Learn More',
          buttonLink: '/about'
        }
      ],
      testimonials: [
        {
          quote: 'Great service!',
          author: 'John Doe',
          role: 'Role'
        }
      ]
    },
    about: {
      title: 'About Us',
      subtitle: 'Learn more about our company',
      heroImage: '/images/about-hero.jpg',
      mainContent: {
        title: 'Our Story',
        description: 'Company description',
        history: 'Company history',
        mission: 'Our mission statement'
      },
      team: [
        {
          name: 'Team Member',
          role: 'Role',
          bio: 'Bio',
          image: '/images/team1.jpg'
        }
      ],
      values: [
        {
          title: 'Value 1',
          description: 'Description of value 1'
        }
      ]
    },
    services: {
      hero: {
        title: 'Our Services',
        subtitle: 'Professional Roofing Solutions for Every Need',
        subtitle2: 'Solutions',
        backgroundImage: '/images/roofers/roofer_installing_roofing_tiles.png',
        badge: 'EXPERT SOLUTIONS',
        ctaPrimary: {
          text: 'Get a Quote',
          link: '/contact'
        },
        ctaSecondary: {
          text: 'View All Services',
          link: '#services'
        }
      },
      services: [
        {
          title: 'Service 1',
          description: 'Description of service 1',
          icon: '/images/service1.jpg',
          buttonText: 'Learn More',
          buttonLink: '/about'
        }
      ],
      cta: {
        title: 'Ready to Get Started?',
        description: 'Contact us today',
        buttonText: 'Contact Us',
        buttonLink: '/contact'
      }
    },
    contact: {
      address: '123 Business Street, City, Country',
      phone: '07956 530018',
      email: 'info@yourbusiness.com',
      hours: 'Mon-Fri: 9am-5pm',
      formTitle: 'Contact Us',
      formDescription: 'Send us a message',
      heroImage: '/images/contact-hero.jpg',
      mapUrl: 'https://maps.google.com',
      formFields: {
        name: { enabled: true, required: true, label: 'Name' },
        email: { enabled: true, required: true, label: 'Email' },
        phone: { enabled: true, required: true, label: 'Phone' },
        service: { enabled: true, required: true, label: 'Service' },
        message: { enabled: true, required: true, label: 'Message' },
        submitButtonText: 'Send'
      },
      emailSettings: {
        recipient: 'info@yourbusiness.com',
        smtpHost: 'smtp.gmail.com',
        smtpPort: 587,
        username: 'yourbusiness@gmail.com',
        password: 'yourbusinesspassword',
        fromEmail: 'no-reply@yourbusiness.com',
        subject: 'New Contact Form Submission'
      }
    },
    socials: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com'
    },
    seo: {
      global: {
        siteTitle: 'Your Business',
        siteDescription: 'Professional services for all your roofing needs',
        keywords: 'roofing, roofing services, professional roofing, quality roofing'
      },
      pages: {
        home: {
          title: 'Home',
          description: 'Welcome to Your Business',
          keywords: 'roofing, roofing services, professional roofing, quality roofing'
        },
        about: {
          title: 'About Us',
          description: 'Learn more about our company',
          keywords: 'about, company, professional roofing'
        },
        services: {
          title: 'Services',
          description: 'Professional roofing services',
          keywords: 'roofing, roofing services, professional roofing'
        },
        contact: {
          title: 'Contact Us',
          description: 'Get in touch with Your Business',
          keywords: 'contact, roofing, professional roofing'
        }
      }
    }
  };
} 