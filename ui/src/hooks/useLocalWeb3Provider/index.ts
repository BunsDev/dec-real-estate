import { getLocalProvider } from "@/utils/ethereum";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

/**
 * Need this, since window.ethereum is not available untill the page is initialized
 */
export function useLocalWeb3Provider() {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  useEffect(() => {
    setProvider(getLocalProvider());
  }, []);
  return provider;
}
