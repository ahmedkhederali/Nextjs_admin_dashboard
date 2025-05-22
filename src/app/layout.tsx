import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: "Home Page",
  description: "Home Page of Admin Dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (<html>
    <body>
      <Toaster richColors position="top-right" />
      {children}
    </body>
  </html>);
}
