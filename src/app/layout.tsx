import type { Metadata, Viewport } from "next";
import {
  Inter,
  Outfit,
  Antonio,
  Barlow,
  Kanit,
} from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-header",
});

const antonio = Antonio({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-poster",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-old-poster",
});

export const metadata: Metadata = {
  title: "Uday G — Full-Stack Freelancer",
  description:
    "Uday G builds websites and AI automations that save businesses hours every week. Full-stack developer based in Bengaluru.",
  keywords:
    "Uday G, Full-Stack Freelancer, Web Developer, AI Automation, Next.js, React, Bengaluru",
  authors: [{ name: "Uday G" }],
  openGraph: {
    type: "website",
    title: "Uday G — Full-Stack Freelancer",
    description:
      "Websites and AI automations that actually work. Based in Bengaluru.",
    siteName: "Uday G",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uday G — Full-Stack Freelancer",
    description:
      "Websites and AI automations that save businesses hours every week. Based in Bengaluru.",
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%230a0a0a'/><text x='50' y='72' font-size='60' font-family='sans-serif' font-weight='bold' fill='%23da2727' text-anchor='middle'>U</text></svg>",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${antonio.variable} ${barlow.variable} ${kanit.variable} lenis`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}