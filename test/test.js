const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("Token contract", function () {
  async function deployTokenFixture() {
    const Token = await ethers.getContractFactory("Token");
    const [owner] = await ethers.getSigners();

    const hardhatToken = await Token.deploy();

    await hardhatToken.deployed();

    // Fixtures can return anything you consider useful for your tests
    return { Token, hardhatToken, owner };
  }

  it("Should assign the total supply of tokens to the owner", async function () {
    const { hardhatToken, owner } = await loadFixture(deployTokenFixture);

    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });

  it("Should transfer tokens between accounts", async function () {
    const { hardhatToken, owner, addr1, addr2 } = await loadFixture(
      deployTokenFixture
    );

    // Transfer 50 tokens from owner to addr1
    await expect(
      hardhatToken.transfer(addr1.address, 50)
    ).to.changeTokenBalances(hardhatToken, [owner, addr1], [-50, 50]);

    // Transfer 50 tokens from addr1 to addr2
    // We use .connect(signer) to send a transaction from another account
    await expect(
      hardhatToken.connect(addr1).transfer(addr2.address, 50)
    ).to.changeTokenBalances(hardhatToken, [addr1, addr2], [-50, 50]);
  });
});



  

 /* describe("Token contract", async function () {
     it("Deployments", async function () {
      
const [owner] = await ethers.getSigners();
  
      const Token = await ethers.getContractFactory("FunToken");
  
      const hardhatToken = await Token.deploy();
  
      const ownerBalance = await hardhatToken.payToMint(owner.address,'https://gateway.pinata.cloud/ipfs/QmRM6rerPF4DNNAvD8SFMkKrv6oxZAPcCVLeRMGKXoK4x9?_gl=1*1ag1yd0*_ga*MTUwMDk3MzYwNi4xNjc1NTAyMDI0*_ga_5RMPXG14TE*MTY3NjEyOTcyMy4xOS4wLjE2NzYxMjk3MjMuNjAuMC4w',{value: ethers.utils.parseEther('0.05')});
       
      console.log(ownerBalance);

    });
  });
    */
  

