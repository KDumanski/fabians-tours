import Link from 'next/link';
import PageHero from '@/components/PageHero';
import SectionReveal from '@/components/SectionReveal';
import CrewGrid from '@/components/CrewGrid';
import { IMG } from '@/lib/images';
import prose from '../prose.module.css';

export const metadata = {
  title: 'Our Crew',
  description: 'Meet the Oceanic Ventures crew — the guides, healers, yogis, and water therapists who hold each transformational retreat.',
};

export default function CrewPage() {
  return (
    <>
      <PageHero
        kicker="The Hands That Hold the Journey"
        title="Our Crew"
        sub="A circle of guides, healers, and water-keepers — each devoted to holding you well."
        image={IMG.redSea}
        glyph="circle"
      />

      <section className="section container">
        <SectionReveal className="text-center">
          <p className="kicker mx-auto">Founder & Facilitators</p>
          <h2 className={prose.h2} style={{ marginInline: 'auto' }}>The people you’ll travel with</h2>
          <p className="lead mx-auto" style={{ textAlign: 'center' }}>
            Oceanic Ventures is not a tour desk — it’s a small, devoted crew. These are the
            people who guide, hold, and tend every retreat.
          </p>
        </SectionReveal>

        <CrewGrid />

        <div className="text-center" style={{ marginTop: 'var(--sp-5)' }}>
          <Link href="/apply/" className="btn btn-primary">Begin Your Application</Link>
        </div>
      </section>
    </>
  );
}
