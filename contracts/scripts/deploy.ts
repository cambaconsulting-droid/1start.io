import { ethers } from "hardhat";

async function main() {
  console.log("Deploying OneStartPassport contract...");
  const OneStartPassportFactory = await ethers.getContractFactory("OneStartPassport");
  const oneStartPassport = await OneStartPassportFactory.deploy();
  await oneStartPassport.waitForDeployment();
  const contractAddress = await oneStartPassport.getAddress();
  console.log(`OneStartPassport contract deployed successfully to: ${contractAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});