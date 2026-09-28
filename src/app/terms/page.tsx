import type { Metadata } from 'next';
import PageTitleBanner from '@/components/PageTitleBanner/PageTitleBanner';
import LegalDocument from '@/components/LegalDocument/LegalDocument';
import TermsContent from '@/components/LegalDocument/TermsContent';

export const metadata: Metadata = {
  title: '이용약관 | 픽셀커넥트',
  description: '픽셀커넥트 웹사이트 서비스의 이용조건과 운영에 관한 제반 사항을 안내합니다.',
  alternates: { canonical: 'https://pixelconnect.co.kr/terms' },
};

export default function TermsPage() {
  return (
    <main>
      <PageTitleBanner
        eyebrow="TERMS"
        title="이용약관"
        sub="픽셀커넥트 서비스의 이용조건과 운영에 관한 사항입니다."
        breadcrumb="이용약관"
      />

      <LegalDocument>
        <TermsContent />
      </LegalDocument>
    </main>
  );
}
