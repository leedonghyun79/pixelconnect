import { Metadata } from 'next';
import Services from '@/components/Services';
import Pricing from '@/components/Pricing';

export const metadata: Metadata = {
  title: '서비스 안내 | WEB AGENCY',
  description: '웹사이트 제작부터 쇼핑몰 구축, 유지보수까지 최상의 기술력을 제공합니다.',
};

export default function ServicesPage() {
  return (
    <main style={{ paddingTop: '80px' }}>
      <Services />
      <Pricing />
    </main>
  );
}
