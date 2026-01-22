import type { Metadata } from "next";
import "@kimafinance/kima-transaction-widget/index.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kima Transaction Widget - Next",
  description: "Kima Transaction Widget example with Next.js",
};

if (typeof global.navigator === 'undefined') global.navigator = {} as Navigator;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
