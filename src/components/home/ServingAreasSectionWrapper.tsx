import { Content } from '@/utils/content';
import ServingAreasSection from './ServingAreasSection';

interface ServingAreasSectionWrapperProps {
  content: Content;
}

export default function ServingAreasSectionWrapper({ content }: ServingAreasSectionWrapperProps) {
  return (
    <ServingAreasSection content={content} />
  );
} 