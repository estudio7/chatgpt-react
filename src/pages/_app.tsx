// src/pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import axios from "axios";
import { getToken } from "../services/auth";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const initializeApp = async () => {
      const token = getToken();

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        console.log(`App initialized with token: ${token}`);
      }
    };

    initializeApp();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
