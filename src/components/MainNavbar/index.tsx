import React, { useContext, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { ThemeContext } from "@/contexts";
import { clientURLs } from "@/utils";
import { LucideLink, MoonStar, Sun } from "lucide-react";
import { useSDK } from "@metamask/sdk-react";
import {
  useMetamaskExtensionInstallModalStore,
  useMetamaskWalletStore,
  useMetamaskWrongChainIDModalStore,
} from "@/stores";
import Image from "next/image";
import { ethers } from "ethers";

export const MainNavbar = () => {
  const themeContext = useContext(ThemeContext);
  const { sdk, connected, connecting, provider, chainId, account, balance } =
    useSDK();

  const globalWalletStore = useMetamaskWalletStore();
  const metamaskExtensionInstallModalStore =
    useMetamaskExtensionInstallModalStore();
  const metamaskWrongChainIDModalStore = useMetamaskWrongChainIDModalStore();

  // Handling the statechange of the wallet globally
  useEffect(() => {
    console.log("chainId: ", chainId);
    console.log("balance: ", balance);
    if (!connected && !connecting) {
      globalWalletStore.setAddress("");
      globalWalletStore.setBalance("0x0");
      globalWalletStore.setChainId("");
    } else if (!connected && connecting) {
      globalWalletStore.setAddress("");
      globalWalletStore.setBalance("0x0");
      globalWalletStore.setChainId("");
    } else if (connected) {
      globalWalletStore.setAddress(account ?? "");
      globalWalletStore.setBalance(balance ?? "0x0");
      globalWalletStore.setChainId(chainId ?? "");
      // TODO: Uncomment this when the chain ID is set
      // if (chainId !== process.env.NEXT_PUBLIC_CHAIN_ID) {
      //   metamaskWrongChainIDModalStore.setOpen(true);
      // } else {
      //   metamaskWrongChainIDModalStore.setOpen(false);
      // }
    }
  }, [chainId, account, balance]);

  const themeChangeHandler = (event: React.MouseEvent) => {
    themeContext.setTheme(themeContext.theme === "light" ? "dark" : "light");
  };

  const renderAccountInfo = () => {
    if (connected) {
      return (
        <div className="flex">
          <span className="my-auto">
            {convertEthBalanceToDecimal(globalWalletStore.balance ?? "0x0")}
          </span>
          <Image
            alt={"Ethereum Logo"}
            src={"/ethereum-logo.svg"}
            width={30}
            height={30}
          />
        </div>
      );
    } else if (!connected && connecting) {
      return (
        <Button variant="shadow" color="primary" isLoading>
          Connecting...
        </Button>
      );
    } else {
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

  const checkMetamaskAvailability = async () => {
    return typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask;
  };

  const convertEthBalanceToDecimal = (balance: string) => {
    return ethers.formatEther(balance);
  };

  return (
    <Navbar className={`${themeContext.theme} text-foreground bg-background`}>
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
  );
};
