const images = [
  'image1.webp', 'image2.webp', 'image3.webp', 'image4.webp',
  'image5.webp', 'image6.webp', 'image7.webp', 'image8.webp',
  'image9.webp', 'image10.webp', 'image11.webp', 'image12.webp',
  'image13.webp', 'image14.webp', 'image15.webp', 'image16.webp'
];

export default function GallerySection() {
  const baseUrl = 'https://onedirection.co.kr/wp-content/themes/oned2025/assets/';

  return (
    <section id="oned-main5" className="oned-main revealer-section">
      <div className="medias">
        {images.map((img, index) => (
          <img key={index} src={`${baseUrl}${img}`} alt="" />
        ))}
      </div>
      <div className="scroll">
        <div className="revealer-text-wrap">
          <div className="fixed-sticker">
            <img src={`${baseUrl}image8.webp`} alt="" style={{ transform: 'scale(0, 0)' }} />
            <img src={`${baseUrl}image1.webp`} alt="" style={{ transform: 'scale(0, 0)' }} />
            <img src={`${baseUrl}image14.webp`} alt="" style={{ transform: 'scale(0, 0)' }} />
          </div>
          <div className="revealer-text" style={{ opacity: 1 }}>
            <div>We create</div>
            <div>extraordinary.</div>
          </div>
          <a href="/portfolio/" className="more-link revealer-text" style={{ opacity: 1 }}>
            <span></span>
            <span>EXPLORE OUR WORK</span>
          </a>
        </div>
      </div>
    </section>
  );
}
