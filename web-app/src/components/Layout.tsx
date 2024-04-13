import Head from "next/head";
import React, { ReactNode, useContext } from "react";
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

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const themeContext = useContext(ThemeContext);

  return (
    <>
      <Navbar className="dark text-foreground bg-background" position="static">
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
      </Navbar>
      <main className="dark text-foreground bg-background">{children}</main>
    </>
  );
}
