import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
// Ya no necesitamos la importación directa de TypeChain, Ethers lo hará por nosotros.
// import { OneStartPassport } from "../typechain-types"; 

describe("OneStartPassport", function () {
  async function deployPassportFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();
    
    // --- CORRECCIÓN FINAL Y DEFINITIVA AQUÍ ---
    // En lugar de getContractFactory genérico, usamos getContractFactory tipado
    // Esto resuelve el problema de la línea 12
    const Factory = await ethers.getContractFactory("OneStartPassport");
    const passport = await Factory.deploy(); // Ethers ahora infiere el tipo correcto
    
    return { passport, owner, addr1, addr2 };
  }

  describe("Deployment", function () {
    it("Should set the correct name and symbol", async function () {
      const { passport } = await loadFixture(deployPassportFixture);
      expect(await passport.name()).to.equal("1Start Passport");
      expect(await passport.symbol()).to.equal("1SP");
    });

    it("Should set the deployer as the owner", async function () {
      const { passport, owner } = await loadFixture(deployPassportFixture);
      expect(await passport.owner()).to.equal(owner.address);
    });
  });

  describe("Minting", function () {
    it("Should allow the owner to mint", async function () {
      const { passport, owner, addr1 } = await loadFixture(deployPassportFixture);
      
      const mintTx = await passport.connect(owner).safeMint(addr1.address);

      await expect(mintTx)
        .to.emit(passport, "Transfer")
        .withArgs("0x0000000000000000000000000000000000000000", addr1.address, 0);
      
      expect(await passport.ownerOf(0)).to.equal(addr1.address);
    });

    it("Should NOT allow another address to mint", async function () {
      const { passport, addr1, addr2 } = await loadFixture(deployPassportFixture);

      const mintTxFromAddr1 = passport.connect(addr1).safeMint(addr2.address);

      await expect(mintTxFromAddr1)
        .to.be.revertedWithCustomError(passport, "OwnableUnauthorizedAccount");
    });
  });
});