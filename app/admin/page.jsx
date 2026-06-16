'use client';
import { useEffect, useState } from 'react';
import { TOURS } from '@/lib/tours';
import { ADMIN, ADMIN_SESSION_KEY } from '@/lib/adminConfig';
import styles from './admin.module.css';

// Fields exposed in the editor (the ones safe + useful to edit inline).
const EDITABLE = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'subtitle', label: 'Subtitle', type: 'text' },
  { key: 'badge', label: 'Badge', type: 'text' },
  { key: 'route', label: 'Route', type: 'text' },
  { key: 'dates', label: 'Dates', type: 'text' },
  { key: 'duration', label: 'Duration', type: 'text' },
  { key: 'price', label: 'Price', type: 'text' },
  { key: 'forWhom', label: 'For whom', type: 'text' },
  { key: 'image', label: 'Hero image URL', type: 'text' },
  { key: 'blurb', label: 'Blurb', type: 'textarea' },
];

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [err, setErr] = useState('');

  const [tours, setTours] = useState([]);
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  // Restore session + working copy (drafts persist in localStorage)
  useEffect(() => {
    try {
      if (sessionStorage.getItem(ADMIN_SESSION_KEY) === '1') setAuthed(true);
      const saved = localStorage.getItem('ft-tours-draft');
      setTours(saved ? JSON.parse(saved) : structuredClone(TOURS));
    } catch {
      setTours(structuredClone(TOURS));
    }
    setChecking(false);
  }, []);

  function login(e) {
    e.preventDefault();
    if (u.trim() === ADMIN.username && p === ADMIN.password) {
      setAuthed(true);
      setErr('');
      try { sessionStorage.setItem(ADMIN_SESSION_KEY, '1'); } catch {}
    } else {
      setErr('Incorrect username or password.');
    }
  }

  function logout() {
    setAuthed(false);
    try { sessionStorage.removeItem(ADMIN_SESSION_KEY); } catch {}
  }

  function update(key, value) {
    setTours((prev) => {
      const next = structuredClone(prev);
      next[active][key] = value;
      try { localStorage.setItem('ft-tours-draft', JSON.stringify(next)); } catch {}
      return next;
    });
  }

  function resetDrafts() {
    if (!confirm('Discard all local edits and reload the published listings?')) return;
    const fresh = structuredClone(TOURS);
    setTours(fresh);
    try { localStorage.removeItem('ft-tours-draft'); } catch {}
  }

  function exportJSON() {
    const blob = new Blob([JSON.stringify(tours, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tours.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  async function copyJSON() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(tours, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  if (checking) return null;

  // ---- Login gate ----
  if (!authed) {
    return (
      <div className={styles.loginWrap}>
        <form className={styles.loginCard} onSubmit={login}>
          <span className={styles.ankh} aria-hidden="true">&#x2625;</span>
          <h1 className={styles.loginTitle}>Keeper&rsquo;s Gate</h1>
          <p className={styles.loginSub}>Oceanic Ventures — Admin Dashboard</p>
          <label className={styles.field}>
            <span>Username</span>
            <input value={u} onChange={(e) => setU(e.target.value)} autoComplete="username" autoFocus />
          </label>
          <label className={styles.field}>
            <span>Password</span>
            <input type="password" value={p} onChange={(e) => setP(e.target.value)} autoComplete="current-password" />
          </label>
          {err && <p className={styles.err} role="alert">{err}</p>}
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Enter</button>
          <p className={styles.notice}>
            Client-side gate for convenience only — not a secure login. See README for real auth.
          </p>
        </form>
      </div>
    );
  }

  // ---- Dashboard ----
  const t = tours[active] || {};
  return (
    <div className={styles.dash}>
      <header className={styles.bar}>
        <div className={styles.brand}>
          <span className={styles.ankh} aria-hidden="true">&#x2625;</span>
          <span>Oceanic Ventures · <strong>Dashboard</strong></span>
        </div>
        <div className={styles.barActions}>
          <button className="btn btn-ghost" onClick={resetDrafts}>Reset</button>
          <button className="btn btn-ghost" onClick={copyJSON}>{copied ? 'Copied!' : 'Copy JSON'}</button>
          <button className="btn btn-primary" onClick={exportJSON}>Export tours.json</button>
          <button className={styles.logout} onClick={logout} aria-label="Log out">Log out</button>
        </div>
      </header>

      <div className={styles.banner}>
        Edits are saved to your browser only. To publish, <strong>Export</strong> (or Copy) and replace
        the <code>TOURS</code> array in <code>lib/tours.js</code>, then commit &amp; push.
      </div>

      <div className={styles.body}>
        {/* Listing sidebar */}
        <aside className={styles.list} aria-label="Listings">
          <div className={styles.listHead}>Listings ({tours.length})</div>
          {tours.map((tour, i) => (
            <button
              key={tour.slug}
              className={`${styles.listItem} ${i === active ? styles.listActive : ''}`}
              onClick={() => setActive(i)}
            >
              <img src={tour.image} alt="" aria-hidden="true" />
              <span>
                <strong>{tour.name}</strong>
                <em>{tour.route}</em>
              </span>
            </button>
          ))}
        </aside>

        {/* Editor */}
        <section className={styles.editor}>
          <div className={styles.editorHead}>
            <h2>Edit listing</h2>
            <span className={styles.slug}>/{t.slug}</span>
          </div>
          <div className={styles.preview}>
            <img src={t.image} alt={t.name} />
            <div>
              <span className={styles.pvBadge}>{t.badge}</span>
              <h3>{t.name}</h3>
              <p>{t.subtitle}</p>
              <span className={styles.pvPrice}>{t.price}</span>
            </div>
          </div>

          <div className={styles.fields}>
            {EDITABLE.map((f) => (
              <label key={f.key} className={`${styles.field} ${f.type === 'textarea' ? styles.fieldFull : ''}`}>
                <span>{f.label}</span>
                {f.type === 'textarea' ? (
                  <textarea rows={4} value={t[f.key] ?? ''} onChange={(e) => update(f.key, e.target.value)} />
                ) : (
                  <input value={t[f.key] ?? ''} onChange={(e) => update(f.key, e.target.value)} />
                )}
              </label>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
