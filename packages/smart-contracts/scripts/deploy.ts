import { ethers } from "hardhat";

async function main() {
  console.log("Deploying VerinstatePassport contract...");

  // Obtenemos el "molde" del contrato
  // ANTES: const IdentityNFTFactory = await ethers.getContractFactory("IdentityNFT");
  const VerinstatePassportFactory = await ethers.getContractFactory("VerinstatePassport"); // CAMBIO AQUÍ

  // Iniciamos el despliegue y esperamos a que se confirme
  // ANTES: const identityNFT = await IdentityNFTFactory.deploy();
  const verinstatePassport = await VerinstatePassportFactory.deploy(); // CAMBIO AQUÍ

  // Esperamos a que el contrato esté completamente desplegado en la red
  // ANTES: await identityNFT.waitForDeployment();
  await verinstatePassport.waitForDeployment(); // CAMBIO AQUÍ

  // Obtenemos la dirección del contrato desplegado para poder interactuar con él
  // ANTES: const contractAddress = await identityNFT.getAddress();
  const contractAddress = await verinstatePassport.getAddress(); // CAMBIO AQUÍ

  console.log(`VerinstatePassport contract deployed successfully to: ${contractAddress}`); // CAMBIO AQUÍ
}

// Usamos el patrón recomendado para manejar errores en scripts asíncronos
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});