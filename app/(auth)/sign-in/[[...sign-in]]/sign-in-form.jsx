"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoaderCircle, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.email("ایمیل معتبر وارد کنید."),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد."),
});

export default function SignInForm() {
  const { signIn, isLoaded, setActive } = useSignIn();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values) {
    if (!isLoaded) return;
    setIsSubmitting(true);
    try {
      const result = await signIn.create({ identifier: values.email, password: values.password });
      if (result.status !== "complete" || !result.createdSessionId) {
        throw new Error("فرایند ورود کامل نشد.");
      }
      await setActive({ session: result.createdSessionId });
      router.push("/panel");
    } catch (error) {
      toast({
        title: "ورود ناموفق بود",
        description: error.errors?.[0]?.longMessage || error.message || "اطلاعات ورود را بررسی کنید.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="border-0 shadow-xl ring-1 ring-border">
      <CardHeader className="items-center text-center">
        <Link href="/" className="mb-3 flex h-14 w-28 items-center rounded-lg border bg-white px-2">
          <Image src="/univerp.jpg" width={153} height={66} alt="Univer" className="h-auto w-full" />
        </Link>
        <CardTitle className="text-2xl font-black">ورود به حساب کاربری</CardTitle>
        <CardDescription>برای دسترسی به پنل مدیریت وارد شوید.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ایمیل</FormLabel>
                  <FormControl><Input dir="ltr" type="email" autoComplete="email" placeholder="name@example.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رمز عبور</FormLabel>
                  <FormControl><Input dir="ltr" type="password" autoComplete="current-password" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting || !isLoaded}>
              {isSubmitting ? <LoaderCircle className="animate-spin" /> : <LogIn />}
              {isSubmitting ? "در حال ورود..." : "ورود"}
            </Button>
          </form>
        </Form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          حساب کاربری ندارید؟ <Link href="/sign-up" className="font-semibold text-primary hover:underline">ثبت‌نام</Link>
        </p>
      </CardContent>
    </Card>
  );
}
