import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { portfolioProjects, getPortfolioProject } from '@/data/portfolio';
import styles from './detail.module.css';

export function generateStaticParams() {
  return portfolioProjects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  if (!project) return { title: '프로젝트를 찾을 수 없습니다 | 픽셀커넥트' };
  return {
    title: `${project.title} | 픽셀커넥트 포트폴리오`,
    description: project.summary,
    openGraph: { images: [{ url: project.img }] },
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  if (!project) notFound();

  const [coverImg, ...galleryImages] = project.images;

  return (
    <main className={styles.main}>
      <article className={styles.article}>
        <div className={styles.breadcrumb}>
          <Link href="/">홈</Link>
          <span className={styles.breadcrumbSep}>›</span>
          <Link href="/portfolio">포트폴리오</Link>
          <span className={styles.breadcrumbSep}>›</span>
          <span>{project.title}</span>
        </div>

        <header className={styles.header}>
          <div className={styles.category}>{project.category}</div>
          <h1 className={styles.title}>{project.title}</h1>

          <div className={styles.metaRow}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>카테고리</span>
              <span className={styles.metaValue}>{project.category}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>진행 기간</span>
              <span className={styles.metaValue}>{project.period}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>담당 영역</span>
              <span className={styles.metaValue}>{project.role}</span>
            </div>

            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.visitBtn}
              >
                홈페이지 보기 ↗
              </a>
            )}
          </div>
        </header>

        <div className={styles.cover}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={coverImg} alt={project.title} className={styles.coverImg} />
        </div>

        <p className={styles.overview}>{project.overview}</p>

        {galleryImages.length > 0 && (
          <div className={styles.gallery}>
            {galleryImages.map((img, i) => (
              <div key={i} className={styles.galleryImg}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={`${project.title} 이미지 ${i + 2}`} className={styles.coverImg} />
              </div>
            ))}
          </div>
        )}

        <div className={styles.footer}>
          <div className={styles.footerInner}>
            <h3>비슷한 프로젝트를 계획 중이신가요?</h3>
            <p>부담 없이 먼저 물어보세요. 견적만 확인하셔도 괜찮습니다.</p>
            <div className={styles.actions}>
              <Link href="/contact" className={styles.contactBtn}>프로젝트 문의하기</Link>
              <Link href="/portfolio" className={styles.backBtn}>목록으로 돌아가기</Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
