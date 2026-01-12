import * as React from "react";
import type { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { deepPurple } from "@mui/material/colors";
import { LanguageProvider } from "../src/i18n";
import Header from "../src/components/Header";

/*
  Application root:
  - Provides i18n context
  - Applies MUI theme with light/dark toggle
  - Renders Header and page content inside a centered container
*/
export default function App({ Component, pageProps }: AppProps) {
  const [mode, setMode] = React.useState<"light" | "dark">("dark");

  // Load theme preference from localStorage or system preference
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("theme-mode") as "light" | "dark" | null;
      if (stored) {
        setMode(stored);
        return;
      }
    } catch {}
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setMode("dark");
    } else {
      setMode("light");
    }
  }, []);

  const toggleMode = () => {
    setMode((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("theme-mode", next);
      } catch {}
      return next;
    });
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: deepPurple[500] },
          background: {
            default: mode === "dark" ? "#0b0f14" : undefined,
          },
        },
      }),
    [mode]
  );

  return (
    <LanguageProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header mode={mode} toggleMode={toggleMode} />
        <Container maxWidth="md" style={{ paddingTop: 24, paddingBottom: 48 }}>
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </LanguageProvider>
  );
}
