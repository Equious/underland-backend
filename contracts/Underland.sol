// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

error RandomIpfsNft__RangeOutOfBounds();
error RandomIpfsNft__NeedMoreEth();
error RandomIpfsNft__TransferFailed();

contract Underland is ERC721URIStorage, Ownable {
    //Type Declaration
    enum Theme {
        ALICE,
        CATERPILLAR,
        CHESHIRE,
        DORMOUSE,
        HATTER,
        JABBERWOCKY,
        CARDS,
        HOLES,
        QUEEN,
        WONDERS
    }

    //NFT Variables
    uint256 public s_tokenCounter;
    uint256 internal constant MAX_CHANCE_VALUE = 100;
    uint256 internal MAX_IMAGE_VALUE = 0;
    string[10] internal s_themeTokenUris;
    string[] internal s_imageUris;
    uint256 internal i_mintFee;
    mapping(uint256 => address) public s_tokenIdToSender;

    //Events
    event NftRequested(address requester);
    event NftMint(string tokenURI, address minter);

    constructor(string[10] memory themeTokenUris, uint256 mintFee) ERC721("Underland", "ULND") {
        s_themeTokenUris = themeTokenUris;
        i_mintFee = mintFee;
        s_tokenCounter = 0;
    }

    function requestNFT() public payable {
        if (msg.value < i_mintFee) {
            revert RandomIpfsNft__NeedMoreEth();
        }

        s_tokenIdToSender[s_tokenCounter] = msg.sender;
        fulfillRandomness();

        emit NftRequested(msg.sender);
    }

    function fulfillRandomness() internal {
        uint256 newTokenId = s_tokenCounter;
        s_tokenCounter = s_tokenCounter + 1;
        string memory imgPrefix = "";
        uint256 moddedRng = uint256(keccak256(abi.encodePacked(block.timestamp))) %
            MAX_CHANCE_VALUE;
        string memory currentTheme = getThemeFromRng(moddedRng, s_themeTokenUris);

        //What the fuck, is all I can say here. I need a better comparison lol
        if (
            keccak256(abi.encodePacked(currentTheme)) ==
            keccak256(abi.encodePacked(s_themeTokenUris[0]))
        ) {
            MAX_IMAGE_VALUE = 20;
            imgPrefix = "/Alice_";
        } else if (
            keccak256(abi.encodePacked(currentTheme)) ==
            keccak256(abi.encodePacked(s_themeTokenUris[1]))
        ) {
            MAX_IMAGE_VALUE = 20;
            imgPrefix = "/Caterpillar_";
        } else if (
            keccak256(abi.encodePacked(currentTheme)) ==
            keccak256(abi.encodePacked(s_themeTokenUris[2]))
        ) {
            MAX_IMAGE_VALUE = 20;
            imgPrefix = "/Cheshire_";
        } else if (
            keccak256(abi.encodePacked(currentTheme)) ==
            keccak256(abi.encodePacked(s_themeTokenUris[3]))
        ) {
            MAX_IMAGE_VALUE = 20;
            imgPrefix = "/Mouse_";
        } else if (
            keccak256(abi.encodePacked(currentTheme)) ==
            keccak256(abi.encodePacked(s_themeTokenUris[4]))
        ) {
            MAX_IMAGE_VALUE = 25;
            imgPrefix = "/Hatter_";
        } else if (
            keccak256(abi.encodePacked(currentTheme)) ==
            keccak256(abi.encodePacked(s_themeTokenUris[5]))
        ) {
            MAX_IMAGE_VALUE = 20;
            imgPrefix = "/Jabber_";
        } else if (
            keccak256(abi.encodePacked(currentTheme)) ==
            keccak256(abi.encodePacked(s_themeTokenUris[6]))
        ) {
            MAX_IMAGE_VALUE = 20;
            imgPrefix = "/Card_";
        } else if (
            keccak256(abi.encodePacked(currentTheme)) ==
            keccak256(abi.encodePacked(s_themeTokenUris[7]))
        ) {
            MAX_IMAGE_VALUE = 25;
            imgPrefix = "/Hole_";
        } else if (
            keccak256(abi.encodePacked(currentTheme)) ==
            keccak256(abi.encodePacked(s_themeTokenUris[8]))
        ) {
            MAX_IMAGE_VALUE = 20;
            imgPrefix = "/Queen_";
        } else if (
            keccak256(abi.encodePacked(currentTheme)) ==
            keccak256(abi.encodePacked(s_themeTokenUris[9]))
        ) {
            MAX_IMAGE_VALUE = 65;
            imgPrefix = "/Wonder_";
        }

        string memory imgRng = Strings.toString(
            uint256(keccak256(abi.encodePacked(block.timestamp))) % MAX_IMAGE_VALUE
        );
        string memory currentTokenUri = string(
            abi.encodePacked(currentTheme, imgPrefix, imgRng, ".json")
        );
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, currentTokenUri);
        emit NftMint(currentTokenUri, msg.sender);
    }

    function getThemeFromRng(uint256 moddedRng, string[10] memory themeUris)
        public
        pure
        returns (string memory themeIndex)
    {
        uint256 cumulativeSum = 0;
        uint256[10] memory chanceArray = getThemeChance();
        for (uint256 i = 0; i < chanceArray.length; i++) {
            if (moddedRng >= cumulativeSum && moddedRng < cumulativeSum + chanceArray[i]) {
                return themeUris[i];
            }
            cumulativeSum += chanceArray[i];
        }
        revert RandomIpfsNft__RangeOutOfBounds();
    }

    function getThemeChance() public pure returns (uint256[10] memory) {
        return [10, 10, 10, 10, 10, 10, 10, 10, 10, MAX_CHANCE_VALUE];
    }

    function getMintFee() public view returns (uint256) {
        return i_mintFee;
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}
