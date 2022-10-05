const { ethers } = require("hardhat")

module.exports = async function ({ getNamedAccounts }) {
    const { deployer } = await getNamedAccounts()

    //RandomIPFSNFT
    console.log("Diving into Underland...")
    const underlandContract = await ethers.getContract("Underland", deployer)
    const mintFee = await underlandContract.getMintFee()

    await new Promise(async function (resolve, reject) {
        setTimeout(resolve, 300000) // 5 minutes
        underlandContract.once("NftMint", async function () {
            resolve()
        })
        const underlandNFTTx = await underlandContract.requestNFT({ value: mintFee.toString() })
        const underlandNFTTxReceipt = await underlandNFTTx.wait(1)
    })
    console.log(`Underland NFT Index 0 tokenURI: ${await underlandContract.tokenURI(0)}`)
}

module.exports.tags = ["all", "mint"]
