import type { Metadata } from "next";
import "./globals.css";

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
      {children}
    </body>
  </html>);
}
