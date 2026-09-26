import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import "@fontsource-variable/vazirmatn";
import "./globals.css";

const siteDescription =
  "بنیان آتیه جراح، تولیدکننده ابزار جراحی عمومی و تخصصی با برند Univer، استانداردهای بین‌المللی و گارانتی سه‌ساله.";

export const metadata = {
  metadataBase: new URL("https://universurgical.ir"),
  title: {
    default: "بنیان آتیه جراح | تولیدکننده ابزار جراحی Univer",
    template: "%s | بنیان آتیه جراح",
  },
  description: siteDescription,
  applicationName: "Univer Surgical Instruments",
  authors: [{ name: "بنیان آتیه جراح" }],
  creator: "بنیان آتیه جراح",
  publisher: "بنیان آتیه جراح",
  category: "تجهیزات پزشکی",
  keywords: [
    "ابزار جراحی",
    "تجهیزات پزشکی",
    "ست جراحی",
    "ابزار جراحی ایرانی",
    "بنیان آتیه جراح",
    "Univer",
    "Surgical Instruments",
  ],
  alternates: {
    canonical: "/",
    languages: { "fa-IR": "/" },
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "/",
    siteName: "بنیان آتیه جراح",
    title: "بنیان آتیه جراح | ابزار جراحی Univer",
    description: siteDescription,
    images: [
      {
        url: "/05.jpg",
        width: 1200,
        height: 690,
        alt: "مجموعه ابزارهای جراحی برند Univer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "بنیان آتیه جراح | ابزار جراحی Univer",
    description: siteDescription,
    images: ["/05.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#a91d2d",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html
        dir="rtl"
        lang="fa-IR"
        data-scroll-behavior="smooth"
        className="scroll-smooth"
      >
        <body>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
