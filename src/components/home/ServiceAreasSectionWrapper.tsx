import { Content } from '@/utils/content';
import ServiceAreasSection from './ServiceAreasSection';

interface ServiceAreasSectionWrapperProps {
  content: Content;
}

export default function ServiceAreasSectionWrapper({ content }: ServiceAreasSectionWrapperProps) {
  return (
    <ServiceAreasSection content={content} />
  );
} 