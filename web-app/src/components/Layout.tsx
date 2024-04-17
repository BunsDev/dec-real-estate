import Head from "next/head";
import React, { ReactNode, useContext, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { clientURLs } from "@/utils/urls";
import { ThemeContext } from "@/contexts";
import { Link as LucideLink, MoonStar, Sun } from "lucide-react";
import { useSDK } from "@metamask/sdk-react";
import { MetamaskInstallModal } from "./MetamaskInstallModal";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const themeContext = useContext(ThemeContext);
  const [showMetamaskModal, setShowMetamaskModal] = React.useState(true);

  const checkMetamaskAvailability = async () => {
    return typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask;
  };

  const { sdk, connected, connecting, provider, chainId, account, balance } =
    useSDK();

  const themeChangeHandler = (event: React.MouseEvent) => {
    themeContext.setTheme(themeContext.theme === "light" ? "dark" : "light");
  };

  const connectToMetamask = async () => {
    if (!(await checkMetamaskAvailability())) {
      console.error("Metamask not available");
      return;
    }

    try {
      const accounts = await sdk?.connect();
      console.log("accounts: ", accounts);
    } catch (e: any) {
      console.error(e);
    }
  };

  const renderAccountInfo = () => {
    if (connecting && !connected) {
      return (
        <Button variant="shadow" color="primary" isLoading>
          Connecting...
        </Button>
      );
    } else if (connected && !connecting) {
      return <span>{balance} Eth</span>;
    } else if (!connected && !connecting) {
      return (
        <Button
          variant="shadow"
          color="primary"
          startContent={<LucideLink />}
          onClick={connectToMetamask}
        >
          Link Metamask
        </Button>
      );
    }
  };

  return (
    <>
      <Navbar
        className={`${themeContext.theme} text-foreground bg-background`}
        position="static"
      >
        <NavbarBrand>
          <Link className="brandname" href={clientURLs.home}>
            Dec Real Estate
          </Link>
        </NavbarBrand>
        <NavbarContent className="navbar-link" justify="center">
          <NavbarItem>
            <Link href={clientURLs.home}>Home</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href={clientURLs.about}>About</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href={clientURLs.contact}>Contact</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href={clientURLs.marketplace}>Marketplace</Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button variant="light" onClick={themeChangeHandler} isIconOnly>
              {themeContext.theme === "light" ? (
                <Sun color="#ff080f" />
              ) : (
                <MoonStar color="#ffffff" />
              )}
            </Button>
          </NavbarItem>
          <NavbarItem>{renderAccountInfo()}</NavbarItem>
        </NavbarContent>
      </Navbar>
      <main className={`${themeContext.theme} text-foreground bg-background`}>
        {children}
        <MetamaskInstallModal
          isOpen={showMetamaskModal}
          onOpenChange={setShowMetamaskModal}
        />
      </main>
    </>
  );
}
