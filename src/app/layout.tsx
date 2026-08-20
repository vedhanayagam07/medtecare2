import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MedteCare | Medical Device Safety & Risk Intelligence",
  description:
    "Predict risk before medical devices fail. Machine learning risk scoring, SHAP explainability, dual RAG retrieval, and AI-assisted diagnostic reasoning for biomedical engineering teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[#fafafa] text-[#1d1d1f] antialiased selection:bg-blue-500/20 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}
