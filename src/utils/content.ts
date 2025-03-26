import fs from 'fs';
import path from 'path';

export interface BusinessContent {
  name: string;
  tagline?: string;
  phone: string;
  email: string;
  address: string;
  logo: string;
}

export interface Content {
  business: BusinessContent;
  theme?: {
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
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    features: Array<{
      title: string;
      description: string;
    }>;
    services: Array<{
      title: string;
      description: string;
      image: string;
    }>;
    testimonials: Array<{
      name: string;
      text: string;
      rating: number;
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
    };
    services: Array<{
      title: string;
      description: string;
      image: string;
      features: string[];
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
  };
  socials: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
}

const contentPath = path.join(process.cwd(), 'content/content.json');

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
      heroTitle: 'Welcome to Your Business',
      heroSubtitle: 'Professional Services You Can Trust',
      heroImage: '/images/hero.jpg',
      features: [
        {
          title: 'Quality Service',
          description: 'We provide top-notch service to all our customers.'
        }
      ],
      services: [
        {
          title: 'Service 1',
          description: 'Description of service 1',
          image: '/images/service1.jpg'
        }
      ],
      testimonials: [
        {
          name: 'John Doe',
          text: 'Great service!',
          rating: 5
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
        subtitle: 'What we offer'
      },
      services: [
        {
          title: 'Service 1',
          description: 'Description of service 1',
          image: '/images/service1.jpg',
          features: ['Feature 1', 'Feature 2']
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
      formDescription: 'Send us a message'
    },
    socials: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com'
    }
  };
} 