import { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { useState } from "react";
import theme from "./../styles/theme";
import "./../globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Carefinder</title>
        <meta name="description" content="Find hospitals near you" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
