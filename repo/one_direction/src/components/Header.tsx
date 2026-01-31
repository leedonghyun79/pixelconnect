export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li className="link-wrap pc-only">
            <a href="#oned-main2" data-cursor="scale">
              <div className="link">
                <div className="circle"></div>
              </div>
              <span className="font">ABOUT</span>
            </a>
          </li>
          <li className="m-menu-open m-only">
            <a href="#">
              <span></span>
            </a>
          </li>
          <li className="link-wrap pc-only">
            <a href="/portfolio/" data-cursor="scale">
              <div className="link">
                <div className="circle"></div>
              </div>
              <span className="font">WORK</span>
            </a>
          </li>
          <li id="logo-wrap">
            <a href="/home" className="">
              <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="oned-symbol" style={{ opacity: 1 }}>
                <path d="M272.908 37.0355L99.2556 37.0355C62.8326 37.0355 51.0844 57.9249 51.0844 82.8929L51.0844 282.921C50.2274 336.687 30.3375 354.42 26.7666 361.513C25.1955 364.598 25.2312 372.153 34.8726 368.606C43.2998 365.485 74.188 353.604 101.041 353.994H272.908C335.327 353.994 370 320.692 370 273.096V130.133C370 68.9194 319.722 35.7588 272.908 37.0355ZM211.203 280.154C163.353 280.154 124.537 241.603 124.537 194.078C124.537 146.554 163.353 108.003 211.203 108.003C259.053 108.003 297.868 146.554 297.868 194.078C297.868 241.603 259.053 280.154 211.203 280.154Z" fill="#F5FFEA" />
              </svg>
            </a>
          </li>
          <li className="link-wrap pc-only">
            <a href="/contact/" data-cursor="scale">
              <div className="link">
                <div className="circle"></div>
              </div>
              <span className="font">CONTACT</span>
            </a>
          </li>
          <li>
            <a href="/en/" className="lang-wrap">
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 10H6.66667M2.5 10C2.5 11.9891 3.29018 13.8968 4.6967 15.3033C6.10322 16.7098 8.01088 17.5 10 17.5M2.5 10C2.5 8.01088 3.29018 6.10322 4.6967 4.6967C6.10322 3.29018 8.01088 2.5 10 2.5M6.66667 10H13.3333M6.66667 10C6.66667 14.1417 8.15833 17.5 10 17.5M6.66667 10C6.66667 5.85833 8.15833 2.5 10 2.5M10 17.5C11.8417 17.5 13.3333 14.1417 13.3333 10M10 17.5C11.9891 17.5 13.8968 16.7098 15.3033 15.3033C16.7098 13.8968 17.5 11.9891 17.5 10M10 2.5C11.8417 2.5 13.3333 5.85833 13.3333 10M10 2.5C11.9891 2.5 13.8968 3.29018 15.3033 4.6967C16.7098 6.10322 17.5 8.01088 17.5 10M13.3333 10H17.5" stroke="black" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              EN
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
