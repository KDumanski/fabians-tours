import Link from 'next/link';
import PageHero from '@/components/PageHero';
import SectionReveal from '@/components/SectionReveal';
import ImpactCards from '@/components/ImpactCards';
import { IMPACT } from '@/lib/copy';
import { IMG } from '@/lib/images';
import prose from '../prose.module.css';

export const metadata = {
  title: 'Social Impact',
  description: 'Spirit in action — how a portion of every journey funds regeneration along the Nile and the Red Sea.',
};

export default function SocialImpactPage() {
  return (
    <>
      <PageHero
        kicker={IMPACT.kicker}
        title={IMPACT.title}
        sub="Reverence asks for more than admiration. It asks for action."
        image={IMG.redSea}
        glyph="&#x1308B;"
      />
      <section className={`${prose.section} container`}>
        <SectionReveal className={prose.narrow}>
          <p className={prose.p} style={{ fontSize: 'var(--fs-md)', color: 'var(--ink)' }}>{IMPACT.intro}</p>
        </SectionReveal>

        <ImpactCards />

        <SectionReveal className="text-center" style={{ marginTop: 'var(--sp-6)' }}>
          <div className="glyph-rule" aria-hidden="true">&#x132AA; &#x13193; &#x132F9;</div>
          <h2 className={prose.h2} style={{ marginInline: 'auto' }}>Travel that gives back</h2>
          <p className="lead mx-auto" style={{ textAlign: 'center' }}>
            Every journey you take helps protect the river, the reef, and the communities who call them home.
          </p>
          <Link href="/journeys/" className="btn btn-primary" style={{ marginTop: 'var(--sp-3)' }}>Explore Journeys</Link>
        </SectionReveal>
      </section>
    </>
  );
}
