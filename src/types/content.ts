export interface Content {
  business: {
    name: string;
    phone: string;
    email: string;
    address: string;
    logo: string;
  };
  homepage: {
    hero: {
      title: string;
      subtitle: string;
      image: string;
    };
    features: {
      title: string;
      description: string;
      icon: string;
    }[];
    services: {
      title: string;
      description: string;
      icon: string;
    }[];
    testimonials: {
      quote: string;
      author: string;
      role: string;
    }[];
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
      image: string;
      features: string[];
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