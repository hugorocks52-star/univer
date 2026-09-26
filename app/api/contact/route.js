import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { toEnglishDigits } from "@/utils/persian";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  subject: z.string().trim().min(3).max(120),
  company: z.string().trim().max(120).optional().default(""),
  phoneNumber: z.string().trim().min(7).max(20),
  email: z.email().max(254),
  message: z.string().trim().min(10).max(2000),
});

async function requireAdmin() {
  const { userId, sessionClaims } = await auth();
  const role = sessionClaims?.metadata?.role ?? sessionClaims?.role;
  return Boolean(userId && role === "admin");
}

export async function POST(request) {
  try {
    const parsed = contactSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "اطلاعات فرم معتبر نیست." }, { status: 400 });
    }

    const data = {
      ...parsed.data,
      phoneNumber: toEnglishDigits(parsed.data.phoneNumber).replace(/[\s-]/g, ""),
    };

    await dbConnect();
    await Contact.create(data);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Contact submission failed:", error);
    return NextResponse.json({ error: "ارسال پیام با مشکل مواجه شد." }, { status: 500 });
  }
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "دسترسی مجاز نیست." }, { status: 403 });
  }

  try {
    await dbConnect();
    const contacts = await Contact.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(contacts);
  } catch (error) {
    console.error("Fetching contacts failed:", error);
    return NextResponse.json({ error: "دریافت پیام‌ها با مشکل مواجه شد." }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "دسترسی مجاز نیست." }, { status: 403 });
  }

  const id = new URL(request.url).searchParams.get("id");
  if (!id || !/^[a-f\d]{24}$/i.test(id)) {
    return NextResponse.json({ error: "شناسه پیام معتبر نیست." }, { status: 400 });
  }

  try {
    await dbConnect();
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return NextResponse.json({ error: "پیام پیدا نشد." }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Deleting contact failed:", error);
    return NextResponse.json({ error: "حذف پیام با مشکل مواجه شد." }, { status: 500 });
  }
}
