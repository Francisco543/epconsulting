import type { Metadata } from "next";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/ui/CustomCursor";
import { JsonLd } from "./components/ui/JsonLd";
import { Analytics } from "@vercel/analytics/next";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  KEYWORDS,
} from "./lib/site";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Compliance, PLA/FT y REI en Argentina`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Compliance, PLA/FT y REI en Argentina`,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Revisor Externo Independiente UIF`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Compliance y Prevención de Lavado de Activos`,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
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
  // Añadir verification cuando tengas códigos: verification: { google: "...", yandex: "..." },
  alternates: {
    canonical: SITE_URL,
  },
  category: "legal",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let locale = "es";
  let messages: Record<string, unknown> | undefined;
  try {
    locale = await getLocale();
    messages = await getMessages();
  } catch {
    // Rutas sin i18n (admin, portal, empleados) usan default
  }
  return (
    <html lang={locale}>
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        <NextIntlClientProvider messages={messages ?? {}}>
          <JsonLd />
          <Analytics />
          <CustomCursor />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
