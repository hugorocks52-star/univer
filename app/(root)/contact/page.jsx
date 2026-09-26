import ContactForm from "@/components/Contact/Contact";

export const metadata = {
  title: "تماس با ما",
  description:
    "برای مشاوره خرید، دریافت اطلاعات محصولات و ارتباط با شرکت بنیان آتیه جراح با ما تماس بگیرید.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "تماس با بنیان آتیه جراح",
    description: "مشاوره و پاسخ‌گویی درباره ابزارهای جراحی Univer.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
