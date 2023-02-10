const hre = require("hardhat");

async function main() {

  const FiredGuys = await hre.ethers.getContractFactory("FunToken");
  const firedGuys = await FiredGuys.deploy();

  await firedGuys.deployed();

  console.log("My NFT deployed to:", firedGuys.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });