export type RealEstateCardProps = {
  title: string;
  pricePerToken: number;
  tokenSupply: number;
  currentSupply: number;
  imageUrl?: string;
  onClick: () => void;
  creator: string; // wallet address
  isAssets?: boolean;
};
