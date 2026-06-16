export const metadata = {
  title: 'Admin Dashboard',
  robots: { index: false, follow: false }, // keep the admin area out of search
};

export default function AdminLayout({ children }) {
  return children;
}
