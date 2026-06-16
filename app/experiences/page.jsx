import Link from 'next/link';
import PageHero from '@/components/PageHero';
import SectionReveal from '@/components/SectionReveal';
import { IMG, GALLERY } from '@/lib/images';
import prose from '../prose.module.css';
import styles from './experiences.module.css';

export const metadata = {
  title: 'Signature Experiences',
  description: 'The hallmark moments woven into every Oceanic Ventures journey — dawn at Giza, the Nile under stars, ritual in the temples, the Red Sea reefs.',
};

const EXPERIENCES = [
  { glyph: '\u{2609}', title: 'Dawn at the Giza Plateau', text: 'Private entry before the gates open to the world. Just you, the pyramids, and the first gold of morning on five-thousand-year-old stone.', img: IMG.gizaPyramids },
  { glyph: '\u{2625}', title: 'A Night Sailing the Nile', text: 'Felucca under a sky thick with stars, the river doing what it has always done — carrying travelers gently toward something new.', img: IMG.nileFelucca },
  { glyph: '\u{13080}', title: 'Ritual in the Temple Sanctuary', text: 'Candlelight, hieroglyph, and silence in a working temple. The walls have kept these secrets for millennia. Tonight they keep yours.', img: IMG.karnak },
  { glyph: '\u{1F30A}', title: 'The Red Sea at Golden Hour', text: 'Warm water, living coral, and the most charismatic locals in the sea. Float, breathe, and let the blue do its quiet work.', img: IMG.redSea },
  { glyph: '\u{13193}', title: 'Reading the Walls', text: 'Egyptology brought to life on-site — the myths of Osiris, Isis, and Ra decoded where they were carved, until the stone starts speaking.', img: IMG.hieroglyphs },
  { glyph: '\u{132AA}', title: 'The Closing Circle', text: 'Beneath the desert moon, the group gathers one last time. You arrived a traveler. You leave part of a circle that spans the world.', img: IMG.starsDesert },
];

export default function ExperiencesPage() {
  return (
    <>
      <PageHero
        kicker="Signature Experiences"
        title="The moments that make a journey unforgettable"
        sub="Woven into every passage — the hallmark experiences that turn a trip into a turning point."
        image={IMG.luxorTemple || IMG.karnak}
        glyph="&#x13171;"
      />

      <section className={`${prose.section} container`}>
        <div className={styles.grid}>
          {EXPERIENCES.map((e, i) => (
            <SectionReveal key={i} delay={(i % 2) * 100} className={styles.exp}>
              <div className={styles.expMedia}>
                <img src={e.img} alt={e.title} loading="lazy" />
                <span className={styles.expGlyph} aria-hidden="true">{e.glyph}</span>
              </div>
              <div className={styles.expBody}>
                <h2 className={styles.expTitle}>{e.title}</h2>
                <p className={styles.expText}>{e.text}</p>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Gallery strip */}
        <SectionReveal className="text-center" style={{ marginTop: 'var(--sp-6)' }}>
          <p className="kicker mx-auto">A glimpse</p>
          <h2 className={prose.h2} style={{ marginInline: 'auto' }}>Egypt, as you&rsquo;ll remember it</h2>
        </SectionReveal>
        <div className={styles.gallery}>
          {GALLERY.map((src, i) => (
            <img key={i} src={src} alt="" aria-hidden="true" loading="lazy" className={styles.galleryImg} />
          ))}
        </div>

        <div className="text-center" style={{ marginTop: 'var(--sp-5)' }}>
          <Link href="/journeys/" className="btn btn-primary">Find Your Journey</Link>
        </div>
      </section>
    </>
  );
}
