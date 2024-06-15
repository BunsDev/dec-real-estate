import { create } from "zustand";

type MetamaskExtensionInstallModal = {
  isOpen: boolean;
};

type MetamaskExtensionInstallModalActions = {
  setOpen: (isOpen: MetamaskExtensionInstallModal["isOpen"]) => void;
};

export const useMetamaskExtensionInstallModalStore = create<
  MetamaskExtensionInstallModal & MetamaskExtensionInstallModalActions
>((set) => ({
  isOpen: false,
  setOpen: (isOpen: boolean) => set({ isOpen }),
}));

type MetamaskWrongChainIDModal = {
  isOpen: boolean;
};

type MetamaskWrongChainIDModalActions = {
  setOpen: (isOpen: MetamaskWrongChainIDModal["isOpen"]) => void;
};

export const useMetamaskWrongChainIDModalStore = create<
  MetamaskWrongChainIDModal & MetamaskWrongChainIDModalActions
>((set) => ({
  isOpen: false,
  setOpen: (isOpen: boolean) => set({ isOpen }),
}));
