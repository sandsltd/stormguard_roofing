import { Content } from '@/types/content';
import ServiceAreasSection from './ServiceAreasSection';

interface ServiceAreasSectionWrapperProps {
  content: Content;
}

export default function ServiceAreasSectionWrapper({ content }: ServiceAreasSectionWrapperProps) {
  return (
    <ServiceAreasSection content={content} />
  );
} 