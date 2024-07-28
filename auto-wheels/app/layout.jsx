"use client";
import { Inter, Poppins, Roboto } from "next/font/google";
import "./styles/globals.scss";
import classes from "./styles/Demo.module.scss";
import {
  ColorSchemeScript,
  createTheme,
  MantineProvider,
  Button,
  TextInput,
  Input,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

// Font configurations
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Theme configuration
// const theme = createTheme({
//   components: {
//     Button: Button.extend({
//       classNames: classes,
//     }),
//     Input: Input.extend({
//       classNames: {
//         input: classes.input,
//       },
//     }),
//   },
//   // '#E90808', '#FEF3F3', '#F05252'
//   // '#333333 ', '#AAAAAA', '#F3F3F3'
//   colors: {
//     primary: ["#E90808", "#FEF3F3", "#F05252"],
//     secondary: ["#333333", "#AAAAAA"],
//   },
//   defaultRadius: "sm",
// });

export default function RootLayout({ children }) {
  const theme = {
    fontFamily: inter.style.fontFamily,
    fontSmoothing: true,
    headings: {
      fontFamily: poppins.style.fontFamily,
    },
    /** Put your mantine theme override here */
  };

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <ColorSchemeScript defaultColorScheme="auto" />
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>
        <Header />
        <MantineProvider theme={theme}>{children}</MantineProvider>
        <Footer />
      </body>
    </html>
  );
}
