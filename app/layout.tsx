"use client"; // Add this directive

import { SESSION_COOKIE_NAME } from "@/constants";
import { getCookie } from 'cookies-next';
import { Poppins } from "next/font/google";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "./components/header";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["100","400","500", "700","800","900"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = getCookie(SESSION_COOKIE_NAME)?.valueOf || null;
    console.log(session)
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className={`${poppins.className}`}>
          {" "}
          {(session !== null) ? <Header session={session()} /> : <Header session= ''/>}
          {children}
        </body>
      </QueryClientProvider>
    </html>
  );
}
