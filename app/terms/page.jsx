import PageHero from '@/components/PageHero';
import { IMG } from '@/lib/images';
import prose from '../prose.module.css';

export const metadata = {
  title: 'Terms & Conditions',
  description: 'Booking terms, application process, payments, and cancellation policy for Fabian’s Tours.',
};

const SECTIONS = [
  { h: 'Application & Reservation', p: 'Places on every journey are granted by application and, where noted, a short interview. Submitting an application does not guarantee a place; we will confirm availability and next steps by email or WhatsApp.' },
  { h: 'Payments & Deposits', p: 'A deposit secures your place once your application is accepted. The balance is due ahead of departure as detailed in your confirmation. All figures are quoted per traveler and are subject to change until confirmed in writing.' },
  { h: 'Cancellations & Changes', p: 'Cancellation terms are provided with your confirmation and vary by journey and proximity to departure. We strongly recommend comprehensive travel insurance covering cancellation, medical care, and personal effects.' },
  { h: 'Health & Suitability', p: 'Several experiences involve swimming, walking on uneven ground, and warm-weather activity. Please disclose relevant health considerations at application so we can advise honestly on suitability.' },
  { h: 'Liability', p: 'We curate and guide journeys in partnership with trusted local operators. Travelers participate at their own risk and are responsible for valid travel documents, visas, and insurance.' },
  { h: 'Privacy', p: 'Information you share through our forms is used solely to respond to your enquiry and arrange your journey. We do not sell your data. Contact us anytime to update or remove it.' },
];

export default function TermsPage() {
  return (
    <>
      <PageHero kicker="The Fine Print" title="Terms & Conditions" image={IMG.egyptDesert} glyph="&#x13080;" />
      <section className={`${prose.section} container`}>
        <div className={prose.narrow}>
          {SECTIONS.map((s, i) => (
            <div key={i} style={{ marginBottom: 'var(--sp-4)' }}>
              <h2 className={prose.h2}>{s.h}</h2>
              <p className={prose.p}>{s.p}</p>
            </div>
          ))}
          <p className={prose.p} style={{ fontStyle: 'italic', color: 'var(--ink-faint)' }}>
            This page is a summary for convenience. Full terms are provided in your booking confirmation and prevail in case of any discrepancy.
          </p>
        </div>
      </section>
    </>
  );
}
