const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CryptoChitahs", function () {
  const NAME = "CryptoChitahs";
  const SYMBOL = "CC";
  const TOTALSUPPLY = 3974;
  const BASEURI =
    "https://cloudflare-ipfs.com/ipfs/QmXa9ZGusuAzTuXZviqcdu8fcF7ihpyjcUEw8Gk5n4gHgf/";
  let cryptoChitahs;
  let contractOwner, minter, user1, user2, user3;

  beforeEach(async () => {
    [contractOwner, minter, user1, user2, user3] = await ethers.getSigners();
    const CryptoChitahs = await ethers.getContractFactory("CryptoChitahs");
    cryptoChitahs = await CryptoChitahs.deploy(
      NAME,
      SYMBOL,
      TOTALSUPPLY,
      contractOwner.address,
      minter.address,
      BASEURI
    );
  });

  describe("Deployment", () => {
    it("should deploy the contract with right arguments", async () => {
      // contract's address should not be zero
      expect(cryptoChitahs.address).to.not.be.equal(
        ethers.constants.AddressZero
      );

      // contract's name should be CryptoChitahs
      expect(await cryptoChitahs.name()).to.be.equal(NAME);

      // contract's symbol should be CC
      expect(await cryptoChitahs.symbol()).to.be.equal(SYMBOL);

      // contract's totalSupply should be 3974
      expect(await cryptoChitahs.totalSupply()).to.be.equal(TOTALSUPPLY);

      // contract's owner should be contractOwner
      expect(await cryptoChitahs.owner()).to.be.equal(contractOwner.address);

      // contract's minter should be minter
      expect(await cryptoChitahs.minter()).to.be.equal(minter.address);

      // contract's baseURI should be BASEURI
      expect(await cryptoChitahs.baseURI()).to.be.equal(BASEURI);
    });
  });
  describe("Minting", () => {
    it("should mint NFT when called by minter", async () => {
      const mintTx = await cryptoChitahs.connect(minter).mint(user1.address, 1);
      const rc = await mintTx.wait();
      const event = rc.events.find((event) => event.event === "Transfer");

      // check the new owner and tokenId
      expect(event.args.tokenId).to.be.equal(1);
      expect(event.args.to).to.be.equal(user1.address);
      expect(await cryptoChitahs.ownerOf(1)).to.be.equal(user1.address);

      // check tokenURI
      const tokenURI = await cryptoChitahs.tokenURI(1);
      expect(tokenURI).to.be.equal(BASEURI + "1.json");
    });

    it("should not mint NFT when called by non minter", async () => {
      await expect(
        cryptoChitahs.connect(contractOwner).mint(user1.address, 1)
      ).to.be.revertedWith("Only minter can perform this action");
      await expect(
        cryptoChitahs.connect(user1).mint(user1.address, 1)
      ).to.be.revertedWith("Only minter can perform this action");
    });

    it("should not mint NFT if already minted", async () => {
      const mintTx = await cryptoChitahs.connect(minter).mint(user1.address, 1);
      await mintTx.wait();

      await expect(
        cryptoChitahs.connect(minter).mint(user2.address, 1)
      ).to.be.revertedWith("ERC721: token already minted");
    });

    it("should not mint NFT if tokenId is not valid", async () => {
      await expect(
        cryptoChitahs.connect(minter).mint(user2.address, 4000)
      ).to.be.revertedWith(`tokenId can only be >=1 and <=${TOTALSUPPLY}`);
    });
  });
  describe("Transfer", () => {
    beforeEach(async () => {
      const mintTx = await cryptoChitahs.connect(minter).mint(user1.address, 1);
      await mintTx.wait();
    });

    it("should transfer NFT from owner", async () => {
      const transferTx = await cryptoChitahs
        .connect(user1)
        .transferFrom(user1.address, user2.address, 1);
      await transferTx.wait();
      expect(await cryptoChitahs.ownerOf(1)).to.be.equal(user2.address);
    });

    it("should transfer NFT by operator", async () => {
      const approveTx = await cryptoChitahs
        .connect(user1)
        .setApprovalForAll(user2.address, true);
      await approveTx.wait();

      const transferTx = await cryptoChitahs
        .connect(user2)
        .transferFrom(user1.address, user3.address, 1);
      await transferTx.wait();

      expect(await cryptoChitahs.ownerOf(1)).to.be.equal(user3.address);
    });

    it("should not transfer NFT if not called by owner or operator", async () => {
      await expect(
        cryptoChitahs
          .connect(user2)
          .transferFrom(user1.address, user2.address, 1)
      ).to.be.revertedWith("ERC721: transfer caller is not owner nor approved");
    });

    it("should not transfer NFT if not minted", async () => {
      await expect(
        cryptoChitahs
          .connect(user1)
          .transferFrom(user1.address, user2.address, 2)
      ).to.be.revertedWith("ERC721: operator query for nonexistent token");
    });

    it("should not transfer NFT if to address zero", async () => {
      await expect(
        cryptoChitahs
          .connect(user1)
          .transferFrom(user1.address, ethers.constants.AddressZero, 1)
      ).to.be.revertedWith("ERC721: transfer to the zero address");
    });
  });
});
