const { ethers, network } = require("hardhat")

async function mint() {
    const underland = await ethers.getContract("Underland")
    const mintFee = await underland.getMintFee()
    const token = await underland.getTokenCounter()
    console.log(`${token}`)
    console.log("Minting...")
    for (i = 0; i <= 100; i++) {
        const underlandTx = await underland.requestNFT({ value: mintFee })
        const underlandTxReceipt = await underlandTx.wait(1)
        console.log(`Minted token! TokenURI: ${await underland.tokenURI(token)}`)
    }
    const tokenArray = await underland.getTokenArray()
    console.log(tokenArray)
}

async function tokenArray() {
    const underland = await ethers.getContract("Underland")
    const tokenArray = await underland.getTokenArray()
    console.log(tokenArray)
}

tokenArray()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
