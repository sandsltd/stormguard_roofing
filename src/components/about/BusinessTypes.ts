import { BusinessContent } from '@/utils/content';

export interface ValueItem {
  title: string;
  description: string;
}

export interface ExtendedBusinessContent extends BusinessContent {
  establishedYear?: string;
  description?: string;
  mission?: string;
  hero?: string;
  businessHours?: string;
  about?: {
    image?: string;
  };
  team?: TeamMember[];
  coreValues?: ValueItem[];
}

export interface TeamMember {
  name: string;
  position: string;
  bio: string;
  image?: string;
} 