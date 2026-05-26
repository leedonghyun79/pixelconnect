'use client';
import styles from './contact.module.css';

export default function ContactForm() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left: Info */}
          <div className={styles.info}>
            <h3 className={styles.infoTitle}>상담 프로세스</h3>
            <div className={styles.steps}>
              {[
                { num: '01', title: '문의 접수', desc: '아래 양식 또는 카카오톡으로 문의해주세요.' },
                { num: '02', title: '무료 상담', desc: '요구사항과 목표를 파악하고 맞춤 제안을 드립니다.' },
                { num: '03', title: '견적 확정', desc: '투명한 견적을 안내드리며, 추가 비용은 없습니다.' },
              ].map((step, i) => (
                <div key={i} className={styles.step}>
                  <span className={styles.stepNum}>{step.num}</span>
                  <div>
                    <h4 className={styles.stepTitle}>{step.title}</h4>
                    <p className={styles.stepDesc}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.contactMethods}>
              <div className={styles.method}>
                <span className={styles.methodLabel}>이메일</span>
                <a href="mailto:hello@pixelconnect.co.kr" className={styles.methodValue}>
                  hello@pixelconnect.co.kr
                </a>
              </div>
              <div className={styles.method}>
                <span className={styles.methodLabel}>전화</span>
                <span className={styles.methodValue}>010-0000-0000</span>
              </div>
              <div className={styles.method}>
                <span className={styles.methodLabel}>카카오톡</span>
                <a href="#" className={styles.methodValue}>
                  카카오 채널 문의하기 →
                </a>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className={styles.formWrap}>
            <form className={styles.form} onSubmit={e => e.preventDefault()}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>이름 *</label>
                  <input type="text" placeholder="홍길동" className={styles.input} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>이메일 *</label>
                  <input type="email" placeholder="example@email.com" className={styles.input} />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>연락처</label>
                  <input type="tel" placeholder="010-0000-0000" className={styles.input} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>필요한 서비스</label>
                  <select className={styles.select}>
                    <option value="">선택해주세요</option>
                    <option value="web">웹사이트 제작</option>
                    <option value="shop">쇼핑몰 구축</option>
                    <option value="landing">랜딩페이지</option>
                    <option value="maintain">유지보수·운영</option>
                    <option value="etc">기타</option>
                  </select>
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>프로젝트 설명</label>
                <textarea
                  placeholder="프로젝트에 대해 자유롭게 설명해주세요. 참고 사이트, 원하는 기능, 예산 등 어떤 내용이든 괜찮습니다."
                  className={styles.textarea}
                  rows={6}
                />
              </div>
              <button type="submit" className={styles.submitBtn}>
                무료 상담 신청하기 →
              </button>
              <p className={styles.note}>
                * 상담은 무료이며, 영업일 기준 24시간 이내 회신드립니다.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
