const { expect } = require("chai");
const { ethers } = require("ethers");
const FunToken = require("../artifacts/contracts/NFT.sol/FunToken.json");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const hre = require("hardhat");
const fs = require("fs");

describe("MyContract", function() {
  async function deployToken() {
   // 部署合约后，需要提供合约地址和 ABI 来创建合约实例
const contractAddress = "0x5e3Ef3e00ee7E03bE710582979A38779A3Dd6c9b";
//const privateKey = "3475fb43dd76c48efaa08a730da357b9e9df750fafbbe33d8a2fdf249c5c80fa";
const privateKey = "5899420858906eb61100f277cbb46a3690a2ca2137b0bb612eeee542f5992f27";

const contractABI = FunToken.abi;
// 连接以太坊网络
const provider = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/e02c3806bdc04456a47ba78b7a94b7aa");
const wallet = new ethers.Wallet(privateKey, provider);
const owner = wallet.connect(provider);
// 创建已部署合约实例
const contract = new ethers.Contract(contractAddress, contractABI, owner);

        // Fixtures can return anything you consider useful for your tests
    return { contract,owner };
  }




  async function deployTokenlocation() {
    const Token = await hre.ethers.getContractFactory("FunToken");
    const [owner, addr1] = await hre.ethers.getSigners();
    

    const contract = await Token.deploy();

    await contract.deployed();

    // Fixtures can return anything you consider useful for your tests
    return { Token, contract, owner, addr1};
  }

  it("FunToken test", async function () {
    const { Token, contract, owner, addr1 } = await loadFixture(deployTokenlocation);
    const SVG = await fs.readFileSync("/home/boss/nft_test/matedata/images/1470950105.svg", { encoding: "utf8" })
    const ownerBalance = await contract.svgToEncodePacked(SVG);
    const encodeSVG = await contract.svgToBase64(ownerBalance);
     const MintSVG = await contract.payToMint(owner.address,encodeSVG, {
      value: ethers.utils.parseEther("0.001"), // 发送 ETH

    });
   // console.log(ownerBalance);
    //console.log(owner.address);
    //console.log(MintSVG);
  });


    it("FunToken goerli",async function () {
      const { contract, owner } = await loadFixture(deployToken);
    const SVG = await fs.readFileSync("/home/boss/nft_test/matedata/images/1470950105.svg", { encoding: "utf8" })
    const ownerBalance = await contract.svgToEncodePacked(SVG);
    const encodeSVG = await contract.svgToBase64(ownerBalance);
    const MintSVG = await contract.payToMint(owner.address,encodeSVG, {
      value: ethers.utils.parseEther("0.001"), // 发送 ETH
    });
    console.log(encodeSVG);
    


    });

 
});
