import { Contract, parseEther } from "ethers";
import { JsonRpcApiProvider } from "ethers";
import { ethers } from "ethers";

export type ContractArgs = {
  provider: JsonRpcApiProvider;
  signer: ethers.Signer;
  abi: any;
};

export function getLocalProvider(): ethers.BrowserProvider {
  return new ethers.BrowserProvider(window.ethereum!);
}

export async function createToken(
  contractArgs: ContractArgs,
  numOfTokens: number,
  listingPrice: number
) {
  const contract = new Contract(
    `${process.env.NEXT_PUBLIC_REAL_ESTATE_TOKEN_CONTRACT_ADDRESS}`,
    contractArgs.abi,
    contractArgs.provider
  );

  const contractWithSigner = contract.connect(contractArgs.signer);

  // @ts-ignore
  const txResponse = await contractWithSigner.createToken(
    numOfTokens,
    parseEther(listingPrice.toString())
  );

  const txReceipt = await txResponse.wait();

  return txReceipt;
}
