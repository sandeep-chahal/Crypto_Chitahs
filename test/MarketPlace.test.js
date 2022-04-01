const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Marketplace", () => {
  let marketPlace;
  let contractOwner, user1;
  const NAME = "CryptoChitahs";
  const SYMBOL = "CC";
  const TOTALSUPPLY = 3974;
  const BASEURI =
    "https://cloudflare-ipfs.com/ipfs/QmXa9ZGusuAzTuXZviqcdu8fcF7ihpyjcUEw8Gk5n4gHgf/";
  let cryptoChitahs;

  beforeEach(async () => {
    [contractOwner, user1] = await ethers.getSigners();

    // deploy NFT collection
    const CryptoChitahs = await ethers.getContractFactory("CryptoChitahs");
    cryptoChitahs = await CryptoChitahs.deploy(
      NAME,
      SYMBOL,
      TOTALSUPPLY,
      contractOwner.address,
      ethers.constants.AddressZero,
      BASEURI
    );

    // deploy marketPlace
    const MarketPlace = await ethers.getContractFactory("MarketPlace");
    marketPlace = await MarketPlace.deploy(
      contractOwner.address,
      cryptoChitahs.address,
      true,
      ethers.utils.parseEther("1.25")
    );

    const tx = await cryptoChitahs
      .connect(contractOwner)
      .setMinter(marketPlace.address);
    await tx.wait();
  });

  describe("Deployment", () => {
    it("should deploy the marketplace contract with right arguments", async () => {
      // contract's address should not be zero
      expect(marketPlace.address).to.not.be.equal(ethers.constants.AddressZero);

      // contract's owner should be contractOwner
      expect(await marketPlace.owner()).to.be.equal(contractOwner.address);

      expect(await marketPlace.nft()).to.be.equal(cryptoChitahs.address);

      expect(await marketPlace.canMint()).to.be.equal(true);
      expect(await marketPlace.totalMinted()).to.be.equal(0);
      expect(await marketPlace.basePrice()).to.be.equal(
        ethers.utils.parseEther("1.25")
      );
    });
  });
  describe("Setter", () => {
    it("should set owner if called by owner", async () => {
      const tx = await marketPlace
        .connect(contractOwner)
        .setOwner(user1.address);
      await tx.wait();
      expect(await marketPlace.owner()).to.be.equal(user1.address);
    });

    it("should not set owner if not called by owner", async () => {
      await expect(
        marketPlace.connect(user1).setOwner(user1.address)
      ).to.be.revertedWith("Only owner can perform this action");
    });

    it("should set base price if called by owner", async () => {
      const tx = await marketPlace
        .connect(contractOwner)
        .setBasePrice(ethers.utils.parseEther("1.5"));
      await tx.wait();
      expect(await marketPlace.basePrice()).to.be.equal(
        ethers.utils.parseEther("1.5")
      );
    });

    it("should set boosted prices if called by owner", async () => {
      const tokenIds = [5, 10, 15, 20, 500, 1000];
      const prices = [
        ethers.utils.parseEther("0.5"),
        ethers.utils.parseEther("0.75"),
        ethers.utils.parseEther("1.0"),
        ethers.utils.parseEther("1.25"),
        ethers.utils.parseEther("1.5"),
        ethers.utils.parseEther("1.75"),
      ];
      const tx = await marketPlace
        .connect(contractOwner)
        .setBoostedPrice(tokenIds, prices);
      await tx.wait();

      const boostedPrices = await marketPlace.getBoostedPrice(tokenIds);

      // compare boosted prices
      for (let i = 0; i < tokenIds.length; i++) {
        expect(boostedPrices[i]).to.be.equal(prices[i]);
      }
    });

    it("should set minting state", async () => {
      // mint -> true
      const tx1 = await marketPlace.setMinting(true);
      await tx1.wait();
      expect(await marketPlace.canMint()).to.be.equal(true);

      // mint -> false
      const tx2 = await marketPlace.setMinting(false);
      await tx2.wait();
      expect(await marketPlace.canMint()).to.be.equal(false);
    });
  });

  describe("Mint", () => {
    it("should mint a NFT if right amount is paid", async () => {
      // with only base price
      await (
        await marketPlace.connect(user1).mint(2, {
          value: ethers.utils.parseEther("1.25"),
        })
      ).wait();
      expect(await cryptoChitahs.ownerOf(2)).to.be.equal(user1.address);

      // with base price + boosted price
      const tx = await marketPlace
        .connect(contractOwner)
        .setBoostedPrice([5], [ethers.utils.parseEther("2.0")]);
      await tx.wait();

      await (
        await marketPlace.connect(user1).mint(5, {
          value: ethers.utils.parseEther("3.25"),
        })
      ).wait();
      expect(await cryptoChitahs.ownerOf(5)).to.be.equal(user1.address);
    });

    it("should not mint a NFT if right amount not paid", async () => {
      // with only base price
      await expect(
        marketPlace.mint(2, {
          value: ethers.utils.parseEther("1.1"),
        })
      ).to.be.revertedWith("Incorrect price");

      // with base price + boosted price
      const tx = await marketPlace
        .connect(contractOwner)
        .setBoostedPrice([5], [ethers.utils.parseEther("2.0")]);
      await tx.wait();

      await expect(
        marketPlace.connect(user1).mint(5, {
          value: ethers.utils.parseEther("1.25"),
        })
      ).to.be.revertedWith("Incorrect price");
    });

    it("should mint if canMint is true", async () => {
      await (await marketPlace.setMinting(true)).wait();
      await (
        await marketPlace.connect(user1).mint(2, {
          value: ethers.utils.parseEther("1.25"),
        })
      ).wait();
      expect(await cryptoChitahs.ownerOf(2)).to.be.equal(user1.address);
    });

    it("should not mint if canMint is false", async () => {
      await (await marketPlace.setMinting(false)).wait();

      await expect(
        marketPlace.connect(user1).mint(2, {
          value: ethers.utils.parseEther("1.25"),
        })
      ).to.be.revertedWith("Minting is not started");
    });

    it("should increment total minted", async () => {
      // totalMinted 1
      await (
        await marketPlace.connect(user1).mint(2, {
          value: ethers.utils.parseEther("1.25"),
        })
      ).wait();
      expect(await marketPlace.totalMinted()).to.be.equal(1);

      // totalMinted 2
      await (
        await marketPlace.connect(user1).mint(5, {
          value: ethers.utils.parseEther("1.25"),
        })
      ).wait();
      expect(await marketPlace.totalMinted()).to.be.equal(2);
    });

    it("should transfer eth to owner when minted", async () => {
      const initialBalanceOfOwner = await contractOwner.getBalance();
      const initialBalanceOfBuyer = await user1.getBalance();

      const nftPrice = ethers.utils.parseEther("1.25");

      const tx = await marketPlace.connect(user1).mint(10, { value: nftPrice });
      const rc = await tx.wait();

      const finalBalanceOfOwner = await contractOwner.getBalance();
      const finalBalanceOfBuyer = await user1.getBalance();

      expect(finalBalanceOfOwner).to.be.equal(
        initialBalanceOfOwner.add(nftPrice)
      );

      const weiSpentOnTx = await tx.gasPrice.mul(await rc.gasUsed);
      const totalSpentByBuyer = nftPrice.add(weiSpentOnTx);
      expect(finalBalanceOfBuyer).to.be.equal(
        initialBalanceOfBuyer.sub(totalSpentByBuyer)
      );
    });
  });
});
