import { Layout } from "@/components/Layout";
import { ThemeContext, ThemeContextType } from "@/contexts";
import "@/styles/globals.scss";
import { MetaMaskProvider } from "@metamask/sdk-react";
import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<ThemeContextType["theme"]>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme !== null) {
      setTheme(savedTheme as ThemeContextType["theme"]);
    }
  }, []);

  const changeTheme = (theme: ThemeContextType["theme"]) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  };

  const host =
    typeof window !== "undefined" ? window.location.host : "defaultHost";

  return (
    <ThemeContext.Provider value={{ theme, setTheme: changeTheme }}>
      <NextUIProvider>
        <MetaMaskProvider
          debug={true}
          sdkOptions={{
            dappMetadata: {
              name: "Example React Dapp",
              url: host,
            },
            infuraAPIKey: process.env.INFURA_API_KEY,
            // Other options
          }}
        >
          <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap"
              rel="stylesheet"
            />
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MetaMaskProvider>
      </NextUIProvider>
    </ThemeContext.Provider>
  );
}
