export interface Content {
  business: {
    name: string;
    phone: string;
    email: string;
    address: string;
    logo: string;
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
  services: Array<{
    title: string;
    description: string;
    image: string;
    features: string[];
  }>;
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