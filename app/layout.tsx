"use client"; // Add this directive

import { Poppins } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import { cookies } from "next/headers";

const poppins = Poppins({ subsets: ["latin"], weight: ["100","400","500", "700","800","900"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body
          className={`${poppins.className}`}
        >
          {children}
        </body>
      </QueryClientProvider>
    </html>
  );
}
