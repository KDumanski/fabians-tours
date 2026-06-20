import SectionReveal from './SectionReveal';
import { CREW } from '@/lib/crew';
import { asset } from '@/lib/asset';
import styles from './CrewGrid.module.css';

// The real crew. Fabian (the founder) gets a wider feature card with his note;
// everyone else is an even portrait grid. `limit` lets the home page show a teaser.
export default function CrewGrid({ limit }) {
  const people = limit ? CREW.slice(0, limit) : CREW;
  return (
    <div className={styles.grid}>
      {people.map((m, i) => (
        <SectionReveal
          key={m.name}
          delay={(i % 4) * 80}
          className={`${styles.card} ${m.lead ? styles.lead : ''}`}
        >
          <div className={styles.media}>
            <img src={asset(m.photo)} alt={m.name} className={styles.photo} loading="lazy" />
          </div>
          <div className={styles.body}>
            <h3 className={styles.name}>{m.name}</h3>
            <p className={styles.role}>{m.role}</p>
            {m.note ? <p className={styles.note}>{m.note}</p> : null}
          </div>
        </SectionReveal>
      ))}
    </div>
  );
}
