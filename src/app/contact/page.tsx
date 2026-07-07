import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: '문의하기 | 픽셀커넥트',
  description: '홈페이지 제작, 유지보수에 대해 궁금한 점이 있으신가요? 부담 없이 무료 상담을 신청해보세요.',
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="CONTACT"
        title="지금 어떤 고민이 있으신가요?"
        sub="부담 없이 먼저 물어보세요. 견적만 확인해도 괜찮습니다. 평균 1시간 이내 응답합니다."
        breadcrumb="문의하기"
      />

      <ContactForm />
    </main>
  );
}
