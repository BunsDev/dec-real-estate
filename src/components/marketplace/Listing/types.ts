import { RealEstate } from "@/utils/db/RealEstateCollection/types";

export interface ListingProps {
  isAssets?: boolean;
  realEstates: RealEstate[];
}
