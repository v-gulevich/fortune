import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fortune",
  description: "Your daily dose of random quotes",
  authors: [{name: "Vladislav Gulevich", url: "https://gulevich.by"}]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-white text-black`}>
        {children}
      </body>
    </html>
  );
}