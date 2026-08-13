import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["300", "400", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "RAAHI — RAAHI • راہگیر",
  description: "Raahi — Listen to the quiet soul of the mountains. Chill ambient radio and peaceful thoughts at golden sunset.",
  keywords: ["Raahi", "ambient", "mountains", "chill radio", "peace", "sunset", "meditation"],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#21130D] text-[#F5EBDD] font-sans antialiased selection:bg-[#B98558]/30 selection:text-[#FFF7EC] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
