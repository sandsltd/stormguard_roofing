import fs from 'fs';
import path from 'path';

const contentFilePath = path.join(process.cwd(), 'src/data/content.json');

// Type for the content structure
export interface BusinessContent {
  name: string;
  tagline: string;
  description: string;
  logo: string;
  phone: string;
  email: string;
  address: string;
}

export interface HeroSection {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonUrl: string;
  image: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  name: string;
  position: string;
  comment: string;
  image: string;
  rating: number;
}

export interface TeamMember {
  name: string;
  position: string;
  bio: string;
  image: string;
}

export interface AboutContent {
  title: string;
  content: string;
  mission: string;
  vision: string;
  team: TeamMember[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
}

export interface ContactInfo {
  title: string;
  subtitle: string;
  formFields: string[];
}

export interface SocialMedia {
  platform: string;
  url: string;
  icon: string;
}

export interface Content {
  business: BusinessContent;
  homepage: {
    hero: HeroSection;
    features: Feature[];
    testimonials: Testimonial[];
  };
  about: AboutContent;
  services: Service[];
  contact: ContactInfo;
  socials: SocialMedia[];
}

/**
 * Read content from content.json file
 */
export const getContent = (): Content => {
  try {
    const contentFile = fs.readFileSync(contentFilePath, 'utf8');
    return JSON.parse(contentFile) as Content;
  } catch (error) {
    console.error('Error reading content file:', error);
    throw new Error('Failed to read content data');
  }
};

/**
 * Write content to content.json file
 */
export const updateContent = async (content: Content): Promise<void> => {
  try {
    const contentJson = JSON.stringify(content, null, 2);
    fs.writeFileSync(contentFilePath, contentJson, 'utf8');
  } catch (error) {
    console.error('Error writing content file:', error);
    throw new Error('Failed to update content data');
  }
};

/**
 * Update a specific section of the content
 */
export const updateContentSection = async <K extends keyof Content>(
  section: K,
  data: Content[K]
): Promise<void> => {
  try {
    const content = getContent();
    content[section] = data;
    await updateContent(content);
  } catch (error) {
    console.error(`Error updating ${String(section)} section:`, error);
    throw new Error(`Failed to update ${String(section)} section`);
  }
}; 