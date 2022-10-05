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
        "ipfs://QmWq78wNeyUhP73yTDtqWv1U3aVdpiwABRNq5zqDs7A4vm",
        "ipfs://QmWCtYjGSn8DpMXS496ctxbEWKWnRiSNhDZDn2Ueh5GFko",
        "ipfs://QmegZApWEL82qAT9NPihLWLYn6qNTRUyrBdRHkkhFnn4rs",
        "ipfs://QmcXUEFydyo8m56ZkQDZ2nAv4pYiQK2f2D3P3RJJEKFV9A",
        "ipfs://QmVoYd4qp8n78WkmAuxkEjpkBnp75epYQxyZ8QctMMMwq5",
        "ipfs://QmcVzZfhbbwSGVXbNkG6rRzBVxEVks6pSkFvBqNt2ZLp2S",
        "ipfs://QmYsYvnpwNqbHBpvYwj8oonAdP9wDk2RDxFhbgqEAeaJkY",
        "ipfs://QmNkn5CpuDwFXjDzBkbgPKb3k6jYT2vP55L5zzubhKTL9N",
    ]
    // store the metadata in IPFS

    for (let i = 0; i <= 64; i++) {
        //create metadata
        //upload metadata
        let tokenUriMetadata = { ...metadataTemplate }
        tokenUriMetadata.name = "Wonders of Underland"
        tokenUriMetadata.description = `Fantasy and magic can be found all around Underland.`
        tokenUriMetadata.image = `${themeFolders[9]}/Wonder_${i}.png`
        console.log(`Writing ${tokenUriMetadata.name} ${i}...`)
        let jsonData = await JSON.stringify(tokenUriMetadata)
        fs.writeFileSync(`URIs/WondersOfUnderlandJSONs/Wonder_${i}.json`, jsonData, function (err) {
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
