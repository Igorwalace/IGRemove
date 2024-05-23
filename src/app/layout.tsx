//react/next
import type { Metadata } from "next";

//fonts
import { poppins } from "@/fonts/page";

//css
import "./globals.css";


export const metadata: Metadata = {
  title: "IGRemove",
  description: "Removedor de fundo de qualquer imagem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.className} bg-[#f2f3f7]`} suppressHydrationWarning={true} >{children}</body>
    </html>
  );
}
