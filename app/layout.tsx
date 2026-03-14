import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Toaster } from "sonner";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Don Bosco ",
  description: "A website for Don Bosco's life and works, created by a group of students from the University of Santo Tomas. The website aims to provide a comprehensive overview of Don Bosco's life, his contributions to society, and his legacy. It features a collection of articles, images, and videos that highlight the key events and milestones in Don Bosco's life, as well as his impact on the world. The website is designed to be user-friendly and accessible to a wide audience, including students, educators, and anyone interested in learning more about Don Bosco.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-white">
        <Navbar />
        {children}
        <Toaster />
        <Footer />
        {/*  */}
        <script src="https://code.iconify.design/3/3.1.0/iconify.min.js"></script>
      </body>
    </html>
  );
}
