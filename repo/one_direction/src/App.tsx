import { useEffect } from 'react';
import Header from './components/Header.tsx';
import HeroSection from './components/HeroSection.tsx';
import VideoSection from './components/VideoSection.tsx';
import AboutSection from './components/AboutSection.tsx';
import PortfolioSection from './components/PortfolioSection.tsx';
import GallerySection from './components/GallerySection.tsx';
import Footer from './components/Footer.tsx';
import useLenis from './hooks/useLenis.ts';
import useCursor from './hooks/useCursor.ts';

function App() {
  useLenis();
  useCursor();

  useEffect(() => {
    // Add intro class to body
    document.body.classList.add('intro', 'page-home');

    // Remove page transition after load
    const timer = setTimeout(() => {
      const transition = document.querySelector('.page-transition');
      if (transition) {
        (transition as HTMLElement).style.setProperty('--hole-radius', '120vmax');
        (transition as HTMLElement).style.opacity = '0';
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Page Transition */}
      <div className="page-transition" style={{ '--hole-radius': '0vmax', opacity: 1 } as React.CSSProperties}>
        <div className="load-logo-wrap">
          <svg viewBox="0 0 126 122" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M26.832 0.0130401L90.4371 0.0130401C107.584 -0.455383 126 11.7106 126 34.1689V86.6192C126 104.081 113.3 116.299 90.4371 116.299H27.486C17.6503 116.156 6.33657 120.515 3.24983 121.66C-0.281607 122.961 -0.294687 120.189 0.280807 119.057C1.58875 116.455 8.87397 109.949 9.18788 90.2234L9.18788 16.8372C9.18788 7.67696 13.491 0.0130401 26.832 0.0130401Z" fill="black" />
          </svg>
          <div className="loader"></div>
        </div>
      </div>

      {/* Noise Background */}
      <div className="noise" style={{ backgroundImage: "url('https://onedirection.co.kr/wp-content/themes/oned2025/assets/noise.gif')" }}></div>

      {/* Custom Cursor */}
      <div className="cursor"></div>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="version2">
        <HeroSection />
        <VideoSection />
        <div className="hero-cont-wrap revealer-section">
          <div className="desc-wrap revealer-text" style={{ textAlign: 'center' }}>
            우리는 이상한 사람들입니다.<br />
            "이게 정말 가능한가요?"<br />
            이러한 물음들이 즐거운 우리는<br />
            이상한 생각을 하는 사람들입니다.
          </div>
        </div>
        <AboutSection />
        <PortfolioSection />
        <GallerySection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
