import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const RealEstateTokenModule = buildModule("RealEstateTokenModule", (m) => {
  const realEstate = m.contract("RealEstateToken", [
    "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
  ]);

  return { realEstate };
});

export default RealEstateTokenModule;
