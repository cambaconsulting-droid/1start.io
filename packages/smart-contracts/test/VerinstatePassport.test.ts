import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("VerinstatePassport", function () {
  async function deployVerinstatePassportFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const VerinstatePassportFactory = await ethers.getContractFactory("VerinstatePassport");
    const verinstatePassport = await VerinstatePassportFactory.deploy();
    return { verinstatePassport, owner, addr1, addr2 };
  }

  describe("Deployment", function () {
    it("Should set the correct owner", async function () {
      const { verinstatePassport, owner } = await loadFixture(deployVerinstatePassportFixture);
      expect(await verinstatePassport.owner()).to.equal(owner.address);
    });

    it("Should have the correct name and symbol", async function () {
      const { verinstatePassport } = await loadFixture(deployVerinstatePassportFixture);
      expect(await verinstatePassport.name()).to.equal("Verinstate Passport");
      expect(await verinstatePassport.symbol()).to.equal("VIP");
    });
  });

  // --- ¡NUEVA SECCIÓN DE PRUEBAS AQUÍ! ---
  describe("Minting", function () {
    it("Should allow the owner to mint a new passport to another address", async function () {
      const { verinstatePassport, owner, addr1 } = await loadFixture(deployVerinstatePassportFixture);
      
      // El dueño (owner) crea un pasaporte para la dirección addr1
      // Esperamos que esta acción emita un evento 'Transfer' (el "recibo" de la creación)
      await expect(verinstatePassport.safeMint(addr1.address))
        .to.emit(verinstatePassport, "Transfer")
        .withArgs("0x0000000000000000000000000000000000000000", addr1.address, 0); // De la nada, a addr1, el token #0

      // Verificamos que el dueño del pasaporte con ID 0 es ahora addr1
      expect(await verinstatePassport.ownerOf(0)).to.equal(addr1.address);
    });

    it("Should NOT allow another address to mint a new passport", async function () {
      const { verinstatePassport, addr1, addr2 } = await loadFixture(deployVerinstatePassportFixture);

      // addr1 (que no es el dueño) intenta crear un pasaporte para addr2
      // Esperamos que esta acción falle con un error específico de "Ownable"
      await expect(verinstatePassport.connect(addr1).safeMint(addr2.address))
        .to.be.revertedWithCustomError(verinstatePassport, "OwnableUnauthorizedAccount");
    });
  });
  // --- FIN DE LA NUEVA SECCIÓN ---
});