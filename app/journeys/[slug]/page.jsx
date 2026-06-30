import Link from 'next/link';
import { notFound } from 'next/navigation';
import SectionReveal from '@/components/SectionReveal';
import { getTour, getTours } from '@/lib/data';
import { BRAND } from '@/lib/copy';
import styles from './detail.module.css';

// Rendered per request from the DB, so tours added/edited via the admin appear without
// a rebuild. (No generateStaticParams — dynamic rendering handles every slug on demand.)

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tour = await getTour(slug);
  if (!tour) return { title: 'Journey not found' };
  return {
    title: `${tour.name} — ${tour.subtitle}`,
    description: tour.blurb,
    openGraph: { title: `${tour.name} · ${BRAND.name}`, description: tour.blurb, images: [tour.image] },
  };
}

export default async function TourDetail({ params }) {
  const { slug } = await params;
  const tour = await getTour(slug);
  if (!tour) notFound();

  const all = await getTours();
  const others = all.filter((t) => t.slug !== tour.slug).slice(0, 3);
  const waHref = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
    `Hi Fabian — I'm interested in "${tour.name}".`
  )}`;

  return (
    <article>
      {/* Hero */}
      <header className={styles.hero}>
        <img src={tour.image} alt="" aria-hidden="true" className={styles.heroBg} />
        <div className={styles.heroScrim} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <Link href="/journeys/" className={styles.back}>&larr; All Journeys</Link>
          <span className={styles.badge}>{tour.badge}</span>
          <h1 className={styles.title}>{tour.name}</h1>
          <p className={styles.subtitle}>{tour.subtitle}</p>
          <div className={styles.facts}>
            <Fact label="Route" value={tour.route} />
            <Fact label="Dates" value={tour.dates} />
            <Fact label="Duration" value={tour.duration} />
            <Fact label="Investment" value={tour.price} />
          </div>
        </div>
      </header>

      {/* Overview + sticky booking rail */}
      <section className="section container">
        <div className={styles.layout}>
          <div className={styles.main}>
            <SectionReveal>
              <p className="kicker">{tour.forWhom}</p>
              <p className={styles.lead}>{tour.blurb}</p>
              {tour.overview.map((p, i) => (
                <p key={i} className={styles.prose}>{p}</p>
              ))}
            </SectionReveal>

            <SectionReveal className={styles.block}>
              <h2 className={styles.h2}>Highlights</h2>
              <ul className={styles.highlights}>
                {tour.highlights.map((h, i) => (
                  <li key={i}><span className={styles.tick} aria-hidden="true">&#x2625;</span>{h}</li>
                ))}
              </ul>
            </SectionReveal>

            <SectionReveal className={styles.block}>
              <h2 className={styles.h2}>The Journey, Day by Day</h2>
              <ol className={styles.timeline}>
                {tour.itinerary.map((d, i) => (
                  <li key={i} className={styles.tlItem}>
                    <span className={styles.tlDay}>{d.day}</span>
                    <div>
                      <h3 className={styles.tlPlace}>{d.place}</h3>
                      <p className={styles.tlText}>{d.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </SectionReveal>

            <SectionReveal className={styles.block}>
              <img src={tour.image2} alt={`${tour.name} — scene`} className={styles.wideImg} loading="lazy" />
            </SectionReveal>
          </div>

          <aside className={styles.rail}>
            <div className={styles.card}>
              <span className={styles.cardPrice}>{tour.price}</span>
              <span className={styles.cardPer}>per traveler &middot; {tour.duration}</span>
              <div className={styles.includesHead}>What&rsquo;s included</div>
              <ul className={styles.includes}>
                {tour.includes.map((inc, i) => <li key={i}>{inc}</li>)}
              </ul>
              <Link href="/apply/" className="btn btn-primary" style={{ width: '100%' }}>Apply for this Journey</Link>
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ width: '100%', marginTop: '0.6rem' }}>Ask on WhatsApp</a>
              <p className={styles.note}>Granted by application. Limited places.</p>
            </div>
          </aside>
        </div>
      </section>

      {/* Other journeys */}
      <section className="section" style={{ background: 'var(--bg-elev)' }}>
        <div className="container">
          <h2 className={styles.h2} style={{ marginBottom: 'var(--sp-4)' }}>Other passages</h2>
          <div className="grid grid-3">
            {others.map((t) => (
              <Link key={t.slug} href={`/journeys/${t.slug}/`} className={styles.other}>
                <img src={t.image} alt={t.name} loading="lazy" />
                <div className={styles.otherBody}>
                  <span>{t.route}</span>
                  <h3>{t.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}

function Fact({ label, value }) {
  return (
    <div className={styles.fact}>
      <span className={styles.factLabel}>{label}</span>
      <span className={styles.factValue}>{value}</span>
    </div>
  );
}

export async function generateStaticParams() {
  const tours = await getTours();
  return tours.map((t) => ({ slug: t.slug }));
}
