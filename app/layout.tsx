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
  title: {
    default: "Isaiah 35:8 Ministries | The Highway",
    template: "%s | Isaiah 35:8 Ministries",
  },

  description:
    "Welcome to Isaiah 35:8 Ministries. Experience The Highway — a journey of faith, worship, fellowship, and walking in purpose.",

  metadataBase: new URL("https://www.isaiah358.com"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Isaiah 35:8 Ministries | The Highway",
    description:
      "A ministry built on faith, worship, fellowship, and the journey of walking in purpose.",
    url: "https://www.isaiah358.com",
    siteName: "Isaiah 35:8 Ministries",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
