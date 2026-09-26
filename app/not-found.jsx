import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="site-container flex min-h-screen flex-col items-center justify-center py-16 text-center">
      <p className="text-7xl font-black text-primary">۴۰۴</p>
      <h1 className="mt-6 text-3xl font-black">این صفحه پیدا نشد</h1>
      <p className="mt-4 text-muted-foreground">ممکن است نشانی صفحه تغییر کرده باشد.</p>
      <Button asChild className="mt-8 rounded-full">
        <Link href="/">بازگشت به صفحه اصلی</Link>
      </Button>
    </main>
  );
}
