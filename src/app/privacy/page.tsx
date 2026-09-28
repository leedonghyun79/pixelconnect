import type { Metadata } from 'next';
import PageTitleBanner from '@/components/PageTitleBanner/PageTitleBanner';
import LegalDocument from '@/components/LegalDocument/LegalDocument';
import PrivacyContent from '@/components/LegalDocument/PrivacyContent';

export const metadata: Metadata = {
  title: '개인정보처리방침 | 픽셀커넥트',
  description: '픽셀커넥트가 처리하는 개인정보의 항목, 목적, 보유기간과 정보주체의 권리를 안내합니다.',
  alternates: { canonical: 'https://pixelconnect.co.kr/privacy' },
};

export default function PrivacyPage() {
  return (
    <main>
      <PageTitleBanner
        eyebrow="PRIVACY"
        title="개인정보처리방침"
        sub="픽셀커넥트는 정보주체의 개인정보를 소중히 다루며 관련 법령을 준수합니다."
        breadcrumb="개인정보처리방침"
      />

      <LegalDocument>
        <PrivacyContent />
      </LegalDocument>
    </main>
  );
}
