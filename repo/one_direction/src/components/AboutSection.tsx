export default function AboutSection() {
  return (
    <section id="oned-main2" className="oned-main revealer-section">
      <div className="oned-client-marquee">
        <ul className="oned-client-marquee-inner">
          <li className="oned-client-marquee-img" style={{ position: 'relative' }}>
            <img src="https://onedirection.co.kr/wp-content/themes/oned2025/assets/clients.webp" alt="clients" />
            <img src="https://onedirection.co.kr/wp-content/themes/oned2025/assets/clients.webp" alt="clients" />
          </li>
        </ul>
      </div>

      <div className="oned-main2-title-wrap oned-main-title-wrap">
        <div className="oned-main-title oned-title revealer-text font" style={{ opacity: 1 }}>
          <div>CURIOSITY</div>
          <div>LEADS</div>
          <div>INNOVATION.</div>
        </div>
        <div className="desc-wrap revealer-text font" style={{ opacity: 1 }}>
          우리는 질문을 멈추지 않고,<br />
          누구도 시도하지 않은 생각 속에서<br />
          새로운 가치를 발견합니다.
        </div>
      </div>
    </section>
  );
}
