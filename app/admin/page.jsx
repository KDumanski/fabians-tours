import { redirect } from 'next/navigation';
import { auth, signOut } from '@/auth';
import { getTours, getCrew, getTestimonials } from '@/lib/data';
import AdminDashboard from './AdminDashboard';
import styles from './admin.module.css';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin Dashboard',
  robots: { index: false, follow: false },
};

// Server component: gate on the real session, load live data from the DB, hand it to
// the interactive dashboard. All edits go through server actions (app/admin/actions.js).
export default async function AdminPage() {
  const session = await auth();
  if (!session?.isAdmin) redirect('/admin/login');

  const [tours, crew, testimonials] = await Promise.all([
    getTours(),
    getCrew(),
    getTestimonials(),
  ]);

  return (
    <div className={styles.dash}>
      <header className={styles.bar}>
        <div className={styles.brand}>
          <span className={styles.ankh} aria-hidden="true">&#x2625;</span>
          <span>Oceanic Ventures · <strong>Dashboard</strong></span>
        </div>
        <div className={styles.barActions}>
          <span className={styles.who}>{session.user?.email}</span>
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/admin/login' });
            }}
          >
            <button type="submit" className={styles.logout}>Log out</button>
          </form>
        </div>
      </header>

      <AdminDashboard
        tours={tours}
        crew={crew}
        testimonials={[...testimonials.video, ...testimonials.text].map((x) =>
          x.videoId !== undefined
            ? { id: x.id, kind: 'video', videoId: x.videoId, caption: x.caption }
            : { id: x.id, kind: 'text', quote: x.quote, author: x.name, origin: x.from, journey: x.journey }
        )}
      />
    </div>
  );
}
