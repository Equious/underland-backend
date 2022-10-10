const { network, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

//jsons which include imageURIs
let tokenUris = "https://ipfs.io/ipfs/QmSXCSUpNGXiSKfcTiGcMjhWSHiaqY5jMDD8QPY9RkQWr3/"

let imageUris = ["ipfs://QmW6WggueCFvbYyRkykSq7kq6b15YZ8gAdZoWRb2CDyEJ5"]

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    log("----------------------------------------------")

    const args = [tokenUris, networkConfig[chainId].mintFee]

    log("Tumbling down the rabbit hole... (Deploying Underland)")

    const underlandContract = await deploy("Underland", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    log("------------------------------")
    log("Verifying Underland...")

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(underlandContract.address, args)
        log("----------------------------------------------")
    }
}

module.exports.tags = ["all", "underland", "main"]
