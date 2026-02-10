import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/layout/ClientLayout";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexCRM - Enterprise CRM/ERP Solution",
  description: "Next-generation CRM and ERP for modern enterprises.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-slate-50/50 min-h-screen text-slate-900")}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
