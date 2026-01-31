import { Metadata } from 'next';
import FAQ from '@/components/FAQ';

export const metadata: Metadata = {
  title: '자주 묻는 질문 | WEB AGENCY',
  description: '제작 일정, 비용, 유지보수 등 궁금한 점을 여기서 해결하세요.',
};

export default function FAQPage() {
  return (
    <main style={{ paddingTop: '80px' }}>
      <FAQ />
    </main>
  );
}
