"use client"; // Add this directive

import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

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
          className={`${inter.className} w-9/12`}
        >
          {children}
        </body>
      </QueryClientProvider>
    </html>
  );
}
