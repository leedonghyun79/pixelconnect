import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import WhyUs from '@/components/WhyUs';
import Maintenance from '@/components/Maintenance';
import Process from '@/components/Process';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';

export const metadata: Metadata = {
  title: '서비스 | 픽셀커넥트',
  description: '브랜드 맞춤형 디자인, 합리적 견적, 납품 후에도 끊기지 않는 유지보수까지. 픽셀커넥트의 웹사이트 제작 서비스를 확인하세요.',
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="SERVICES"
        title="브랜드의 성장을 함께 만드는 서비스"
        sub="기획부터 디자인, 개발, 유지보수까지 — 홈페이지가 필요한 순간부터 운영이 안정될 때까지 책임집니다."
        breadcrumb="서비스"
      />

      {/* 서비스 상세 항목 */}
      <ServiceDetail />

      {/* Why Us */}
      <WhyUs />

      {/* Maintenance */}
      <Maintenance />

      {/* Process */}
      <Process />

      {/* Pricing */}
      <Pricing />

      {/* FAQ */}
      <FAQ />

      {/* CTA */}
      <FinalCTA />
    </main>
  );
}

/* ── 서비스 상세 항목 (이 페이지에서만 사용) ── */
function ServiceDetail() {
  const services = [
    {
      icon: '🌐',
      title: '웹사이트 제작',
      desc: '브랜드 아이덴티티를 반영한 맞춤형 웹사이트를 제작합니다. 반응형 디자인으로 PC·모바일 어디서든 최적의 경험을 제공합니다.',
      features: ['맞춤형 디자인', '반응형 레이아웃', 'SEO 최적화', '빠른 로딩 속도'],
    },
    {
      icon: '🛒',
      title: '쇼핑몰 구축',
      desc: '아임웹 기반의 쇼핑몰을 구축합니다. 상품 관리, 결제 시스템, 재고 관리까지 운영에 필요한 모든 기능을 설정합니다.',
      features: ['상품 관리 시스템', '결제 연동', '재고/주문 관리', '프로모션 설정'],
    },
    {
      icon: '📄',
      title: '랜딩페이지',
      desc: '광고와 연계된 고전환 랜딩페이지를 제작합니다. 명확한 CTA와 설득 구조로 문의 전환율을 높입니다.',
      features: ['전환 최적화 구조', '광고 연계 설계', 'A/B 테스트 지원', '빠른 제작 (1주)'],
    },
    {
      icon: '⚙️',
      title: '유지보수·운영',
      desc: '런칭 후에도 사이트 수정, 오류 처리, 콘텐츠 업데이트를 지속적으로 지원합니다. 홈페이지가 살아있는 동안 함께합니다.',
      features: ['텍스트·이미지 수정', '기능 오류 처리', '정기 점검', '운영 컨설팅'],
    },
  ];

  return (
    <section style={{ background: 'var(--navy-pale)', padding: '80px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {services.map((s, i) => (
            <div
              key={i}
              style={{
                background: '#fff',
                borderRadius: 24,
                padding: '36px 28px',
                border: '1px solid var(--border-default)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: 16 }}>{s.icon}</span>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 20 }}>{s.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {s.features.map((f, fi) => (
                  <span
                    key={fi}
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 500,
                      color: 'var(--navy-muted)',
                      background: 'var(--navy-pale)',
                      padding: '4px 12px',
                      borderRadius: 100,
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
