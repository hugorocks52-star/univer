import Image from "next/image";
import { Download, ExternalLink, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { productCategories } from "@/lib/site-data";

export const metadata = {
  title: "کاتالوگ ابزار جراحی",
  description:
    "کاتالوگ رسمی ابزارهای جراحی Univer شامل ابزار عمومی، تخصصی، ست‌های جراحی و ابزارهای معاینه را مشاهده یا دانلود کنید.",
  alternates: { canonical: "/catalogs" },
  openGraph: {
    title: "کاتالوگ ابزار جراحی Univer",
    description: "مشاهده کد، تصویر و مشخصات محصولات بنیان آتیه جراح.",
    url: "/catalogs",
  },
};

export default function CatalogsPage() {
  return (
    <>
      <section className="border-b bg-card">
        <div className="site-container grid items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div>
            <Badge variant="secondary" className="rounded-full">
              <FileText className="me-2 size-4" />
              نسخه رسمی محصولات
            </Badge>
            <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">کاتالوگ ابزارهای جراحی Univer</h1>
            <p className="mt-6 max-w-2xl leading-8 text-muted-foreground">
              تصویر، کد و مشخصات گروه‌های مختلف ابزار را در نسخه آنلاین بررسی کنید یا فایل کامل را برای استفاده آفلاین دریافت نمایید.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full">
                <a href="/univercat.pdf" download>
                  <Download />
                  دانلود کاتالوگ
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <a href="/univercat.pdf" target="_blank" rel="noreferrer">
                  <ExternalLink />
                  باز کردن در صفحه جدید
                </a>
              </Button>
            </div>
          </div>
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[2rem] border bg-muted shadow-xl">
            <Image src="/image.png" alt="جلد کاتالوگ ابزارهای جراحی Univer" fill sizes="384px" className="object-cover" priority />
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="site-container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">گروه‌های محصول</p>
            <h2 className="mt-3 text-3xl font-black">دسترسی سریع به دامنه محصولات</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {productCategories.map((category) => (
              <Card key={category.title} className="border-0 shadow-sm ring-1 ring-border">
                <CardContent className="p-6">
                  <h3 className="font-bold">{category.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20 lg:pb-28">
        <div className="site-container">
          <div className="overflow-hidden rounded-[1.5rem] border bg-white shadow-sm">
            <div className="flex items-center justify-between border-b bg-secondary/50 px-5 py-4">
              <p className="font-bold">پیش‌نمایش کاتالوگ</p>
              <span className="text-xs text-muted-foreground">PDF</span>
            </div>
            <object
              data="/univercat.pdf"
              type="application/pdf"
              className="h-[72svh] min-h-[36rem] w-full"
              aria-label="پیش‌نمایش کاتالوگ ابزارهای جراحی Univer"
            >
              <div className="p-10 text-center">
                <p>مرورگر شما نمایش مستقیم PDF را پشتیبانی نمی‌کند.</p>
                <Button asChild className="mt-4">
                  <a href="/univercat.pdf">دریافت فایل کاتالوگ</a>
                </Button>
              </div>
            </object>
          </div>
        </div>
      </section>
    </>
  );
}
