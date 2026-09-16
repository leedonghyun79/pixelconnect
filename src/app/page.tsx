import Hero from './_components/Hero/Hero';
import PainPoint from './_components/PainPoint/PainPoint';
import WhyUs from './_components/WhyUs/WhyUs';
import Portfolio from '@/components/Portfolio/Portfolio';
import Process from './_components/Process/Process';
import Testimonials from './_components/Testimonials/Testimonials';
import Pricing from './_components/Pricing/Pricing';
import FAQ from './_components/FAQ/FAQ';
import FinalCTA from '@/components/FinalCTA/FinalCTA';

export default function Home() {
  return (
    <main>
      {/* S01 - Hero */}
      <Hero />
      
      {/* 
        Hero 섹션이 position: sticky로 고정되어 있으므로, 
        이후 섹션들이 스크롤 시 Hero 위를 덮으면서 올라오도록 처리합니다.
        top 부분에 부드러운 그림자를 주어 입체감을 극대화합니다.
      */}
      <div 
        style={{ 
          position: 'relative', 
          zIndex: 10,
          backgroundColor: '#FAFAFA',
          borderRadius: '48px 48px 0 0',
          overflow: 'hidden',
          boxShadow: '0 -20px 50px rgba(13, 13, 62, 0.06), 0 -4px 15px rgba(13, 13, 62, 0.03)'
        }}
      >
        {/* S02 - Pain Point */}
        <PainPoint />
        {/* S03 - Why Us & Maintenance (Combined) */}
        <WhyUs />
        {/* S06 - Portfolio */}
        <Portfolio />
        {/* S07 - Process */}
        <Process />
        {/* S08 - Testimonials */}
        <Testimonials />
        {/* S09 - Pricing */}
        <Pricing />
        {/* S10 - FAQ */}
        <FAQ />
        {/* S11 - Final CTA */}
        <FinalCTA />
      </div>
    </main>
  );
}
