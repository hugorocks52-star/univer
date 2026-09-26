import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, CheckCircle2, ShieldCheck, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "دانشنامه ابزار جراحی",
  description:
    "راهنمای انتخاب، نگهداری، کنترل کیفیت و افزایش طول عمر ابزارهای جراحی برای بیمارستان‌ها و مراکز درمانی.",
  alternates: { canonical: "/articles" },
  openGraph: {
    title: "دانشنامه ابزار جراحی Univer",
    description: "نکات کاربردی برای انتخاب و نگهداری ابزار جراحی.",
    url: "/articles",
  },
};

const articles = [
  {
    icon: ShieldCheck,
    category: "کنترل کیفیت",
    title: "چرا جنس استنلس استیل در ابزار جراحی اهمیت دارد؟",
    description: "ترکیب آلیاژ، سختی، مقاومت در برابر خوردگی و کیفیت پرداخت سطح، عملکرد و طول عمر ابزار را تعیین می‌کند.",
    image: "/05.jpg",
  },
  {
    icon: Wrench,
    category: "نگهداری",
    title: "اصول مراقبت از ابزار جراحی پس از هر بار استفاده",
    description: "پاک‌سازی به‌موقع، بررسی مفاصل و لبه‌ها و رعایت چرخه صحیح استریلیزاسیون از آسیب زودهنگام جلوگیری می‌کند.",
    image: "/02.JPG",
  },
  {
    icon: CheckCircle2,
    category: "راهنمای انتخاب",
    title: "چک‌لیست ارزیابی یک ست جراحی حرفه‌ای",
    description: "هماهنگی قطعات، ارگونومی، قابلیت ردیابی و خدمات پس از فروش را پیش از انتخاب یک ست کامل بررسی کنید.",
    image: "/03.JPG",
  },
];

export default function ArticlesPage() {
  return (
    <>
      <section className="border-b bg-card">
        <div className="site-container py-16 text-center sm:py-20 lg:py-24">
          <Badge variant="secondary" className="rounded-full">
            <BookOpen className="me-2 size-4" />
            دانشنامه Univer
          </Badge>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
            دانش کاربردی برای انتخاب و نگهداری بهتر ابزار جراحی
          </h1>
          <p className="mx-auto mt-6 max-w-2xl leading-8 text-muted-foreground">
            مجموعه‌ای فشرده از نکات فنی برای مدیران تجهیزات پزشکی، کارشناسان CSSD و تیم‌های اتاق عمل.
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="site-container grid gap-6 lg:grid-cols-3">
          {articles.map((article) => (
            <Card key={article.title} className="overflow-hidden border-0 shadow-sm ring-1 ring-border">
              <article className="h-full">
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <article.icon className="size-4" />
                    {article.category}
                  </div>
                  <h2 className="mt-4 text-xl font-bold leading-8">{article.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{article.description}</p>
                </CardContent>
              </article>
            </Card>
          ))}
        </div>
      </section>

      <section className="pb-16 sm:pb-20 lg:pb-28">
        <div className="site-container">
          <div className="flex flex-col items-start gap-6 rounded-[2rem] border bg-secondary/50 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-black">برای انتخاب ابزار مناسب به راهنمایی نیاز دارید؟</h2>
              <p className="mt-3 text-muted-foreground">کارشناسان ما برای بررسی نیاز مرکز درمانی شما در دسترس هستند.</p>
            </div>
            <Button asChild size="lg" className="shrink-0 rounded-full">
              <Link href="/contact">
                مشاوره با ما
                <ArrowLeft />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
