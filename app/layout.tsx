import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meal Picker",
  description: "A meal picker app",
  openGraph: {
    title: "Meal Picker",
    description: "A meal picker app",
    url: "https://meal-picker-omega.vercel.app/",
    siteName: "Meal Picker",
    images: [
      {
        url: "https://meal-picker-omega.vercel.app/meal-picker.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meal Picker",
    description: "A meal picker app",
    images: ["https://meal-picker-omega.vercel.app/meal-picker.png"],
  },
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
        {children}
      </body>
    </html>
  );
}
