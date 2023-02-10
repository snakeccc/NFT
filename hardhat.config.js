require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig **/
/*module.exports = {
  solidity: "0.8.17",
  network:{
    goerli:{
      url:"https://goerli.infura.io/v3/e02c3806bdc04456a47ba78b7a94b7aa",
 accounts:["3475fb43dd76c48efaa08a730da357b9e9df750fafbbe33d8a2fdf249c5c80fa"]}
  },
};


export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      resolveExtensions: ['.web.js', '.js', '.ts', '.web.ts', '.tsx', '.jsx'],
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
  },
});*/
module.exports = {
  defaultNetwork: "goerli",
  networks: {
    hardhat: {
    },
    goerli: {
      url: "https://goerli.infura.io/v3/e02c3806bdc04456a47ba78b7a94b7aa",
      accounts: ['3475fb43dd76c48efaa08a730da357b9e9df750fafbbe33d8a2fdf249c5c80fa']
    }
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
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