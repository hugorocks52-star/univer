"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoaderCircle, UserPlus } from "lucide-react";
import { EmailCode } from "../../email-code";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  username: z.string().trim().min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد.").max(30, "نام کاربری بیش از حد طولانی است."),
  email: z.email("ایمیل معتبر وارد کنید."),
  password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد."),
});

export default function SignUpForm() {
  const { isLoaded, signUp } = useSignUp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", email: "", password: "" },
  });

  async function onSubmit(values) {
    if (!isLoaded) return;
    setIsSubmitting(true);
    try {
      await signUp.create({
        emailAddress: values.email,
        password: values.password,
        username: values.username,
      });
      await signUp.prepareEmailAddressVerification();
      setOtpStep(true);
    } catch (error) {
      toast({
        title: "ثبت‌نام انجام نشد",
        description: error.errors?.[0]?.longMessage || "اطلاعات واردشده را بررسی کنید.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (otpStep) return <EmailCode />;

  return (
    <Card className="border-0 shadow-xl ring-1 ring-border">
      <CardHeader className="items-center text-center">
        <Link href="/" className="mb-3 flex h-14 w-28 items-center rounded-lg border bg-white px-2">
          <Image src="/univerp.jpg" width={153} height={66} alt="Univer" className="h-auto w-full" />
        </Link>
        <CardTitle className="text-2xl font-black">ایجاد حساب کاربری</CardTitle>
        <CardDescription>اطلاعات خود را برای ساخت حساب وارد کنید.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField control={form.control} name="username" render={({ field }) => (
              <FormItem><FormLabel>نام کاربری</FormLabel><FormControl><Input autoComplete="username" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem><FormLabel>ایمیل</FormLabel><FormControl><Input dir="ltr" type="email" autoComplete="email" placeholder="name@example.com" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem><FormLabel>رمز عبور</FormLabel><FormControl><Input dir="ltr" type="password" autoComplete="new-password" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting || !isLoaded}>
              {isSubmitting ? <LoaderCircle className="animate-spin" /> : <UserPlus />}
              {isSubmitting ? "در حال ثبت‌نام..." : "ثبت‌نام"}
            </Button>
          </form>
        </Form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          قبلاً ثبت‌نام کرده‌اید؟ <Link href="/sign-in" className="font-semibold text-primary hover:underline">ورود</Link>
        </p>
      </CardContent>
    </Card>
  );
}
