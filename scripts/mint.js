const { ethers } = require("hardhat")

async function mint() {
    const underland = await ethers.getContract("Underland")
    const mintFee = await underland.getMintFee()
    const token = await underland.getTokenCounter()
    console.log(`${token}`)
    console.log("Minting...")
    const underlandTx = await underland.requestNFT({ value: mintFee })
    const underlandTxReceipt = await underlandTx.wait(1)
    console.log(`Minted token! TokenURI: ${await underland.tokenURI(token)}`)
}

mint()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
