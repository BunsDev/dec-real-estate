import { JsonRpcSigner } from "ethers";
import { BrowserProvider } from "ethers/providers";
import { create } from "zustand";

type Wallet = {
  address: string;
  balance: string;
  chainId: string;
  provider?: BrowserProvider;
  signer?: JsonRpcSigner;
};

type WalletActions = {
  setAddress: (address: Wallet["address"]) => void;
  setBalance: (balance: Wallet["balance"]) => void;
  setChainId: (chainId: Wallet["chainId"]) => void;
  setProvider: (provider: Wallet["provider"]) => void;
  setSigner: (signer: Wallet["signer"]) => void;
};

export const useMetamaskWalletStore = create<Wallet & WalletActions>((set) => ({
  address: "",
  balance: "0x0",
  chainId: "",
  provider: undefined,
  signer: undefined,
  setAddress: (address: Wallet["address"]) => set({ address }),
  setBalance: (balance: Wallet["balance"]) => set({ balance }),
  setChainId: (chainId: Wallet["chainId"]) => set({ chainId }),
  setProvider: (provider: Wallet["provider"]) => set({ provider }),
  setSigner: (signer: Wallet["signer"]) => set({ signer }),
}));
