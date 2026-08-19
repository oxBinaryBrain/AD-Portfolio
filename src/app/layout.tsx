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
  title: "Andrew Dominic M — Product-Focused Developer",
  description:
    "Andrew Dominic M is a Product-Focused Developer building high-performance systems for real businesses. E-commerce, event platforms, and autonomous systems — shipped and scaled.",
  keywords:
    "Andrew Dominic M, Product-Focused Developer, Full-Stack Developer, Next.js, React, Node.js, Portfolio, Web Developer India",
  authors: [{ name: "Andrew Dominic M" }],
  openGraph: {
    type: "website",
    title: "Andrew Dominic M — Product-Focused Developer",
    description:
      "Building systems that actually work. Full-stack developer shipping production platforms for real businesses.",
    siteName: "Andrew Dominic M",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andrew Dominic M — Product-Focused Developer",
    description:
      "Building systems that actually work. Full-stack developer shipping production platforms for real businesses.",
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%230a0a0a'/><text x='50' y='72' font-size='60' font-family='sans-serif' font-weight='bold' fill='white' text-anchor='middle'>A</text></svg>",
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