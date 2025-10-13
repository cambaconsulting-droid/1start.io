import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Escrow", function () {
  async function deployEscrowFixture() {
    const [owner, buyer, seller, anotherAccount] = await ethers.getSigners();
    const depositAmount = ethers.parseEther("1");

    const EscrowFactory = await ethers.getContractFactory("Escrow", buyer);
    const escrow = await EscrowFactory.deploy(seller.address, depositAmount);

    return { escrow, buyer, seller, anotherAccount, depositAmount };
  }

  describe("Deployment", function () {
    it("Should set the correct buyer and seller", async function () {
      const { escrow, buyer, seller } = await loadFixture(deployEscrowFixture);
      expect(await escrow.buyer()).to.equal(buyer.address);
      expect(await escrow.seller()).to.equal(seller.address);
    });
  });

  describe("Transactions", function () {
    it("Should allow buyer to deposit and release funds", async function () {
      const { escrow, buyer, seller, depositAmount } = await loadFixture(deployEscrowFixture);
      
      await escrow.connect(buyer).deposit({ value: depositAmount });
      expect(await escrow.currentState()).to.equal(1); // Locked

      await expect(escrow.connect(buyer).releaseFunds())
        .to.changeEtherBalances([seller, escrow], [depositAmount, `-${depositAmount.toString()}`]);
        
      expect(await escrow.currentState()).to.equal(2); // Released
    });

    it("Should NOT allow non-buyer to release funds", async function () {
        const { escrow, buyer, seller, anotherAccount, depositAmount } = await loadFixture(deployEscrowFixture);
        await escrow.connect(buyer).deposit({ value: depositAmount });

        await expect(escrow.connect(seller).releaseFunds())
            .to.be.revertedWith("Escrow: Caller is not the buyer");

        await expect(escrow.connect(anotherAccount).releaseFunds())
            .to.be.revertedWith("Escrow: Caller is not the buyer");
    });
  });
});