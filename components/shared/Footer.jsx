import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { navigationItems, siteConfig } from "@/lib/site-data";
import { formatPersianYear } from "@/utils/persian";

export default function Footer() {
  return (
    <footer className="border-t bg-secondary/35">
      <div className="site-container py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr_1fr]">
          <div className="max-w-md">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-14 w-28 items-center rounded-lg border bg-white px-2">
                <Image src="/univerp.jpg" width={153} height={66} alt="نشان Univer" className="h-auto w-full" />
              </span>
              <span className="font-bold">{siteConfig.name}</span>
            </Link>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">{siteConfig.description}</p>
          </div>

          <div>
            <h2 className="text-sm font-bold">دسترسی سریع</h2>
            <ul className="mt-5 grid gap-3 text-sm text-muted-foreground">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-primary">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold">ارتباط مستقیم</h2>
            <ul className="mt-5 grid gap-4 text-sm text-muted-foreground">
              <li>
                <a href={siteConfig.phoneHref} className="flex items-center gap-3 hover:text-primary">
                  <Phone className="size-4 shrink-0" />
                  <span dir="ltr">{siteConfig.phoneLabel}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 hover:text-primary">
                  <Mail className="size-4 shrink-0" />
                  <span dir="ltr">{siteConfig.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 size-4 shrink-0" />
                <span className="leading-7">{siteConfig.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />
        <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {formatPersianYear(new Date().getFullYear())} {siteConfig.name}. تمامی حقوق محفوظ است.</p>
          <p lang="en" dir="ltr">Univer Surgical Instruments</p>
        </div>
      </div>
    </footer>
  );
}
