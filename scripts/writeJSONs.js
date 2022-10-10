const { storeTokenUriMetaData } = require("../utils/uploadToPinata")
const path = require("path")
const fs = require("fs")

async function handleTokenUris() {
    let tokenUris = []
    const metadataTemplate = {
        name: "",
        description: "",
        image: "",
        attributes: [],
    }

    let underlandImages = "ipfs://QmZxHQpavbcUDAEaZguKevAFiQtqRLPaivNzVn4mG9tXtb"
    // store the metadata in IPFS

    for (let i = 0; i <= 254; i++) {
        //create metadata
        //upload metadata
        let tokenUriMetadata = { ...metadataTemplate }
        if (i <= 19) {
            tokenUriMetadata.name = "Alice"
            tokenUriMetadata.description = `The Savior of Underland.`
            tokenUriMetadata.image = `${underlandImages}/${i}.png`
        } else if (i <= 39) {
            tokenUriMetadata.name = "Playing Cards"
            tokenUriMetadata.description = `It's all fun and games until...`
            tokenUriMetadata.image = `${underlandImages}/${i}.png`
        } else if (i <= 59) {
            tokenUriMetadata.name = "Caterpillar"
            tokenUriMetadata.description = `A mystical guide..`
            tokenUriMetadata.image = `${underlandImages}/${i}.png`
        } else if (i <= 79) {
            tokenUriMetadata.name = "Cheshire"
            tokenUriMetadata.description = `Friend or foe?`
            tokenUriMetadata.image = `${underlandImages}/${i}.png`
        } else if (i <= 104) {
            tokenUriMetadata.name = "Mad Hatter"
            tokenUriMetadata.description = `Twisted and brilliant.`
            tokenUriMetadata.image = `${underlandImages}/${i}.png`
        } else if (i <= 129) {
            tokenUriMetadata.name = "Rabbit Hole"
            tokenUriMetadata.description = `The path to Underland.`
            tokenUriMetadata.image = `${underlandImages}/${i}.png`
        } else if (i <= 149) {
            tokenUriMetadata.name = "Jabberwocky"
            tokenUriMetadata.description = `The Scourge of Underland.`
            tokenUriMetadata.image = `${underlandImages}/${i}.png`
        } else if (i <= 169) {
            tokenUriMetadata.name = "Dormouse"
            tokenUriMetadata.description = `Tea with a friend.`
            tokenUriMetadata.image = `${underlandImages}/${i}.png`
        } else if (i <= 189) {
            tokenUriMetadata.name = "Red Queen"
            tokenUriMetadata.description = `Underland's vicious monarch.`
            tokenUriMetadata.image = `${underlandImages}/${i}.png`
        } else if (i <= 254) {
            tokenUriMetadata.name = "Wonders of Underland"
            tokenUriMetadata.description = `Fantasy and magic can be found all around Underland.`
            tokenUriMetadata.image = `${underlandImages}/${i}.png`
        }

        console.log(`Writing ${tokenUriMetadata.name} ${i}...`)
        let jsonData = await JSON.stringify(tokenUriMetadata)
        fs.writeFileSync(`URIs/TokenURIs/${i}.json`, jsonData, function (err) {
            if (err) {
                console.log(err)
            }
        })
    }
    //store the JSON to pinata/IPFS
    //const metadataUploadResponse = await storeTokenUriMetaData(tokenUriMetadata)
    //tokenUris.push(`ipfs://${metadataUploadResponse.IpfsHash}`)
    console.log("Token URIs Written!🌟")
    //console.log(tokenUris)
    return tokenUris
}

handleTokenUris()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
