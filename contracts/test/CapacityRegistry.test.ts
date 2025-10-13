import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("CapacityRegistry", function () {
  async function deployRegistryFixture() {
    const [owner, addr1] = await ethers.getSigners();

    const PassportFactory = await ethers.getContractFactory("OneStartPassport");
    const passport = await PassportFactory.deploy();
    const passportAddress = await passport.getAddress();

    const RegistryFactory = await ethers.getContractFactory("CapacityRegistry");
    const registry = await RegistryFactory.deploy(passportAddress);
    
    await passport.safeMint(addr1.address);

    return { registry, passport, owner, addr1 };
  }

  it("Should allow owner to update a capacity proof", async function () {
    const { registry, owner, addr1 } = await loadFixture(deployRegistryFixture);
    const tokenId = 0;
    const dataHash = ethers.keccak256(ethers.toUtf8Bytes("test-data"));

    await expect(registry.updateCapacityProof(tokenId, dataHash))
      .to.emit(registry, "CapacityProofUpdated")
      .withArgs(tokenId, dataHash);

    const proof = await registry.getCapacityProof(tokenId);
    expect(proof.dataHash).to.equal(dataHash);
    expect(proof.isVerified).to.be.true;
  });
});