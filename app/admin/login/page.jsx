import { redirect } from 'next/navigation';
import { auth, signIn } from '@/auth';
import styles from '../admin.module.css';

export const metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
};

export default async function LoginPage({ searchParams }) {
  const session = await auth();
  if (session?.isAdmin) redirect('/admin');
  const params = await searchParams;
  const error = params?.error;

  return (
    <div className={styles.loginWrap}>
      <div className={styles.loginCard}>
        <span className={styles.ankh} aria-hidden="true">&#x2625;</span>
        <h1 className={styles.loginTitle}>Keeper&rsquo;s Gate</h1>
        <p className={styles.loginSub}>Oceanic Ventures — Admin Dashboard</p>

        {error ? (
          <p className={styles.err} role="alert">
            {error === 'AccessDenied'
              ? 'That Google account is not on the admin list.'
              : 'Sign-in failed. Please try again.'}
          </p>
        ) : null}

        <form
          action={async () => {
            'use server';
            await signIn('google', { redirectTo: '/admin' });
          }}
        >
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Sign in with Google
          </button>
        </form>

        <p className={styles.notice}>
          Only approved Oceanic Ventures accounts can enter. Sign in with the Google
          account you were given access with.
        </p>
      </div>
    </div>
  );
}
