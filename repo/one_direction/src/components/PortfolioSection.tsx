import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const portfolioData = [
  {
    id: 1,
    title: 'THE MACALLAN 360',
    date: '2025.11',
    category: 'POP-UP',
    image: 'https://onedirection.co.kr/wp-content/uploads/2025/01/7.jpg',
    bgColor: '#af272f',
    textColor: '#ffffff',
    link: '/portfolio/the-macallan-360/'
  },
  {
    id: 2,
    title: 'HANA X G-DRAGON INSIDE THE GIANT\'S DREAM',
    date: '2025.11',
    category: 'POP-UP',
    image: 'https://onedirection.co.kr/wp-content/uploads/2024/11/표지_1.jpg',
    bgColor: '#1c8078',
    textColor: '#ffffff',
    link: '/portfolio/hana-x-g-dragon-inside-the-giants-dream/'
  },
  {
    id: 3,
    title: 'MURAKAMI TAKASHI X CASETiFY \'MURAKAMI WORLD\'',
    date: '2025.09',
    category: 'POP-UP',
    image: 'https://onedirection.co.kr/wp-content/uploads/2024/09/02.jpg',
    bgColor: '#174398',
    textColor: '#ffffff',
    link: '/portfolio/murakami-takashi-x-casetify-murakami-world/'
  }
];

export default function PortfolioSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      gsap.fromTo(
        cardsRef.current,
        { y: -400, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.4,
          ease: 'power3.out'
        }
      );
    }
  }, [isVisible]);

  return (
    <section id="oned-main3" className="oned-main">
      <div className="oned-main4-title-wrap oned-main-title-wrap revealer-section">
        <div className="oned-main-title oned-title revealer-text" style={{ opacity: 1 }}>
          <div>DARE TO</div>
          <div>QUESTION.</div>
        </div>
        <div className="desc-wrap revealer-text" style={{ opacity: 1 }}>
          이제, 당신이 물음을 가질 차례입니다.<br />
          이상한 생각으로, 이상을 향해.
        </div>
      </div>

      <div className="portfolio-card-wrap" ref={sectionRef}>
        {portfolioData.map((item, index) => (
          <article
            key={item.id}
            ref={(el) => { cardsRef.current[index] = el; }}
            className="portfolio-card"
            style={{
              '--bg-color': item.bgColor,
              '--text-color': item.textColor,
              opacity: 0, // Initial state for GSAP to pick up
            } as React.CSSProperties}
          >
            <a href={item.link} data-cursor="scale">
              <svg className="new" viewBox="0 0 126 122" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className="bubble-bg" d="M26.832 0.0130401L90.4371 0.0130401C107.584 -0.455383 126 11.7106 126 34.1689V86.6192C126 104.081 113.3 116.299 90.4371 116.299H27.486C17.6503 116.156 6.33657 120.515 3.24983 121.66C-0.281607 122.961 -0.294687 120.189 0.280807 119.057C1.58875 116.455 8.87397 109.949 9.18788 90.2234L9.18788 16.8372C9.18788 7.67696 13.491 0.0130401 26.832 0.0130401Z" fill="black" />
                <path d="M44.6636 52.2383H50.8159V67.9883H43.9019L35.4409 58.3672V67.9883H29.3003V52.2383H37.7495L44.6636 60.582V52.2383ZM53.9219 52.2617H72.3555V56.293H60.0625V58.3086H72.3555V61.9531H60.0625V63.9688H72.3555V68.0117H53.9219V52.2617ZM100.786 52.2617H107.7L100.786 68.0117H93.4848L90.0278 60.1367L86.5708 68.0117H79.27L72.3559 52.2617H79.27L82.9145 62.2344L86.5708 52.2617H93.4848L97.1294 62.2344L100.786 52.2617Z" className="bubble-text" fill="#00D8A3" />
              </svg>
              <div className="portfolio-card-title-wrap">
                <div className="portfolio-card-date font">{item.date}</div>
                <h1 className="portfolio-card-title font">{item.title}</h1>
              </div>
              <img src={item.image} crossOrigin="anonymous" alt={item.title} />
              <div className="portfolio-card-tax-wrap">
                <div className="portfolio-card-tax font">{item.category}</div>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
