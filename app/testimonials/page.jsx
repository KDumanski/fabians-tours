import PageHero from '@/components/PageHero';
import SectionReveal from '@/components/SectionReveal';
import { TESTIMONIALS } from '@/lib/testimonials';
import { IMG } from '@/lib/images';
import styles from './testimonials.module.css';

export const metadata = {
  title: 'Testimonials',
  description: 'Voices from the circle — what travelers say about their sacred Egypt journeys with Fabian.',
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        kicker="From the Circle"
        title="Voices from the journey"
        sub="The desert leaves a mark. Here is what travelers carried home."
        image={IMG.abuSimbel}
        glyph="feather"
      />
      <section className="section container">
        <div className={styles.masonry}>
          {TESTIMONIALS.map((t, i) => (
            <SectionReveal key={i} delay={(i % 3) * 80} className={styles.card}>
              <span className={styles.mark} aria-hidden="true">&ldquo;</span>
              <blockquote className={styles.quote}>{t.quote}</blockquote>
              <figcaption className={styles.cap}>
                <span className={styles.avatar} aria-hidden="true">{t.name.charAt(0)}</span>
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
