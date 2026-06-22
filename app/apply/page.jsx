import PageHero from '@/components/PageHero';
import ApplyForm from '@/components/ApplyForm';
import { GlyphRule } from '@/components/Glyph';
import { BRAND } from '@/lib/copy';
import { IMG } from '@/lib/images';
import { getTours } from '@/lib/data';
import styles from './apply.module.css';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Apply / Reserve',
  description: 'Begin your passage to ancient Egypt. Apply for a sacred journey with Fabian — places are limited and granted by application.',
};

export default async function ApplyPage() {
  const tours = await getTours();
  const waHref = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent('Hi Fabian — I’d love to apply for an Egypt journey.')}`;
  return (
    <>
      <PageHero
        kicker="Begin the Passage"
        title="Answer the call"
        sub="Places are limited and granted by application. Tell us what’s drawing you to Egypt — we reply to every enquiry personally."
        image={IMG.pyramidDusk}
        glyph="ankh"
      />
      <section className="section container">
        <div className={styles.layout}>
          <div className={styles.formCol}>
            <ApplyForm tours={tours} />
          </div>
          <aside className={styles.aside}>
            <h2 className={styles.asideTitle}>Prefer to talk?</h2>
            <p className={styles.asideText}>
              Reach us directly — we love a good conversation about Egypt almost as much as we love being there.
            </p>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%' }}>
              Message on WhatsApp
            </a>
            <a href={`mailto:${BRAND.email}`} className="btn btn-ghost" style={{ width: '100%', marginTop: '0.6rem' }}>
              Email Us
            </a>
            <GlyphRule className="glyph-rule" names={['lotus', 'feather']} />
            <ul className={styles.assure}>
              <li>Small groups, never crowds</li>
              <li>Private guiding & curated stays</li>
              <li>A portion funds Nile &amp; Red Sea regeneration</li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
