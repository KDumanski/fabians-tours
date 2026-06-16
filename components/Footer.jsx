import Link from 'next/link';
import { BRAND, FOOTER_LINKS } from '@/lib/copy';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logo}>
              <span className={styles.ankh} aria-hidden="true">&#x2625;</span>
              Fabian&rsquo;s <em>Tours</em>
            </Link>
            <p className={styles.tagline}>{BRAND.tagline}</p>
            <p className={styles.blurb}>
              Luxury sacred journeys through the land of the pharaohs — desert, river,
              temple, and sea. Come for the wonder. Leave changed.
            </p>
            <div className={styles.socials} aria-label="Social links">
              <a href={BRAND.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href={BRAND.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href={BRAND.youtube} aria-label="YouTube" target="_blank" rel="noopener noreferrer">YouTube</a>
            </div>
          </div>

          <nav className={styles.linkCol} aria-label="Explore">
            <h4>Explore</h4>
            {FOOTER_LINKS.explore.map((l) => (
              <Link key={l.label} href={l.href}>{l.label}</Link>
            ))}
          </nav>
          <nav className={styles.linkCol} aria-label="Discover">
            <h4>Discover</h4>
            {FOOTER_LINKS.about.map((l) => (
              <Link key={l.label} href={l.href}>{l.label}</Link>
            ))}
          </nav>
          <nav className={styles.linkCol} aria-label="More">
            <h4>More</h4>
            {FOOTER_LINKS.legal.map((l) => (
              <Link key={l.label} href={l.href}>{l.label}</Link>
            ))}
            <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
          </nav>
        </div>

        <div className={styles.glyphRule} aria-hidden="true">
          &#x13080; &#x132AA; &#x13171; &#x13000; &#x1308B;
        </div>

        <div className={styles.bottom}>
          <span>
            {BRAND.name} &copy; {2026}. All rights reserved.
          </span>
          <span className={styles.made}>Crafted on the banks of the Nile.</span>
        </div>
      </div>
    </footer>
  );
}
