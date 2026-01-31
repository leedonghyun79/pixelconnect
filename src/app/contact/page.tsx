import { Metadata } from 'next';
import Contact from '@/components/Contact';

export const metadata: Metadata = {
  title: '프로젝트 문의 | WEB AGENCY',
  description: '새로운 프로젝트를 시작할 준비가 되셨나요? 지금 바로 상담받아보세요.',
};

export default function ContactPage() {
  return (
    <main style={{ paddingTop: '80px' }}>
      <Contact />
    </main>
  );
}
