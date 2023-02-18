import WalletBalance from './WalletBalance';
import { useEffect, useState } from 'react';
import fs from 'fs';
import { ethers } from 'ethers';
import FiredGuys from '../../artifacts/contracts/NFT.sol/FunToken.json';

const contractAddress = '0x5c1445a9e241757D877CE5cDc8642545FADA274a';

const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, FiredGuys.abi, signer);



function Home() {

  const [totalMinted, setTotalMinted] = useState(0);
  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    const count = await contract.count();
    console.log(parseInt(count));
    setTotalMinted(parseInt(count));
    
  };
  
  function NFTImage({ tokenId, getCount }) {
    const contentId = 'QmW3LQgh6KJNzwt9TsurZVEkszzZjryGXFeed2u4R9Yy1x';
    const metadataURI = `${contentId}/${tokenId}.json`;
    const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.jpg`;

   



    const [isMinted, setIsMinted] = useState(false);
    useEffect(() => {
      getMintedStatus();
    }, [isMinted]);
  
    const getMintedStatus = async () => {
      const result = await contract.isContentOwned(metadataURI);
      console.log(result)
      setIsMinted(result);
    };
  
    const mintToken = async () => {

      const SVG =  await fs.readFileSync("/home/boss/nft_test/matedata/images/1470950105.svg", { encoding: "utf8" })
      const ownerBalance = await contract.svgToEncodePacked(SVG);
      const encodeSVG = await contract.svgToBase64(ownerBalance);

      const connection = await contract.connect(signer);
      const addr = connection.address;
      const result = await contract.payToMint(addr, encodeSVG, {
        value: ethers.utils.parseEther('0.05'),
      });
      console.log(addr);
      await result.wait();
      getMintedStatus();
      getCount();
    };
  
    async function getURI() {
      const uri = await contract.tokenURI(tokenId);
     
      alert(uri);
    }
    return (
      <div>
        <img src={isMinted ? imageURI : 'img/9.jpg'}></img>
          <h5>ID #{tokenId}</h5>
          {!isMinted ? (
            <button onClick={mintToken}>
              Mint
            </button>
          ) : (
            <button onClick={getURI}>
              Taken! Show URI
            </button>
          )}
          <button onClick={getMintedStatus}>
          getMintedStatus
            </button>
      </div>
    );
  
  
    }
    return (
      <div>
          <WalletBalance />
  
          {Array(totalMinted + 1)
          .fill(0)
          .map((_, i) => (
              <div key={i}>
              <NFTImage tokenId={i} getCount={getCount} />
              </div>
          ))}
      </div>
    );

 
}

export default Home;