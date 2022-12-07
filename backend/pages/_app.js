import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  primero: {
    900: "#D7CEC788",
    500: "#D7CEC7",
  },
  segundo: {
    900: "#56565688",
    500: "#565656",
  },
  tercero: {
    900: "#76323F88",
    500: "#76323F",
  },
  cuarto: {
    900: "#C09F8088",
    500: "#C09F80",
  },
};

const theme = extendTheme({ colors });

// 3. Pass the `theme` prop to the `ChakraProvider`
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
