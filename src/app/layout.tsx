//react/next
import type { Metadata } from "next";

//fonts
import { poppins } from "@/fonts/page";

//css
import "./globals.css";

//context
import { AppFirebaseAuth } from "./context/auth";


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
      <head>
        <link rel="icon" href='/icon.png' />
      </head>
      <body className={`${poppins.className} bg-[#f2f3f7]`} suppressHydrationWarning={true} >
        <AppFirebaseAuth>
          {children}
        </AppFirebaseAuth>
      </body>
    </html>
  );
}
