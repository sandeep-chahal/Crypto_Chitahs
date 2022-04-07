// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "./CryptoChitahs.sol";

contract MarketPlace {
    address payable public owner;
    CryptoChitahs public nft;
    bool public canMint;
    uint256 public totalMinted;
    uint256 public basePrice;

    // tokenId => additional price
    mapping(uint256 => uint256) public boostedPrice;

    constructor(
        address _owner,
        address _nftAddress,
        bool _canMint,
        uint256 _basePrice
    ) {
        owner = payable(_owner);
        nft = CryptoChitahs(_nftAddress);
        canMint = _canMint;
        basePrice = _basePrice;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    function setOwner(address _owner) public onlyOwner {
        owner = payable(_owner);
    }

    function setBasePrice(uint256 _price) public onlyOwner {
        basePrice = _price;
    }

    function setBoostedPrice(
        uint256[] memory _tokenIDs,
        uint256[] memory _boostedPrices
    ) public onlyOwner {
        require(
            _tokenIDs.length == _boostedPrices.length,
            "tokenIDs and boostedPrices array length doesn't match"
        );

        uint256 totalSupply = nft.totalSupply();
        require(
            _tokenIDs.length <= totalSupply,
            "tokenID array is bigger than total supply"
        );

        for (uint256 i = 0; i < _tokenIDs.length; i++) {
            uint256 tokenId = _tokenIDs[i];
            uint256 price = _boostedPrices[i];

            require(
                tokenId > 0 && tokenId <= totalSupply,
                string(
                    abi.encodePacked(
                        "tokenId array contains wrong token id at index of ",
                        Strings.toString(i)
                    )
                )
            );
            boostedPrice[tokenId] = price;
        }
    }

    function getPrices(uint256[] memory _tokenIDs)
        public
        view
        returns (uint256[] memory)
    {
        uint256 totalSupply = nft.totalSupply();
        require(
            _tokenIDs.length <= totalSupply,
            "tokenID array is bigger than total supply"
        );

        uint256[] memory prices = new uint256[](_tokenIDs.length);

        for (uint256 i = 0; i < _tokenIDs.length; i++) {
            uint256 tokenId = _tokenIDs[i];

            require(
                tokenId > 0 && tokenId <= totalSupply,
                string(
                    abi.encodePacked(
                        "tokenId array contains wrong token id at index of ",
                        Strings.toString(i)
                    )
                )
            );

            prices[i] = boostedPrice[tokenId] + basePrice;
        }
        return prices;
    }

    function setMinting(bool _canMint) public onlyOwner {
        canMint = _canMint;
    }

    function mint(uint256 tokenId) public payable returns (bool) {
        require(canMint, "Minting is not started");

        uint256 totalPrice = basePrice + boostedPrice[tokenId];
        require(msg.value == totalPrice, "Incorrect price");

        nft.mint(msg.sender, tokenId);

        owner.transfer(msg.value);
        boostedPrice[tokenId] = 0;
        totalMinted += 1;

        return true;
    }
}
