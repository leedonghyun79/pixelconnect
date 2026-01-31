export default function VideoSection() {
  return (
    <section className="oned-video-wrap">
      <video className="oned-video" playsInline autoPlay muted loop poster="https://onedirection.co.kr/wp-content/themes/oned2025/assets/main3.webp">
        <source src="https://onedirection.co.kr/wp-content/themes/oned2025/assets/main3.mp4" type="video/mp4" />
      </video>
    </section>
  );
}
