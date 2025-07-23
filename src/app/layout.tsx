import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MenuProvider } from "./context/MenuContext";
import { Analytics } from "@vercel/analytics/next"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description = "Find food by the dish, not just the place. Explore real menus, pairings & photos from local restaurants. Now launching in Helsinki."

// export const metadata: Metadata = {
//   title: "Vinelier",
//   description: "Discover Food by the Dish, Not Just the Place",
// };
export const metadata: Metadata = {
  title: "Vinelier",
  description: description,

  // ─── FAVICONS ───────────────────────────────────────────────────────────────
  icons: {
    icon:       "/favicon.ico",         // standard favicon
    shortcut:   "/favicon-16x16.png",   // shortcut icon
    apple:      "/apple-touch-icon.png",// iOS home‑screen
    // other: {
    //   rel:     "mask-icon",
    //   url:     "/safari-pinned-tab.svg",
    //   color:   "#3746B5",
    // },
  },

  // ─── OPENGRAPH (Facebook, LinkedIn, etc.) ─────────────────────────────────
  openGraph: {
    title:       "Vinelier",
    description: description,
    url:         "https://vinelier.com",
    siteName:    "Vinelier",
    images: [
      {
        url:      "https://vinelier.com/Logo/social-media-preview.png",
        width:    1200,
        height:   630,
        alt:      "Discover your favourite Dish at Vinelier",
      },
    ]
  },

  // ─── TWITTER CARD ──────────────────────────────────────────────────────────
  twitter: {
    card:        "summary_large_image",
    title:       "Vinelier",
    description: description,
    images: [
      "https://vinelier.com/Logo/social-media-preview.png",
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <MenuProvider>
            {children}
            <Analytics />
          </MenuProvider>
      </body>
    </html>
  );
}
