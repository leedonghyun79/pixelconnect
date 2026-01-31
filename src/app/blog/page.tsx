import { Metadata } from 'next';
import Blog from '@/components/Blog';

export const metadata: Metadata = {
  title: '블로그 | WEB AGENCY',
  description: '최신 웹 디자인 트렌드와 제작 비하인드 스토리를 공유합니다.',
};

export default function BlogPage() {
  return (
    <main style={{ paddingTop: '80px' }}>
      <Blog />
    </main>
  );
}
