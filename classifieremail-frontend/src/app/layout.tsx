import type { Metadata } from "next";

import "./globals.css";
import Header from "../core/components/Header";

export const metadata: Metadata = {
  title: "Classifier E-mail",
  description: "Ferramenta de análise e classificação de e-mails",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased ">
        <div className="flex flex-col flex-1 items-center w-full min-h-screen gap-8 bg-gradient-to-br from-gray-950 via-gray-800 to-blue-950/60 p-4">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
