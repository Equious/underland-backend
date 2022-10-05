const { network, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

//jsons which include imageURIs
let tokenUris = [
    "ipfs://QmW6WggueCFvbYyRkykSq7kq6b15YZ8gAdZoWRb2CDyEJ5",
    "ipfs://QmWCNiwvRLStSddqhHCb5hrGSFnbwdZAGTYrEYURszmt8Y",
    "ipfs://QmeK1K4inX5xeDvopowx1czcY11TVgQksNHD39TLJi5VBC",
    "ipfs://QmQwVpDBgnkKaYBCSzj4K4LvfYuawV3EbNR6As9obSDLk7",
    "ipfs://QmW9MJRKczZtwZ1V3YF1wj3bRfkc2f2wakw2kftZhofku5",
    "ipfs://QmSvgs96BSkZXo4S1LxBJuEyRRWeBiUaXaoMi5kotUxwH4",
    "ipfs://QmQhQHdBBaPUMDEFqs7EpYnJmz1QwdRf7Gib97gDYFnr2o",
    "ipfs://QmS6DCMUovXiMR2JG7UmWmzQdZ2BZ4RVeALXajanxHp3b5",
    "ipfs://QmRDtPDgcBqg6dZ4KqaGAzKtAVm24GZT9TQcnLLCDuGm6J",
    "ipfs://QmarFKXmszVfvMntS2WWBADJH4BpF82QgKtDqsNF22rnuo",
]

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
