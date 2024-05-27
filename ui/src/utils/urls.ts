import { apiPath } from "./constants";

export const clientURLs = {
  home: "/",
  about: "/about",
  contact: "/contact",
  marketplace: "/marketplace",
  marketplace_createListing: "/marketplace/create",
  marketplace_assets: "/marketplace/assets",
};

export const serverURLs = {
  abi_resolveAbi: (name: string) => `/abi/${name}`,
  realEstate: "/realEstate",
  realEstate_assets: (address: string) => `/realEstate/${address}`,
};
