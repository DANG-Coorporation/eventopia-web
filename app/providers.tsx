'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

export function Providers({ children }: { children: React.ReactNode }) {
  const activeLabelStyles = {
    transform: 'scale(0.85) translateY(-24px)',
  };

  const theme = extendTheme({
    colors: {
      brand: {
        100: "#f7fafc",
        900: "#1a202c",
      },
    },
    components: {
      Form: {
        variants: {
          floating: {
            container: {
              _focusWithin: {
                label: {
                  ...activeLabelStyles,
                },
              },
              "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label":
                {
                  ...activeLabelStyles,
                },
              label: {
                top: 0,
                left: 0,
                zIndex: 2,
                position: "absolute",
                backgroundColor: "white",
                pointerEvents: "none",
                mx: 3,
                px: 1,
                my: 3,
                transformOrigin: "left top",
              },
            },
          },
        },
      },
      Input: {
        variants: {
          noBorder: {
            borderColor: "transparent",
            _hover: {
              borderColor: "transparent",
              boxShadow: "none",
            },
            _active: {
              borderColor: "transparent",
              boxShadow: "none",
            },
            _focus: {
              borderColor: "transparent",
              boxShadow: "none",
            },
            focusBorderColor: "transparent",
          },
        },
      },
      Tabs: {
        variants: {
          strongBorder: {
            tab: {
              borderLeft: "0px",
              borderRight: "0px",
              border: "2px",
              borderColor: "white",
              borderBottom: "2px",
              width: "100%",
              borderRadius: 0,
              color: "black",
              margin: "0px",
              _selected: {
                borderBottom: "0",
                borderColor: "black",
                fontWeight: "bold",
                color: "black",
              },
              _focus: {
                borderColor: "black",
                fontWeight: "bold",
                color: "black",
                boxShadow: "none",
              },
              _active: {
                borderColor: "black",
                fontWeight: "bold",
                color: "black",
              },
            },
          },
        },
      },
      Button: {
        variants: {
          strongBlue: {
            borderRadius: 0,
            border: "2px solid black",
            bgColor: "#42A5F5",
            _hover: {
              bgColor: "#0D47A1",
              color: "white",
              _disabled: {
                bgColor: "#42A5F5",
                color: "black",
              },
            },
            _disabled: {
              bgColor: "#42A5F5",
            },
          },
          strongWhite: {
            borderRadius: 0,
            border: "2px solid black",
            bgColor: "white",
            _hover: {
              bgColor: "#B0BEC5",
            },
          },
          strongRed: {
            borderRadius: 0,
            border: "2px solid black",
            bgColor: "#F06292",
            _hover: {
              bgColor: "#C62828",
              color: "white",
            },
          },
        },
      },
    },
  });

  return (
    <Provider store={store}>
      <CacheProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CacheProvider>
    </Provider>
  );
}
