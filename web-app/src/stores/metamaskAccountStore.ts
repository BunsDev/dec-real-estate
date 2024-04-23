import { create } from "zustand";

type Wallet = {
  address: string;
  balance: string;
  chainId: string;
};

type WalletActions = {
  setAddress: (address: Wallet["address"]) => void;
  setBalance: (balance: Wallet["balance"]) => void;
  setChainId: (chainId: Wallet["chainId"]) => void;
};

export const useMetamaskWalletStore = create<Wallet & WalletActions>((set) => ({
  address: "",
  balance: "0x0",
  chainId: "",
  setAddress: (address: string) => set({ address }),
  setBalance: (balance: string) => set({ balance }),
  setChainId: (chainId: string) => set({ chainId }),
}));
