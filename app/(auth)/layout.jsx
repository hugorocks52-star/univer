export const metadata = {
  title: "ورود به حساب کاربری",
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }) {
  return <main className="min-h-screen bg-secondary/40">{children}</main>;
}
