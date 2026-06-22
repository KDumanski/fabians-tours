'use client';
import { useState } from 'react';
import {
  saveTour, deleteTour,
  saveCrew, deleteCrew,
  saveTestimonial, deleteTestimonial,
  uploadImage,
} from './actions';
import styles from './admin.module.css';

const TABS = [
  { key: 'tours', label: 'Retreats & Trainings' },
  { key: 'crew', label: 'Crew' },
  { key: 'testimonials', label: 'Testimonials' },
];

// Convert stored arrays/objects back into the newline format the textareas use.
const joinLines = (arr) => (arr || []).join('\n');
const joinItinerary = (arr) =>
  (arr || []).map((r) => [r.day, r.place, r.text].filter(Boolean).join(' | ')).join('\n');

export default function AdminDashboard({ tours, crew, testimonials }) {
  const [tab, setTab] = useState('tours');
  return (
    <>
      <nav className={styles.tabs} aria-label="Sections">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`${styles.tab} ${tab === t.key ? styles.tabActive : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <div className={styles.tabBody}>
        {tab === 'tours' && <ToursPanel tours={tours} />}
        {tab === 'crew' && <CrewPanel crew={crew} />}
        {tab === 'testimonials' && <TestimonialsPanel items={testimonials} />}
      </div>
    </>
  );
}

/* -------------------------------------------------- shared bits */
function Field({ label, name, defaultValue, type = 'text', full, placeholder }) {
  return (
    <label className={`${styles.field} ${full ? styles.fieldFull : ''}`}>
      <span>{label}</span>
      {type === 'textarea' ? (
        <textarea name={name} defaultValue={defaultValue} rows={4} placeholder={placeholder} />
      ) : (
        <input name={name} type={type} defaultValue={defaultValue} placeholder={placeholder} />
      )}
    </label>
  );
}

function ImageField({ label, name, defaultValue }) {
  const [url, setUrl] = useState(defaultValue || '');
  const [busy, setBusy] = useState(false);
  async function onPick(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const uploaded = await uploadImage(fd);
      setUrl(uploaded);
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <label className={`${styles.field} ${styles.fieldFull}`}>
      <span>{label}</span>
      <input name={name} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://… or upload →" />
      <div className={styles.uploadRow}>
        <input type="file" accept="image/*" onChange={onPick} disabled={busy} />
        {busy && <span className={styles.uploading}>Uploading…</span>}
        {url && <img src={url} alt="" className={styles.thumb} />}
      </div>
    </label>
  );
}

function DeleteButton({ action, id, label = 'this item' }) {
  return (
    <form
      action={action}
      onSubmit={(e) => { if (!confirm(`Delete ${label}? This cannot be undone.`)) e.preventDefault(); }}
      style={{ display: 'inline' }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className={styles.del}>Delete</button>
    </form>
  );
}

/* -------------------------------------------------- TOURS */
function ToursPanel({ tours }) {
  const [editing, setEditing] = useState(null); // tour object or {} for new
  return (
    <div className={styles.panel}>
      <div className={styles.panelHead}>
        <h2>Retreats &amp; Trainings ({tours.length})</h2>
        <button className="btn btn-primary" onClick={() => setEditing({})}>+ Add new</button>
      </div>

      {editing ? (
        <TourForm tour={editing} onDone={() => setEditing(null)} />
      ) : (
        <ul className={styles.cards}>
          {tours.map((t) => (
            <li key={t.id} className={styles.rowCard}>
              {t.image ? <img src={t.image} alt="" className={styles.rowThumb} /> : <div className={styles.rowThumb} />}
              <div className={styles.rowMeta}>
                <strong>{t.name}</strong>
                <em>{t.category === 'training' ? 'Training' : 'Retreat'} · {t.route || '—'} · {t.dates || '—'}</em>
              </div>
              <div className={styles.rowActions}>
                <button className={styles.edit} onClick={() => setEditing(t)}>Edit</button>
                <DeleteButton action={deleteTour} id={t.id} label={`“${t.name}”`} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function TourForm({ tour, onDone }) {
  return (
    <form action={async (fd) => { await saveTour(fd); onDone(); }} className={styles.form}>
      {tour.id ? <input type="hidden" name="id" value={tour.id} /> : null}
      <div className={styles.fields}>
        <Field label="Name" name="name" defaultValue={tour.name} />
        <Field label="Slug (URL, optional)" name="slug" defaultValue={tour.slug} placeholder="auto from name" />
        <Field label="Subtitle" name="subtitle" defaultValue={tour.subtitle} />
        <Field label="Badge" name="badge" defaultValue={tour.badge} placeholder="e.g. Small group · Limited cabins" />
        <label className={styles.field}>
          <span>Type</span>
          <select name="category" defaultValue={tour.category || ''}>
            <option value="">Retreat</option>
            <option value="training">Training</option>
          </select>
        </label>
        <Field label="Route" name="route" defaultValue={tour.route} placeholder="Luxor → Cairo" />
        <Field label="Dates" name="dates" defaultValue={tour.dates} />
        <Field label="Duration" name="duration" defaultValue={tour.duration} />
        <Field label="Price" name="price" defaultValue={tour.price} />
        <Field label="For whom" name="forWhom" defaultValue={tour.forWhom} />
        <ImageField label="Hero image" name="image" defaultValue={tour.image} />
        <ImageField label="Second image" name="image2" defaultValue={tour.image2} />
        <Field label="Blurb (short summary)" name="blurb" defaultValue={tour.blurb} type="textarea" full />
        <Field label="Overview (one paragraph per line)" name="overview" defaultValue={joinLines(tour.overview)} type="textarea" full />
        <Field label="Highlights (one per line)" name="highlights" defaultValue={joinLines(tour.highlights)} type="textarea" full />
        <Field
          label="Itinerary (one per line:  Day | Place | Text)"
          name="itinerary"
          defaultValue={joinItinerary(tour.itinerary)}
          type="textarea"
          full
        />
        <Field label="Includes (one per line)" name="includes" defaultValue={joinLines(tour.includes)} type="textarea" full />
      </div>
      <div className={styles.formActions}>
        <button type="submit" className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-ghost" onClick={onDone}>Cancel</button>
      </div>
    </form>
  );
}

/* -------------------------------------------------- CREW */
function CrewPanel({ crew }) {
  const [editing, setEditing] = useState(null);
  return (
    <div className={styles.panel}>
      <div className={styles.panelHead}>
        <h2>Crew ({crew.length})</h2>
        <button className="btn btn-primary" onClick={() => setEditing({})}>+ Add member</button>
      </div>
      {editing ? (
        <CrewForm member={editing} onDone={() => setEditing(null)} />
      ) : (
        <ul className={styles.cards}>
          {crew.map((m) => (
            <li key={m.id} className={styles.rowCard}>
              {m.photo ? <img src={m.photo} alt="" className={styles.rowThumb} /> : <div className={styles.rowThumb} />}
              <div className={styles.rowMeta}>
                <strong>{m.name} {m.lead ? <span className={styles.leadTag}>Founder</span> : null}</strong>
                <em>{m.role}</em>
              </div>
              <div className={styles.rowActions}>
                <button className={styles.edit} onClick={() => setEditing(m)}>Edit</button>
                <DeleteButton action={deleteCrew} id={m.id} label={`“${m.name}”`} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CrewForm({ member, onDone }) {
  return (
    <form action={async (fd) => { await saveCrew(fd); onDone(); }} className={styles.form}>
      {member.id ? <input type="hidden" name="id" value={member.id} /> : null}
      <div className={styles.fields}>
        <Field label="Name" name="name" defaultValue={member.name} />
        <Field label="Role" name="role" defaultValue={member.role} placeholder="Yoga Teacher · Sound Healer" />
        <ImageField label="Photo" name="photo" defaultValue={member.photo} />
        <Field label="Bio note (optional, shows on founder card)" name="note" defaultValue={member.note} type="textarea" full />
        <label className={styles.checkField}>
          <input type="checkbox" name="isLead" defaultChecked={!!member.lead} />
          <span>Founder (featured first, wide card)</span>
        </label>
      </div>
      <div className={styles.formActions}>
        <button type="submit" className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-ghost" onClick={onDone}>Cancel</button>
      </div>
    </form>
  );
}

/* -------------------------------------------------- TESTIMONIALS */
function TestimonialsPanel({ items }) {
  const [editing, setEditing] = useState(null);
  return (
    <div className={styles.panel}>
      <div className={styles.panelHead}>
        <h2>Testimonials ({items.length})</h2>
        <button className="btn btn-primary" onClick={() => setEditing({})}>+ Add testimonial</button>
      </div>
      {editing ? (
        <TestimonialForm item={editing} onDone={() => setEditing(null)} />
      ) : (
        <ul className={styles.cards}>
          {items.map((t) => (
            <li key={t.id} className={styles.rowCard}>
              <div className={styles.rowMeta}>
                <strong>{t.kind === 'video' ? `🎬 Video · ${t.videoId}` : (t.author || 'Anonymous')}</strong>
                <em>{t.kind === 'video' ? (t.caption || '') : `“${(t.quote || '').slice(0, 80)}…”`}</em>
              </div>
              <div className={styles.rowActions}>
                <button className={styles.edit} onClick={() => setEditing(t)}>Edit</button>
                <DeleteButton action={deleteTestimonial} id={t.id} label="this testimonial" />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function TestimonialForm({ item, onDone }) {
  const [kind, setKind] = useState(item.kind || 'text');
  return (
    <form action={async (fd) => { await saveTestimonial(fd); onDone(); }} className={styles.form}>
      {item.id ? <input type="hidden" name="id" value={item.id} /> : null}
      <div className={styles.fields}>
        <label className={styles.field}>
          <span>Type</span>
          <select name="kind" value={kind} onChange={(e) => setKind(e.target.value)}>
            <option value="text">Written quote</option>
            <option value="video">Video (YouTube)</option>
          </select>
        </label>

        {kind === 'video' ? (
          <>
            <Field label="YouTube video ID" name="videoId" defaultValue={item.videoId} placeholder="e.g. ye27cV8erLY" />
            <Field label="Caption" name="caption" defaultValue={item.caption} full />
          </>
        ) : (
          <>
            <Field label="Quote" name="quote" defaultValue={item.quote} type="textarea" full />
            <Field label="Name" name="author" defaultValue={item.author} />
            <Field label="From (city)" name="origin" defaultValue={item.origin} />
            <Field label="Journey" name="journey" defaultValue={item.journey} />
          </>
        )}
      </div>
      <div className={styles.formActions}>
        <button type="submit" className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-ghost" onClick={onDone}>Cancel</button>
      </div>
    </form>
  );
}
