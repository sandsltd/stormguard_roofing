export interface Content {
  business: {
    name: string;
    phone: string;
    email: string;
    address: string;
    logo: string;
    tagline?: string;
  };
  homepage: {
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
    faqSection?: {
      title: string;
      description: string;
    };
    gallerySection?: {
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
    servingAreas?: {
      name: string;
      description: string;
      image: string;
      tags: string[];
      ctaText?: string;
      ctaLink?: string;
    }[];
    faqs?: {
      question: string;
      answer: string;
    }[];
    features: {
      title: string;
      description: string;
      icon?: string;
      learnMoreLink?: string;
      learnMoreText?: string;
    }[];
    services: {
      title: string;
      description: string;
      icon?: string;
      buttonText?: string;
      buttonLink?: string;
    }[];
    testimonials: {
      quote: string;
      author: string;
      role: string;
    }[];
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
    team: {
      name: string;
      role: string;
      bio: string;
      image: string;
    }[];
    values: {
      title: string;
      description: string;
    }[];
  };
  services: {
    hero: {
      title: string;
      subtitle: string;
    };
    services: {
      title: string;
      description: string;
      icon?: string;
      buttonText?: string;
      buttonLink?: string;
    }[];
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
    emailSettings?: {
      recipient: string;
      smtpHost: string;
      smtpPort: number;
      username: string;
      password: string;
      fromEmail: string;
      subject: string;
    };
    formFields?: {
      name: { enabled: boolean; required: boolean; label: string; }
      email: { enabled: boolean; required: boolean; label: string; }
      phone: { enabled: boolean; required: boolean; label: string; }
      service: { enabled: boolean; required: boolean; label: string; }
      message: { enabled: boolean; required: boolean; label: string; }
      submitButtonText: string;
    };
  };
  socials: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  theme: {
    primaryColor?: string;
    secondaryColor?: string;
    header?: {
      backgroundColor: string;
      textColor: string;
      linkColor: string;
      linkHoverColor: string;
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
} 