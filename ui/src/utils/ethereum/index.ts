import { ethers } from "ethers";

export function getLocalProvider(): ethers.BrowserProvider {
  return new ethers.BrowserProvider(window.ethereum!);
}
