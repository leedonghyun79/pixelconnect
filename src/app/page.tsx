import Hero from '@/components/Hero';
import PainPoint from '@/components/PainPoint';
import WhyUs from '@/components/WhyUs';
import Maintenance from '@/components/Maintenance';
import Stats from '@/components/Stats';
import Portfolio from '@/components/Portfolio';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';

export default function Home() {
  return (
    <main>
      {/* S01 - Hero */}
      <Hero />
      {/* S02 - Pain Point */}
      <PainPoint />
      {/* S03 - Why Us */}
      <WhyUs />
      {/* S04 - Maintenance */}
      <Maintenance />
      {/* S05 - Stats */}
      <Stats />
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
    </main>
  );
}
