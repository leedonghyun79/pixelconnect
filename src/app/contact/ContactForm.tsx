'use client';
import { useCallback, useState } from 'react';
import styles from './contact.module.css';
import TurnstileWidget from '@/components/TurnstileWidget';
import { submitInquiry } from '@/lib/inquiry';

type Status = 'idle' | 'sending' | 'ok' | 'error';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const [company, setCompany] = useState(''); // 허니팟
  const [token, setToken] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const onToken = useCallback((t: string) => setToken(t), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      setErrorMsg('이름, 이메일, 프로젝트 설명을 입력해주세요.');
      return;
    }
    if (!token) {
      setStatus('error');
      setErrorMsg('잠시 후 다시 시도해주세요. (봇 확인 로딩 중)');
      return;
    }

    setStatus('sending');
    const res = await submitInquiry({
      name, email, phone, service, message, company, turnstileToken: token,
    });

    if (res.ok) {
      setStatus('ok');
      setName(''); setEmail(''); setPhone(''); setService(''); setMessage('');
      setToken('');
    } else {
      setStatus('error');
      setErrorMsg(res.error || '문의 전송에 실패했습니다.');
    }
  };

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
            <form className={styles.form} onSubmit={handleSubmit}>
              {/* 허니팟: 사람 눈에 안 보임 */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                aria-hidden="true"
              />

              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>이름 *</label>
                  <input
                    type="text" placeholder="홍길동" className={styles.input}
                    value={name} onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>이메일 *</label>
                  <input
                    type="email" placeholder="example@email.com" className={styles.input}
                    value={email} onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>연락처</label>
                  <input
                    type="tel" placeholder="010-0000-0000" className={styles.input}
                    value={phone} onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>필요한 서비스</label>
                  <select
                    className={styles.select}
                    value={service} onChange={(e) => setService(e.target.value)}
                  >
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
                  value={message} onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <TurnstileWidget onToken={onToken} />

              <button type="submit" className={styles.submitBtn} disabled={status === 'sending'}>
                {status === 'sending' ? '전송 중...' : '무료 상담 신청하기 →'}
              </button>

              {status === 'ok' && (
                <p className={styles.note} style={{ color: '#1a7f37' }}>
                  문의가 접수되었습니다. 영업일 기준 24시간 이내 회신드립니다.
                </p>
              )}
              {status === 'error' && (
                <p className={styles.note} style={{ color: '#c0392b' }}>{errorMsg}</p>
              )}
              {status !== 'ok' && status !== 'error' && (
                <p className={styles.note}>
                  * 상담은 무료이며, 영업일 기준 24시간 이내 회신드립니다.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
