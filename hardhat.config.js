require("@nomicfoundation/hardhat-toolbox");


module.exports = {
  networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/e02c3806bdc04456a47ba78b7a94b7aa",
      accounts: ['3475fb43dd76c48efaa08a730da357b9e9df750fafbbe33d8a2fdf249c5c80fa']
    },

    localhost:{
      url:"http://127.0.0.1:8545",
      accounts:["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"]
  }
  },



  solidity: {
    version: "0.8.9", 
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
}