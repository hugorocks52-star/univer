"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import { LogIn, Menu, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigationItems, siteConfig } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export default function Nav() {
  const pathname = usePathname();
  const { isSignedIn, user } = useUser();
  const { signOut } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur-xl">
      <div className="site-container flex h-20 items-center justify-between gap-5">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="صفحه اصلی بنیان آتیه جراح">
          <span className="flex h-12 w-24 items-center justify-center overflow-hidden rounded-lg border bg-white px-2">
            <Image
              src="/univerp.jpg"
              width={153}
              height={66}
              alt="Univer Surgical Instruments"
              className="h-auto w-full"
              priority
            />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-bold">{siteConfig.name}</span>
            <span className="text-xs text-muted-foreground">تجهیزات پزشکی و ابزار جراحی</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="ناوبری اصلی">
          {navigationItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Button key={item.href} asChild variant="ghost" size="sm">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(active && "bg-accent text-accent-foreground")}
                >
                  {item.title}
                </Link>
              </Button>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="outline" size="sm">
            <a href={siteConfig.phoneHref} dir="ltr">
              <Phone />
              {siteConfig.phoneLabel}
            </a>
          </Button>
          {isSignedIn ? (
            <>
              {user?.publicMetadata?.role === "admin" && (
                <Button asChild size="sm">
                  <Link href="/panel">
                    <ShieldCheck />
                    پنل مدیریت
                  </Link>
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={() => signOut()}>
                خروج
              </Button>
            </>
          ) : (
            <Button asChild size="sm">
              <Link href="/sign-in">
                <LogIn />
                ورود
              </Link>
            </Button>
          )}
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden" aria-label="باز کردن منو">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[min(88vw,22rem)] px-5">
            <SheetHeader className="text-right">
              <SheetTitle>منوی سایت</SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-2" aria-label="ناوبری موبایل">
              {navigationItems.map((item) => (
                <Button
                  key={item.href}
                  asChild
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className="justify-start text-base"
                  onClick={() => setOpen(false)}
                >
                  <Link href={item.href}>{item.title}</Link>
                </Button>
              ))}
              <Button asChild variant="outline" className="mt-4 justify-center">
                <a href={siteConfig.phoneHref} dir="ltr">
                  <Phone />
                  {siteConfig.phoneLabel}
                </a>
              </Button>
              {isSignedIn ? (
                <Button variant="ghost" onClick={() => signOut()}>
                  خروج از حساب
                </Button>
              ) : (
                <Button asChild onClick={() => setOpen(false)}>
                  <Link href="/sign-in">
                    <LogIn />
                    ورود به حساب
                  </Link>
                </Button>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
