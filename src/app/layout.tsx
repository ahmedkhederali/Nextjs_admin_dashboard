import { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'sonner';

export async function generateMetadata(): Promise<Metadata> {
  return {}; // DO NOT return title or description here
}
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
