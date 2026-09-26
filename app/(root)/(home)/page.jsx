import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  Building2,
  CheckCircle2,
  Download,
  Microscope,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { productCategories, siteConfig } from "@/lib/site-data";
import { formatPersianNumber, toPersianDigits } from "@/utils/persian";

const standards = [
  "مواد اولیه استنلس استیل منتخب",
  "کنترل کیفیت مرحله‌به‌مرحله",
  "گارانتی تعویض سه‌ساله",
];

export default function HomePage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: siteConfig.name,
    alternateName: "Univer Surgical Instruments",
    url: siteConfig.url,
    logo: `${siteConfig.url}/univerp.jpg`,
    image: `${siteConfig.url}/05.jpg`,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: "+982188348958",
    address: {
      "@type": "PostalAddress",
      streetAddress: "خیابان میرزای شیرازی، پلاک ۸۳، طبقه اول، واحد A۳",
      addressLocality: "تهران",
      addressCountry: "IR",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <section className="relative min-h-[calc(100svh-5rem)] overflow-hidden border-b bg-slate-950 text-white">
        <Image
          src="/05.jpg"
          alt="مجموعه ابزارهای جراحی فلزی برند Univer"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-slate-950/35" />
        <div className="site-container relative z-10 flex min-h-[calc(100svh-5rem)] items-center py-12 sm:py-16">
          <div className="w-full max-w-2xl rounded-[2rem] border border-white/15 bg-slate-950/75 p-6 shadow-2xl shadow-black/30 backdrop-blur-md sm:p-9 lg:p-12">
            <p className="mb-4 text-sm font-semibold text-red-300">شرکت بنیان آتیه جراح | Univer</p>
            <h1 className="text-4xl font-black leading-[1.35] tracking-tight sm:text-5xl lg:text-6xl">
              دقتی که جراح به آن{" "}
              <span className="block text-red-300">اعتماد می‌کند</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/80 sm:text-lg">
              تولید ابزار جراحی عمومی و تخصصی با برند Univer؛ حاصل مهندسی دقیق، مواد اولیه منتخب و کنترل کیفیت مستمر برای مراکز درمانی سراسر ایران.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-full px-6">
                <Link href="/catalogs">
                  مشاهده محصولات
                  <ArrowLeft />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-full border-white/40 bg-white/10 px-6 text-white hover:bg-white hover:text-slate-950"
              >
                <Link href="/contact">دریافت مشاوره</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/75">
              {standards.map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-red-300" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-secondary/40" aria-label="آمار و دستاوردها">
        <div className="site-container grid divide-y sm:grid-cols-3 sm:divide-x sm:divide-x-reverse sm:divide-y-0">
          {[
            { icon: Building2, value: `${formatPersianNumber(500)}+`, label: "بیمارستان مصرف‌کننده" },
            { icon: ShieldCheck, value: toPersianDigits(3), label: "سال گارانتی تعویض" },
            { icon: Award, value: toPersianDigits(3), label: "استاندارد و تأییدیه کیفی" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center justify-center gap-4 px-5 py-8">
              <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <stat.icon className="size-5" />
              </span>
              <div>
                <strong className="block text-2xl font-black">{stat.value}</strong>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-spacing">
        <div className="site-container">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">دامنه محصولات</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">برای هر مرحله از جراحی، ابزار مناسب</h2>
              <p className="mt-4 leading-8 text-muted-foreground">
                محصولات Univer برای نیازهای عمومی و تخصصی طراحی شده‌اند و جزئیات هر قطعه در کاتالوگ رسمی در دسترس است.
              </p>
            </div>
            <Button asChild variant="outline" className="w-fit rounded-full">
              <Link href="/catalogs">
                همه محصولات
                <ArrowLeft />
              </Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {productCategories.map((category, index) => (
              <Card key={category.title} className="group overflow-hidden border-0 bg-card shadow-sm ring-1 ring-border">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <Badge className="absolute start-4 top-4 rounded-full bg-white/90 text-foreground hover:bg-white">
                    {toPersianDigits(index + 1).padStart(2, "۰")}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-bold">{category.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing border-y bg-slate-950 text-white">
        <div className="site-container grid items-center gap-12 lg:grid-cols-2">
          <div className="relative min-h-[32rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-white">
            <Image
              src="/07.png"
              alt="نمونه ابزار جراحی تخصصی Univer"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-red-300">کیفیت قابل ردیابی</p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">از انتخاب آلیاژ تا آخرین مرحله کنترل کیفیت</h2>
            <p className="mt-6 leading-8 text-slate-300">
              ابزارهای Univer با بهره‌گیری از استنلس استیل مارتنزیتی و روش‌های دقیق تولید ساخته می‌شوند. فرایند کنترل کیفیت برای دستیابی به دوام، ارگونومی و عملکرد یکنواخت در هر قطعه طراحی شده است.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                [Microscope, "کنترل دقیق", "بازبینی مشخصات فنی در مراحل تولید"],
                [Award, "استاندارد جهانی", "ISO 13485، ISO 9001 و نشان CE اروپا"],
              ].map(([Icon, title, description]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Icon className="size-6 text-red-300" />
                  <h3 className="mt-4 font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
                </div>
              ))}
            </div>
            <Button asChild variant="secondary" size="lg" className="mt-8 rounded-full">
              <Link href="/about">
                داستان و استانداردهای ما
                <ArrowLeft />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="site-container">
          <div className="relative overflow-hidden rounded-[2rem] border bg-card px-6 py-12 shadow-sm sm:px-12 lg:px-16 lg:py-16">
            <div className="absolute inset-y-0 start-0 w-1.5 bg-primary" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="eyebrow">کاتالوگ رسمی Univer</p>
                <h2 className="mt-3 text-3xl font-black sm:text-4xl">کد، تصویر و مشخصات ابزارها در یک مجموعه</h2>
                <p className="mt-4 leading-8 text-muted-foreground">
                  کاتالوگ محصولات را آنلاین مرور کنید یا نسخه PDF را برای بررسی و سفارش دانلود نمایید.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/catalogs">مرور کاتالوگ</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <a href="/univercat.pdf" download>
                    <Download />
                    دانلود PDF
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
