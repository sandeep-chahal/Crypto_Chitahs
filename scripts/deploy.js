// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const CryptoChitahs = await hre.ethers.getContractFactory("CryptoChitahs");
  const cryptoChitahs = await CryptoChitahs.deploy(
    "CryptoChitahs",
    "CC",
    3974,
    deployer.address,
    deployer.address,
    "https://cloudflare-ipfs.com/ipfs/QmXa9ZGusuAzTuXZviqcdu8fcF7ihpyjcUEw8Gk5n4gHgf/"
  );

  await cryptoChitahs.deployed();

  console.log("CryptoChitahs deployed to:", cryptoChitahs.address);

  // minting
  const mintTx1 = await cryptoChitahs
    .connect(deployer)
    .mint(deployer.address, 1);
  await mintTx1.wait();

  const mintTx2 = await cryptoChitahs
    .connect(deployer)
    .mint(deployer.address, 15);
  await mintTx2.wait();

  const mintTx3 = await cryptoChitahs
    .connect(deployer)
    .mint(deployer.address, 3456);
  await mintTx3.wait();

  console.log(await cryptoChitahs.balanceOf(deployer.address));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
