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
    hero: {
      title: string;
      subtitle: string;
      image: string;
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
    title: string;
    subtitle: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
    form: {
      nameLabel: string;
      emailLabel: string;
      phoneLabel: string;
      messageLabel: string;
      submitButton: string;
    };
  };
  socials: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  theme: {
    header: {
      backgroundColor: string;
      textColor: string;
      linkColor: string;
      linkHoverColor: string;
    };
  };
} 