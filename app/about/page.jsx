import Link from 'next/link';
import PageHero from '@/components/PageHero';
import SectionReveal from '@/components/SectionReveal';
import { GlyphRule } from '@/components/Glyph';
import { ABOUT } from '@/lib/copy';
import { IMG } from '@/lib/images';
import prose from '../prose.module.css';

export const metadata = {
  title: 'About Us',
  description: 'Egypt is both a mirror and a doorway. Meet Fabian and the philosophy behind our sacred Egypt journeys.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker={ABOUT.intro.kicker}
        title={ABOUT.intro.title}
        sub="As above, so below. To stand before the pyramids is to stand before yourself."
        image={IMG.starsDesert}
        glyph="ankh"
      />

      <section className={`${prose.section} container`}>
        <SectionReveal className={prose.narrow}>
          {ABOUT.intro.body.map((p, i) => <p key={i} className={prose.p}>{p}</p>)}
        </SectionReveal>

        <GlyphRule className="glyph-rule" names={['eye', 'lotus', 'feather']} />

        {/* Atlantis */}
        <SectionReveal className={prose.row}>
          <div className={prose.media}>
            <img src={IMG.hieroglyphs} alt="Carved hieroglyphics on a temple wall" loading="lazy" />
          </div>
          <div className={prose.body}>
            <p className="kicker">{ABOUT.atlantis.kicker}</p>
            <h2 className={prose.h2}>{ABOUT.atlantis.title}</h2>
            {ABOUT.atlantis.body.map((p, i) => <p key={i} className={prose.p}>{p}</p>)}
          </div>
        </SectionReveal>

        {/* Community */}
        <SectionReveal className={`${prose.row} ${prose.rowReverse}`}>
          <div className={prose.media}>
            <img src={IMG.desertCaravan} alt="A caravan crossing the desert at dusk" loading="lazy" />
          </div>
          <div className={prose.body}>
            <p className="kicker">{ABOUT.community.kicker}</p>
            <h2 className={prose.h2}>{ABOUT.community.title}</h2>
            {ABOUT.community.body.map((p, i) => <p key={i} className={prose.p}>{p}</p>)}
          </div>
        </SectionReveal>

        {/* Founder */}
        <SectionReveal className={prose.row}>
          <div className={prose.media}>
            <img src={IMG.nileFelucca} alt="The Nile at golden hour" loading="lazy" />
          </div>
          <div className={prose.body}>
            <p className="kicker">{ABOUT.founder.kicker}</p>
            <h2 className={prose.h2}>{ABOUT.founder.title}</h2>
            {ABOUT.founder.body.map((p, i) => <p key={i} className={prose.p}>{p}</p>)}
            <Link href="/apply/" className="btn btn-primary">Travel with Fabian</Link>
          </div>
        </SectionReveal>
      </section>
    </>
  );
}
