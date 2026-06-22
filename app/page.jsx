import Link from 'next/link';
import Hero from '@/components/Hero';
import JourneyCard from '@/components/JourneyCard';
import SectionReveal from '@/components/SectionReveal';
import PillarGrid from '@/components/PillarGrid';
import ImpactCards from '@/components/ImpactCards';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import VideoTestimonials from '@/components/VideoTestimonials';
import CrewGrid from '@/components/CrewGrid';
import { GlyphRule } from '@/components/Glyph';
import { getRetreats, getCrew, getTestimonials } from '@/lib/data';
import { ABOUT, IMPACT } from '@/lib/copy';
import { IMG } from '@/lib/images';
import styles from './page.module.css';

// Render per request so live admin edits (tours, crew, testimonials) appear immediately.
export const dynamic = 'force-dynamic';

export default async function Home() {
  const [FEATURED, crew, testimonials] = await Promise.all([
    getRetreats(),
    getCrew(),
    getTestimonials(),
  ]);
  return (
    <>
      <Hero />

      {/* PILLARS — the real practices (no made-up category labels) */}
      <section id="pillars" className="section container">
        <SectionReveal className="text-center">
          <p className="kicker mx-auto">The Practices</p>
          <h2 className={styles.sectionTitle}>How we journey inward</h2>
          <p className="lead mx-auto" style={{ textAlign: 'center' }}>
            Freediving, somatics, shamanism, and sharing circles — woven together into one held passage.
          </p>
        </SectionReveal>
        <PillarGrid />
      </section>

      {/* FEATURED RETREATS */}
      <section className="section" style={{ background: 'var(--bg-elev)' }}>
        <div className="container">
          <SectionReveal className={styles.head}>
            <div>
              <p className="kicker">The Retreats</p>
              <h2 className={styles.sectionTitle}>Choose your passage</h2>
            </div>
            <Link href="/journeys/" className="btn btn-ghost">Explore the Retreats</Link>
          </SectionReveal>

          <div className={`grid grid-2 ${styles.journeyGrid}`}>
            <SectionReveal as="div" style={{ gridColumn: '1 / -1' }}>
              <JourneyCard tour={FEATURED[0]} featured />
            </SectionReveal>
            {FEATURED.slice(1).map((t, i) => (
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

      {/* CREW TEASER */}
      <section className="section container">
        <SectionReveal className={styles.head}>
          <div>
            <p className="kicker">The Crew</p>
            <h2 className={styles.sectionTitle}>The hands that hold the journey</h2>
          </div>
          <Link href="/crew/" className="btn btn-ghost">Meet the Crew</Link>
        </SectionReveal>
        <CrewGrid crew={crew} limit={4} />
      </section>

      {/* VIDEO TESTIMONIALS — Fabian's own, he asked us to feature these */}
      <section className="section" style={{ background: 'var(--bg-elev)' }}>
        <div className="container">
          <SectionReveal className="text-center">
            <p className="kicker mx-auto">In Their Own Words</p>
            <h2 className={styles.sectionTitle}>Hear it from the circle</h2>
            <p className="lead mx-auto" style={{ textAlign: 'center' }}>
              Short reflections, filmed on the journey.
            </p>
          </SectionReveal>
          <VideoTestimonials videos={testimonials.video} />
        </div>
      </section>

      {/* WRITTEN TESTIMONIALS */}
      <section className="section container">
        <SectionReveal className="text-center">
          <p className="kicker mx-auto">From the Circle</p>
          <h2 className={styles.sectionTitle}>Voices from the journey</h2>
        </SectionReveal>
        <TestimonialCarousel testimonials={testimonials.text} />
      </section>

      {/* FINAL CTA */}
      <section className={styles.cta}>
        <img src={IMG.starsDesert} alt="" aria-hidden="true" className={styles.ctaBg} loading="lazy" />
        <div className={styles.ctaScrim} aria-hidden="true" />
        <SectionReveal className={`container ${styles.ctaInner}`}>
          <GlyphRule className="glyph-rule" names={['eye', 'lotus', 'feather']} />
          <h2 className={styles.ctaTitle}>The water is calling. Will you answer?</h2>
          <p className={styles.ctaSub}>
            Places are limited and granted by application. Begin your passage with us.
          </p>
          <Link href="/apply/" className="btn btn-primary">Apply Now</Link>
        </SectionReveal>
      </section>
    </>
  );
}
