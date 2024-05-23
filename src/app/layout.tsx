//react/next
import type { Metadata } from "next";

//fonts
import { Poppins, Lilita_One } from "next/font/google";

//css
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: '400' });
export const lilita_one = Lilita_One({ subsets: ["latin"], weight: '400' });

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
