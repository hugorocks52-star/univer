import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, HeartHandshake, Lightbulb, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "درباره ما",
  description:
    "با بنیان آتیه جراح، تولیدکننده ابزار جراحی Univer، مسیر شکل‌گیری، استانداردهای کیفی و رویکرد مشتری‌محور ما آشنا شوید.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "درباره بنیان آتیه جراح",
    description: "مهندسی، پژوهش و تولید ابزار جراحی با برند Univer.",
    url: "/about",
  },
};

const values = [
  {
    icon: Lightbulb,
    title: "نوآوری کاربردی",
    description: "توسعه محصول بر اساس نیاز واقعی جراحان و مراکز درمانی.",
  },
  {
    icon: BadgeCheck,
    title: "کیفیت پایدار",
    description: "کنترل دقیق مواد اولیه، تولید و عملکرد محصول نهایی.",
  },
  {
    icon: HeartHandshake,
    title: "تعهد به مشتری",
    description: "پشتیبانی روشن، پاسخ‌گویی سریع و گارانتی معتبر تعویض.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b bg-card">
        <div className="site-container grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <Badge variant="secondary" className="rounded-full">درباره Univer</Badge>
            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              ساخت ابزار دقیق، با نگاه به آینده جراحی
            </h1>
            <p className="mt-6 text-lg leading-9 text-muted-foreground">
              گروه بنیان آتیه جراح با هدف ایجاد واحد مهندسی، تحقیق و تولید ابزار جراحی عمومی و تخصصی شکل گرفت؛ مجموعه‌ای که دانش متخصصان داخلی و خارجی را با روش‌های روز تولید پیوند می‌دهد.
            </p>
            <Button asChild size="lg" className="mt-8 rounded-full">
              <Link href="/contact">
                گفتگو با تیم ما
                <ArrowLeft />
              </Link>
            </Button>
          </div>
          <div className="relative min-h-[28rem] overflow-hidden rounded-[2rem] border bg-muted">
            <Image
              src="/Robotoperatingonpatient.jpg"
              alt="فناوری و تجهیزات پیشرفته در اتاق عمل"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="site-container grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="eyebrow">مسیر ما</p>
            <h2 className="mt-3 text-3xl font-black">از ایده تا اعتماد بیمارستان‌ها</h2>
          </div>
          <div className="space-y-8 border-s ps-8 sm:ps-10">
            {[
              ["آغاز", "تشکیل گروهی تخصصی برای ارتقای تولید ابزار جراحی و تجهیزات پزشکی در ایران."],
              ["توسعه", "به‌کارگیری استنلس استیل منتخب، روش‌های دقیق کنترل کیفیت و تجربه متخصصان حوزه پزشکی."],
              ["امروز", "عرضه محصولات Univer در بیش از پانصد بیمارستان و دریافت تأییدیه‌ها و استانداردهای کیفی."],
            ].map(([title, description], index) => (
              <div key={title} className="relative">
                <span className="absolute -start-[2.58rem] top-1 flex size-5 items-center justify-center rounded-full bg-background ring-4 ring-primary/15 sm:-start-[3.08rem]">
                  <span className="size-2 rounded-full bg-primary" />
                </span>
                <p className="text-sm font-semibold text-primary">مرحله {index + 1}</p>
                <h3 className="mt-1 text-xl font-bold">{title}</h3>
                <p className="mt-3 max-w-2xl leading-8 text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing border-y bg-secondary/40">
        <div className="site-container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">ارزش‌های ما</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">کیفیت فقط یک مشخصه نیست؛ روش کار ماست</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map((value) => (
              <Card key={value.title} className="border-0 shadow-sm ring-1 ring-border">
                <CardContent className="p-7">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <value.icon />
                  </span>
                  <h3 className="mt-6 text-xl font-bold">{value.title}</h3>
                  <p className="mt-3 leading-8 text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="site-container">
          <div className="rounded-[2rem] bg-primary px-6 py-12 text-primary-foreground sm:px-12 lg:flex lg:items-center lg:justify-between lg:px-16">
            <div className="max-w-2xl">
              <ShieldCheck className="size-9" />
              <h2 className="mt-5 text-3xl font-black">گارانتی سه‌ساله بدون قید و شرط تعویض</h2>
              <p className="mt-4 leading-8 text-primary-foreground/80">
                تعهد ما پس از فروش ادامه دارد تا مصرف‌کننده با آرامش و اطمینان از محصولات Univer استفاده کند.
              </p>
            </div>
            <Button asChild variant="secondary" size="lg" className="mt-8 rounded-full lg:mt-0">
              <Link href="/catalogs">مشاهده کاتالوگ</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
