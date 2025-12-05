// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"
import Sidebar from "@/app/_components/BarraNavegacao"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trabalho de Banco de Dados",
  description: "App de gestão acadêmica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-r">
      <body className={inter.className}>
        <div className="flex">
          {/* 1. A Sidebar fixa */}
          <Sidebar />

          {/* 2. A área de conteúdo principal */}
          {/* O ml-64 (margin-left) serve para empurrar o conteúdo
              para o lado, já que a Sidebar tem largura w-64 */}
          <main className9="flex-1 ml-64 p-0 min-h-screen bg-slate-800">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
