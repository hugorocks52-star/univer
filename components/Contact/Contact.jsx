"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Clock3, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { siteConfig } from "@/lib/site-data";
import { toEnglishDigits } from "@/utils/persian";

const formSchema = z.object({
  name: z.string().trim().min(2, "نام باید حداقل ۲ کاراکتر باشد.").max(80, "نام واردشده بیش از حد طولانی است."),
  subject: z.string().trim().min(3, "موضوع باید حداقل ۳ کاراکتر باشد.").max(120, "موضوع واردشده بیش از حد طولانی است."),
  company: z.string().trim().max(120, "نام شرکت بیش از حد طولانی است.").optional(),
  phoneNumber: z
    .string()
    .trim()
    .min(7, "شماره تماس معتبر وارد کنید.")
    .max(20, "شماره تماس معتبر وارد کنید.")
    .refine((value) => /^\+?[0-9۰-۹٠-٩\s-]+$/.test(value), "شماره تماس معتبر وارد کنید."),
  email: z.email("لطفاً یک ایمیل معتبر وارد کنید."),
  message: z.string().trim().min(10, "پیام باید حداقل ۱۰ کاراکتر باشد.").max(2000, "پیام بیش از حد طولانی است."),
});

const contactItems = [
  { icon: Phone, label: "تلفن", value: siteConfig.phoneLabel, href: siteConfig.phoneHref, dir: "ltr" },
  { icon: Mail, label: "ایمیل", value: siteConfig.email, href: `mailto:${siteConfig.email}`, dir: "ltr" },
  { icon: MapPin, label: "نشانی", value: siteConfig.address },
  { icon: Clock3, label: "ساعات پاسخ‌گویی", value: "شنبه تا چهارشنبه، ۸ تا ۱۷" },
];

export default function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      company: "",
      phoneNumber: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, phoneNumber: toEnglishDigits(values.phoneNumber) }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error);

      toast({
        title: "پیام شما ارسال شد",
        description: "کارشناسان ما در اولین فرصت با شما تماس می‌گیرند.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "ارسال پیام انجام نشد",
        description: error.message || "لطفاً کمی بعد دوباره تلاش کنید.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <section className="border-b bg-card">
        <div className="site-container py-16 text-center sm:py-20">
          <p className="eyebrow">در ارتباط باشیم</p>
          <h1 className="mt-3 text-4xl font-black sm:text-5xl">چطور می‌توانیم کمک کنیم؟</h1>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-muted-foreground">
            برای دریافت کاتالوگ، مشاوره انتخاب محصول یا پیگیری خدمات پس از فروش، فرم را تکمیل کنید.
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="site-container grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <aside className="space-y-4" aria-label="اطلاعات تماس">
            {contactItems.map((item) => (
              <Card key={item.label} className="border-0 shadow-sm ring-1 ring-border">
                <CardContent className="flex items-start gap-4 p-5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <item.icon className="size-5" />
                  </span>
                  <div>
                    <h2 className="text-sm font-semibold text-muted-foreground">{item.label}</h2>
                    {item.href ? (
                      <a href={item.href} dir={item.dir} className="mt-1 block font-medium hover:text-primary">
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 leading-7">{item.value}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </aside>

          <Card className="border-0 shadow-sm ring-1 ring-border">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-2xl font-black">ارسال پیام</h2>
              <p className="mt-2 text-sm text-muted-foreground">فیلدهای ستاره‌دار الزامی هستند.</p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 grid gap-5 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>نام و نام خانوادگی *</FormLabel>
                        <FormControl><Input autoComplete="name" placeholder="نام شما" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>سازمان یا مرکز درمانی</FormLabel>
                        <FormControl><Input autoComplete="organization" placeholder="نام مجموعه" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>شماره تماس *</FormLabel>
                        <FormControl><Input dir="ltr" inputMode="tel" autoComplete="tel" placeholder="0912 000 0000" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ایمیل *</FormLabel>
                        <FormControl><Input dir="ltr" type="email" autoComplete="email" placeholder="name@example.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>موضوع *</FormLabel>
                        <FormControl><Input placeholder="موضوع درخواست" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>متن پیام *</FormLabel>
                        <FormControl><Textarea rows={6} placeholder="جزئیات درخواست خود را بنویسید..." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="md:col-span-2" disabled={isSubmitting}>
                    <Send />
                    {isSubmitting ? "در حال ارسال..." : "ارسال پیام"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
