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

    let themeFolders = [
        "ipfs://QmNTm3x4HnxDdoDsYgYor46DwdRQPy1TWkMq1CmdkD5you",
        "ipfs://QmUwvcR4jsm7NRhqLnhPre55diKsejxVq72u4b2CXfymam",
        "ipfs://QmbvNk8vSK9Zfd6ZXy7sthbGJvZnAkaE5132Thjddqe2v5",
        "ipfs://QmYCvEAkznhnfwuLtLijFSJhfvkp1jqFW4w22NeLk36aqz",
        "ipfs://QmNSKWjwJH4z7ok7q8DCGhQaWKEYSC3dvcQXBtgn6CDYkx",
        "ipfs://QmU1xG3FW5fQYNvAugwV5JMS2obzTtBW6Avb5x2vzyhjSA",
        "ipfs://QmNtjXARFYFy54myuoU7TYDdaizRoGjPWVNwJi8P1HUpbN",
        "ipfs://QmReyCpYmZ8zqnLaaC9Ps1psenL5g3MF4fA2aW17HgiyF2",
        "ipfs://QmTREyWTLoWnnHKRxib1AKaapy9fjTTjNftWawK2Q3Z4Hv",
        "ipfs://QmWfry6vdiLY794sh4763wyQ7uuWgEDqXDfkM4XKpwSyS7",
    ]
    // store the metadata in IPFS

    for (let i = 0; i <= 19; i++) {
        //create metadata
        //upload metadata
        let tokenUriMetadata = { ...metadataTemplate }
        tokenUriMetadata.name = "Caterpillar"
        tokenUriMetadata.description = `A mystical guide.`
        tokenUriMetadata.image = `${themeFolders[1]}/Caterpillar_${i}.png`
        console.log(`Uploading ${tokenUriMetadata.name} ${i}...`)

        //store the JSON to pinata/IPFS
        const metadataUploadResponse = await storeTokenUriMetaData(tokenUriMetadata)
        tokenUris.push(`ipfs://${metadataUploadResponse.IpfsHash}`)
    }
    console.log("Token URIs Uploaded!🌟")
    console.log(tokenUris)
    return tokenUris
}

handleTokenUris()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
