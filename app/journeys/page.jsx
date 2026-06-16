import PageHero from '@/components/PageHero';
import JourneyCard from '@/components/JourneyCard';
import SectionReveal from '@/components/SectionReveal';
import { TOURS } from '@/lib/tours';
import { IMG } from '@/lib/images';

export const metadata = {
  title: 'All Journeys',
  description: 'Browse all luxury sacred Egypt journeys — Nile sailing, Red Sea dolphins, temple pilgrimages, and the complete Egypt initiation.',
};

export default function JourneysPage() {
  return (
    <>
      <PageHero
        kicker="The Journeys"
        title="Choose your passage to ancient Egypt"
        sub="Each journey is small, intentional, and unrepeatable. Find the one that is calling you."
        image={IMG.karnak}
        glyph="&#x132AA;"
      />
      <section className="section container">
        <div className="grid grid-3">
          {TOURS.map((t, i) => (
            <SectionReveal key={t.slug} delay={(i % 3) * 90}>
              <JourneyCard tour={t} />
            </SectionReveal>
          ))}
        </div>
      </section>
    </>
  );
}
