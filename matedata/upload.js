const pinataSDK = require("@pinata/sdk")
const fs = require("fs")
const path = require("path")
//7f2342bbc6758538cf7f,984118bfce14fba7622f
//c0ed6e3449363b6c3dbdb6a691886b7ecef0ee154a896987475bf222b1279a73,e3435e038e36e031a867a7762abc60abc5428404788714b13ba4b02ff19dded5
const pinataApiKey = '7f2342bbc6758538cf7f'
const pinataApiSecret = 'c0ed6e3449363b6c3dbdb6a691886b7ecef0ee154a896987475bf222b1279a73'
const pinata = new pinataSDK(pinataApiKey, pinataApiSecret)

const metadataTemplate =  {
    description: "", 
    image: "", 
    name: "",
    attributes: [ {
        trait_type: "KingCat",
        value: "100"
    }]
  }



async function storeImages(imagesFilePath) {
    const fullImagesPath = path.resolve(imagesFilePath)

    // Filter the files in case the are a file that in not a .png
    const files = fs.readdirSync(fullImagesPath).filter((file) => file.includes(".png"))

    let responses = []
    console.log("Uploading to IPFS")

    for (const fileIndex in files) {
        const readableStreamForFile = fs.createReadStream(`${fullImagesPath}/${files[fileIndex]}`)
        const options = {
            pinataMetadata: {
                name: files[fileIndex],
            },
        }
        try {
            await pinata
                .pinFileToIPFS(readableStreamForFile, options)
                .then((result) => {
                    responses.push(result)
                })
                .catch((err) => {
                    console.log(err)
                })
        } catch (error) {
            console.log(error)
        }
    }
    return { responses, files }
}

async function storeTokenUriMetadata(metadata) {
    const options = {
        pinataMetadata: {
            name: metadata.name,
        },
    }
    try {
        const response = await pinata.pinJSONToIPFS(metadata, options)
        return response
    } catch (error) {
        console.log(error)
    }
    return null
}

async function handleTokenUris(imagesLocation) {
    // Check out https://github.com/PatrickAlphaC/nft-mix for a pythonic version of uploading
    // to the raw IPFS-daemon from https://docs.ipfs.io/how-to/command-line-quick-start/
    // You could also look at pinata https://www.pinata.cloud/
    tokenUris = []
    const { responses: imageUploadResponses, files } = await storeImages(imagesLocation)
    for (imageUploadResponseIndex in imageUploadResponses) {
        let tokenUriMetadata = { ...metadataTemplate }
        tokenUriMetadata.name = files[imageUploadResponseIndex].replace(".png", "")
        tokenUriMetadata.description = `An adorable ${tokenUriMetadata.name} pup!`
        tokenUriMetadata.image = `https://ipfs.io/ipfs/${imageUploadResponses[imageUploadResponseIndex].IpfsHash}`
        console.log(`Uploading ${tokenUriMetadata.name}...`)
        const metadataUploadResponse = await storeTokenUriMetadata(tokenUriMetadata)
        tokenUris.push(`https://ipfs.io/ipfs/${metadataUploadResponse.IpfsHash}`)
    }
    console.log("Token URIs uploaded! They are:")
    console.log(tokenUris)
    return tokenUris
}

handleTokenUris('./images').then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});


 /*storeImages('./images').then(() => process.exit(0))
 .catch((error) => {
   console.error(error);
   process.exit(1);
 });

 pinata.testAuthentication().then((result) => {
    //handle successful authentication here
    console.log(result);
}).catch((err) => {
    //handle error here
    console.log(err);
});*/