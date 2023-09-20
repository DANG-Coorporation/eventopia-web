// pages/_app.js
import { Providers } from "@/app/providers";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Providers>
  );
}

export default MyApp;
