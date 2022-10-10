const { ethers } = require("hardhat")

async function withdraw() {
    const underland = await ethers.getContract("Underland")
    console.log(`Starting balance: ${underland.address.balance}`)
    const withdraw = await underland.withdraw()
    const withdrawRx = withdraw.wait(1)
    console.log(`Remaining balance: ${underland.address.balance}`)
}

withdraw()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
