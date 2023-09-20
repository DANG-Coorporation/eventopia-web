// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export function Providers({ children }: { children: React.ReactNode }) {
  const theme = extendTheme({
    colors: {
      brand: {
        100: "#f7fafc",
        900: "#1a202c",
      },
    },
  });

  return (
    <Provider store={store}>
      <CacheProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </CacheProvider>
    </Provider>
  );
}
