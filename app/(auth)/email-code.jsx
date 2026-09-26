"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { LoaderCircle, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "@/hooks/use-toast";

export function EmailCode() {
  const router = useRouter();
  const { signUp, isLoaded, setActive } = useSignUp();
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");

  async function verifyCode() {
    if (!isLoaded || otp.length !== 6) return;
    setIsLoading(true);
    try {
      const result = await signUp.attemptEmailAddressVerification({ code: otp });
      if (result.status !== "complete" || !result.createdSessionId) {
        throw new Error("کد واردشده تأیید نشد.");
      }
      await setActive({ session: result.createdSessionId });
      router.push("/");
    } catch (error) {
      toast({
        title: "تأیید کد انجام نشد",
        description: error.errors?.[0]?.longMessage || error.message,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }

  async function resendCode() {
    if (!isLoaded) return;
    try {
      await signUp.prepareEmailAddressVerification();
      toast({ title: "کد جدید ارسال شد", description: "ایمیل خود را بررسی کنید." });
    } catch {
      toast({ title: "ارسال مجدد ناموفق بود", variant: "destructive" });
    }
  }

  return (
    <Card className="border-0 shadow-xl ring-1 ring-border">
      <CardHeader className="items-center text-center">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <MailCheck />
        </span>
        <CardTitle className="text-2xl font-black">تأیید ایمیل</CardTitle>
        <CardDescription>کد شش‌رقمی ارسال‌شده به ایمیل خود را وارد کنید.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(event) => { event.preventDefault(); verifyCode(); }} className="space-y-6">
          <div dir="ltr" className="flex justify-center">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={isLoading || otp.length !== 6}>
            {isLoading && <LoaderCircle className="animate-spin" />}
            تأیید و ادامه
          </Button>
        </form>
        <Button variant="link" className="mt-4 w-full" onClick={resendCode}>ارسال مجدد کد</Button>
      </CardContent>
    </Card>
  );
}
