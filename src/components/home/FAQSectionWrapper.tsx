import { Content } from '@/utils/content';
import FAQSection from './FAQSection';

interface FAQSectionWrapperProps {
  content: Content;
}

export default function FAQSectionWrapper({ content }: FAQSectionWrapperProps) {
  return (
    <FAQSection content={content} />
  );
} 