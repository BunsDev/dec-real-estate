import React, { ReactNode, useContext, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { clientURLs } from "@/utils/urls";
import { ThemeContext } from "@/contexts";
import { Link as LucideLink, MoonStar, Sun } from "lucide-react";
import { useSDK } from "@metamask/sdk-react";
import { MetamaskInstallModal } from "./MetamaskInstallModal";
import { ethers } from "ethers";
import {
  useMetamaskExtensionInstallModalStore,
  useMetamaskWalletStore,
  useMetamaskWrongChainIDModalStore,
} from "@/stores";
import { MetamaskWrongChainModal } from "./MetamaskWrongChainModal";
import Image from "next/image";
import { MainNavbar } from "./MainNavbar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const themeContext = useContext(ThemeContext);

  const metamaskExtensionInstallModalStore =
    useMetamaskExtensionInstallModalStore();
  const metamaskWrongChainIDModalStore = useMetamaskWrongChainIDModalStore();

  return (
    <>
      <MainNavbar />
      <main className={`${themeContext.theme} text-foreground bg-background`}>
        {children}
        <MetamaskInstallModal
          isOpen={metamaskExtensionInstallModalStore.isOpen}
          onOpenChange={metamaskExtensionInstallModalStore.setOpen}
        />
        <MetamaskWrongChainModal
          isOpen={metamaskWrongChainIDModalStore.isOpen}
          onOpenChange={metamaskWrongChainIDModalStore.setOpen}
        />
      </main>
    </>
  );
}
