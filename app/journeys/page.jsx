import PageHero from '@/components/PageHero';
import JourneyCard from '@/components/JourneyCard';
import SectionReveal from '@/components/SectionReveal';
import { getRetreats, getTrainings } from '@/lib/data';
import { IMG } from '@/lib/images';
import prose from '../prose.module.css';


export const metadata = {
  title: 'The Retreats',
  description: 'Browse all Oceanic Ventures retreats — Red Sea dolphins, temple pilgrimages, Nile sailing, the complete Egypt initiation, and our somatic water therapy training.',
};

export default async function JourneysPage() {
  const [retreats, trainings] = await Promise.all([getRetreats(), getTrainings()]);
  return (
    <>
      <PageHero
        kicker="The Retreats"
        title="Choose your passage"
        sub="Each retreat is small, intentional, and unrepeatable. Find the one that is calling you."
        image={IMG.karnak}
        glyph="lotus"
      />
      <section className="section container">
        <div className="grid grid-3">
          {retreats.map((t, i) => (
            <SectionReveal key={t.slug} delay={(i % 3) * 90}>
              <JourneyCard tour={t} />
            </SectionReveal>
          ))}
        </div>
      </section>

      {trainings.length > 0 && (
        <section className="section container" style={{ paddingTop: 0 }}>
          <SectionReveal className="text-center">
            <p className="kicker mx-auto">Trainings</p>
            <h2 className={prose.h2} style={{ marginInline: 'auto' }}>Take the medicine home</h2>
            <p className="lead mx-auto" style={{ textAlign: 'center' }}>
              For practitioners ready to hold this work for others.
            </p>
          </SectionReveal>
          <div className="grid grid-3" style={{ marginTop: 'var(--sp-4)' }}>
            {trainings.map((t, i) => (
              <SectionReveal key={t.slug} delay={(i % 3) * 90}>
                <JourneyCard tour={t} />
              </SectionReveal>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
