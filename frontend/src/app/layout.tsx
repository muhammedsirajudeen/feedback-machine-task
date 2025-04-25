import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalProvider from "@/provider/GlobalProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Feedback - Collect Feedback from Your Users Easily",
  description: "Gather valuable insights to improve your product by collecting user feedback quickly and efficiently. Start now!",
  openGraph: {
    title: "Feedback - Collect Feedback from Your Users Easily",
    description: "Gather valuable insights to improve your product by collecting user feedback quickly and efficiently. Start now!",
    url: "https://feedback.muhammedsirajudeen.in/",
    siteName: "Feedback",
    images: [
      {
        url: "https://feedback.muhammedsirajudeen.in/path/to/previewimage.png",
        width: 1200,
        height: 630,
        alt: "Feedback Website Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Feedback - Collect Feedback from Your Users Easily",
    description: "Gather valuable insights to improve your product quickly. Collect user feedback easily.",
    images: ["https://feedback.muhammedsirajudeen.in/previewimage.png"],
    site: "@yourtwitterhandle", // optional, remove if not available
    creator: "@yourtwitterhandle", // optional
  },
  metadataBase: new URL("https://feedback.muhammedsirajudeen.in"),
};

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
        <GlobalProvider>
          {children}
        </GlobalProvider>
        <Toaster/>
      </body>
    </html>
  );
}
