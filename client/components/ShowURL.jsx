import WalletBalance from './WalletBalance';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import FiredGuys from '../../artifacts/contracts/NFT.sol/FunToken.json';
import React from 'react';
import heroImg from '!!raw-loader!../img/1470950105.svg';






const ethersInstance = async () => {

    const contractAddress = '0x5c1445a9e241757D877CE5cDc8642545FADA274a';
    
    const provider = await new ethers.providers.Web3Provider(window.ethereum);
    
    // get the end user
    const signer = await provider.getSigner();
    
    // get the smart contract
    const contract = await new ethers.Contract(contractAddress, FiredGuys.abi, signer);
    const address = await signer.getAddress();
     console.log(address);
    return {contract,signer,address};
}

 function ShowURL() {
    const [imageSrc, setImageSrc] =  useState('');
   
    async function handleButtonClick() { 
      const { contract, signer ,address} = await ethersInstance();
      //const ownerBalance =  await contract.svgToEncodePacked();
      console.log(contract);
      /*const encodeSVG =  contract.svgToBase64(ownerBalance);
      const mintTransaction =  contract.payToMint(signer.address, encodeSVG, {
        value: ethers.utils.parseEther("0.001"), // 发送 ETH
      });
      const decodedStr =  atob(encodeSVG);*/
     
      //setImageSrc(decodedStr);
    }
    
    return (
    <div>
       <button onClick={handleButtonClick}>get</button>
      <img src={imageSrc} alt="My SVG" />
      
      
    </div>
    
    );
  }
  



export default ShowURL;