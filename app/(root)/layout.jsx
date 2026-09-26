import Footer from "@/components/shared/Footer";
import Nav from "@/components/shared/Nav";

export default function PublicLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
