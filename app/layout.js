import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata = {
  title: {
    default: "Fashionablemen - Men's Fashion & Style",
    template: "%s | Fashionablemen"
  },
  description: "Discover the latest trends in men's fashion. Shop shoes, shirts, and t-shirts from top brands. Find your perfect style at Fashionablemen.",
  keywords: ["men's fashion", "shoes", "shirts", "t-shirts", "style", "clothing", "affiliate"],
  authors: [{ name: "Fashionablemen" }],
  creator: "Fashionablemen",
  publisher: "Fashionablemen",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://fashionablemen.com'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Fashionablemen - Men's Fashion & Style",
    description: "Discover the latest trends in men's fashion. Shop shoes, shirts, and t-shirts from top brands.",
    siteName: "Fashionablemen",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fashionablemen - Men's Fashion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fashionablemen - Men's Fashion & Style",
    description: "Discover the latest trends in men's fashion. Shop shoes, shirts, and t-shirts from top brands.",
    images: ["/og-image.jpg"],
    creator: "@fashionablemen",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

// Google Analytics Script Component
function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  
  if (!gaId) return null;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `,
        }}
      />
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <GoogleAnalytics />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="antialiased bg-gray-50 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
