"use client";
import { Inter, Poppins, Roboto } from "next/font/google";
import "./styles/globals.scss";
import classes from "./styles/Demo.module.scss";
import { ColorSchemeScript, MantineProvider, Button, TextInput, Input, Checkbox } from "@mantine/core";

import "@mantine/core/styles.css";
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
const theme = {
  components: {
    Button: {
      classNames: classes,
    },
    Input: {
      classNames: {
        input: classes.input,
      },
    },
    Checkbox: {
      classNames: {
        input: classes.input,
      },
    },
    InputWrapper: {
      classNames: {
        label: classes.input_label,
      },
    },
  },
  defaultRadius: 'sm',
  fontFamily: 'system-ui',
};

export default function RootLayout({ children }) {
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
      <body className={poppins.className}>
        <MantineProvider theme={theme}>
          <Header />
          {children}
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
