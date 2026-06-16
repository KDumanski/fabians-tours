import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container" style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: 120 }}>
      <span aria-hidden="true" style={{ fontSize: '3.5rem', color: 'var(--accent)' }}>&#x13080;</span>
      <h1 style={{ fontSize: 'var(--fs-2xl)' }}>Lost in the sands</h1>
      <p className="lead" style={{ textAlign: 'center' }}>
        This path leads nowhere the maps remember. Let&rsquo;s guide you back to the river.
      </p>
      <div style={{ display: 'flex', gap: 'var(--sp-2)', marginTop: 'var(--sp-3)', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" className="btn btn-primary">Return Home</Link>
        <Link href="/journeys/" className="btn btn-ghost">Browse Journeys</Link>
      </div>
    </section>
  );
}
