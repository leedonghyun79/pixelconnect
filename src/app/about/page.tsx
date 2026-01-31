import { Metadata } from 'next';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';

export const metadata: Metadata = {
  title: '회사 소개 | WEB AGENCY',
  description: '우리는 기술로 비즈니스 가치를 창출하는 10년차 전문가 집단입니다.',
};

export default function AboutPage() {
  return (
    <main style={{ paddingTop: '80px' }}>
      <About />
      <Testimonials />
    </main>
  );
}
