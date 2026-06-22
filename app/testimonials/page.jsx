import PageHero from '@/components/PageHero';
import SectionReveal from '@/components/SectionReveal';
import VideoTestimonials from '@/components/VideoTestimonials';
import { getTestimonials } from '@/lib/data';
import { IMG } from '@/lib/images';
import styles from './testimonials.module.css';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Testimonials',
  description: 'Voices from the circle — what travelers say about their transformational retreats with Fabian and the Oceanic Ventures crew.',
};

export default async function TestimonialsPage() {
  const { text, video } = await getTestimonials();
  return (
    <>
      <PageHero
        kicker="From the Circle"
        title="Voices from the journey"
        sub="The water leaves a mark. Here is what travelers carried home."
        image={IMG.abuSimbel}
        glyph="feather"
      />

      {/* Video testimonials — Fabian's own (he asked us to feature these) */}
      <section className="section container">
        <SectionReveal className="text-center">
          <p className="kicker mx-auto">In Their Own Words</p>
          <h2 className={styles.heading}>Hear it from the circle</h2>
          <p className="lead mx-auto" style={{ textAlign: 'center' }}>
            Short reflections, filmed on the journey.
          </p>
        </SectionReveal>
        <VideoTestimonials videos={video} />
      </section>

      <section className="section container" style={{ paddingTop: 0 }}>
        <div className={styles.masonry}>
          {text.map((t, i) => (
            <SectionReveal key={t.id ?? i} delay={(i % 3) * 80} className={styles.card}>
              <span className={styles.mark} aria-hidden="true">&ldquo;</span>
              <blockquote className={styles.quote}>{t.quote}</blockquote>
              <figcaption className={styles.cap}>
                <span className={styles.avatar} aria-hidden="true">{(t.name || '?').charAt(0)}</span>
                <span className={styles.who}>
                  <span className={styles.name}>{t.name}</span>
                  <span className={styles.from}>{t.from}</span>
                </span>
                <span className={styles.journeyTag}>{t.journey}</span>
              </figcaption>
            </SectionReveal>
          ))}
        </div>
      </section>
    </>
  );
}
