import Link from 'next/link';
import Hero from '@/components/Hero';
import JourneyCard from '@/components/JourneyCard';
import SectionReveal from '@/components/SectionReveal';
import PillarGrid from '@/components/PillarGrid';
import ImpactCards from '@/components/ImpactCards';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import { GlyphRule } from '@/components/Glyph';
import { TOURS } from '@/lib/tours';
import { ABOUT, IMPACT } from '@/lib/copy';
import { IMG } from '@/lib/images';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <Hero />

      {/* PILLARS */}
      <section id="pillars" className="section container">
        <SectionReveal className="text-center">
          <p className="kicker mx-auto">The Practices</p>
          <h2 className={styles.sectionTitle}>Four ways to journey inward</h2>
          <p className="lead mx-auto" style={{ textAlign: 'center' }}>
            Freediving, somatics, shamanism, and sharing circles — woven together into one sacred passage.
          </p>
        </SectionReveal>
        <PillarGrid />
      </section>

      {/* FEATURED JOURNEYS */}
      <section className="section" style={{ background: 'var(--bg-elev)' }}>
        <div className="container">
          <SectionReveal className={styles.head}>
            <div>
              <p className="kicker">The Journeys</p>
              <h2 className={styles.sectionTitle}>Choose your passage</h2>
            </div>
            <Link href="/journeys/" className="btn btn-ghost">View All Journeys</Link>
          </SectionReveal>

          <div className={`grid grid-2 ${styles.journeyGrid}`}>
            <SectionReveal as="div" style={{ gridColumn: '1 / -1' }}>
              <JourneyCard tour={TOURS[0]} featured />
            </SectionReveal>
            {TOURS.slice(1).map((t, i) => (
              <SectionReveal key={t.slug} delay={i * 90}>
                <JourneyCard tour={t} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT TEASER — golden ratio split */}
      <section className="section container">
        <div className={styles.split}>
          <SectionReveal className={styles.splitMedia}>
            <img src={IMG.nileFelucca} alt="A felucca sailing the Nile at golden hour" className={styles.splitImg} loading="lazy" />
            <div className={styles.splitGlyph} aria-hidden="true">&#x2625;</div>
          </SectionReveal>
          <SectionReveal className={styles.splitBody} delay={120}>
            <p className="kicker">{ABOUT.intro.kicker}</p>
            <h2 className={styles.sectionTitle}>{ABOUT.intro.title}</h2>
            {ABOUT.intro.body.map((p, i) => (
              <p key={i} className={styles.proseP}>{p}</p>
            ))}
            <Link href="/about/" className="btn btn-primary">Our Story</Link>
          </SectionReveal>
        </div>
      </section>

      {/* IMPACT TEASER */}
      <section className="section" style={{ background: 'var(--bg-elev)' }}>
        <div className="container">
          <SectionReveal className="text-center">
            <p className="kicker mx-auto">{IMPACT.kicker}</p>
            <h2 className={styles.sectionTitle}>{IMPACT.title}</h2>
            <p className="lead mx-auto" style={{ textAlign: 'center' }}>{IMPACT.intro}</p>
          </SectionReveal>
          <ImpactCards />
          <div className="text-center" style={{ marginTop: 'var(--sp-4)' }}>
            <Link href="/social-impact/" className="btn btn-ghost">How We Give Back</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section container">
        <SectionReveal className="text-center">
          <p className="kicker mx-auto">From the Circle</p>
          <h2 className={styles.sectionTitle}>Voices from the journey</h2>
        </SectionReveal>
        <TestimonialCarousel />
      </section>

      {/* FINAL CTA */}
      <section className={styles.cta}>
        <img src={IMG.starsDesert} alt="" aria-hidden="true" className={styles.ctaBg} loading="lazy" />
        <div className={styles.ctaScrim} aria-hidden="true" />
        <SectionReveal className={`container ${styles.ctaInner}`}>
          <GlyphRule className="glyph-rule" names={['eye', 'lotus', 'feather']} />
          <h2 className={styles.ctaTitle}>The desert is calling. Will you answer?</h2>
          <p className={styles.ctaSub}>
            Places are limited and granted by application. Begin your passage to ancient Egypt.
          </p>
          <Link href="/apply/" className="btn btn-primary">Apply Now</Link>
        </SectionReveal>
      </section>
    </>
  );
}
