import { Metadata } from 'next';
import Projects from '@/components/Projects';

export const metadata: Metadata = {
  title: '포트폴리오 | WEB AGENCY',
  description: '우리가 만든 성공적인 비즈니스 결과물들을 확인해보세요.',
};

export default function ProjectsPage() {
  return (
    <main style={{ paddingTop: '80px' }}>
      <Projects />
    </main>
  );
}
