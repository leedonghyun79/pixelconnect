export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid #eee',
      padding: '80px 0',
      color: '#666',
      fontSize: '0.75rem',
      background: '#fff',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      fontWeight: 600
    }}>
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '40px' }}>
          <div>
            <h3 style={{ color: '#000', marginBottom: '20px', fontSize: '0.85rem', fontWeight: 800 }}>WEB AGENCY</h3>
            <p style={{ marginBottom: '5px' }}>contact@webagency.com</p>
            <p>010-0000-0000</p>
          </div>
          <div style={{ display: 'flex', gap: '40px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="#" style={{ color: 'inherit' }}>Privacy</a>
              <a href="#" style={{ color: 'inherit' }}>Terms</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="#" style={{ color: 'inherit' }}>Instagram</a>
              <a href="#" style={{ color: 'inherit' }}>Behance</a>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '80px', display: 'flex', justifyContent: 'space-between', opacity: 0.5, fontSize: '0.65rem' }}>
          <p>&copy; 2026 WEB AGENCY. ALL RIGHTS RESERVED.</p>
          <p>LOCATED IN BUCHEON, SOUTH KOREA</p>
        </div>
      </div>
    </footer>
  );
}
