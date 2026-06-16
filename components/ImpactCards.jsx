import SectionReveal from './SectionReveal';
import { IMPACT } from '@/lib/copy';
import styles from './ImpactCards.module.css';

export default function ImpactCards() {
  return (
    <div className={`grid grid-3 ${styles.grid}`}>
      {IMPACT.funds.map((f, i) => (
        <SectionReveal key={f.name} delay={i * 100} className={styles.card}>
          <span className={styles.glyph} aria-hidden="true">{f.glyph}</span>
          <h3 className={styles.title}>{f.name}</h3>
          <span className={styles.where}>{f.where}</span>
          <p className={styles.body}>{f.body}</p>
        </SectionReveal>
      ))}
    </div>
  );
}
