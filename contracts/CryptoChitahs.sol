// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CryptoChitahs is ERC721URIStorage {
    uint256 public totalSupply;
    address public minter;
    address public owner;
    string public baseURI;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _totalSupply,
        address _owner,
        address _minter,
        string memory _baseUri
    ) ERC721(_name, _symbol) {
        totalSupply = _totalSupply;
        owner = _owner;
        minter = _minter;
        baseURI = _baseUri;
    }

    // Modifiers
    modifier onlyMinter() {
        require(msg.sender == minter, "Only minter can perform this action");
        _;
    }
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    // Functions

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function mint(address to, uint256 tokenId)
        public
        onlyMinter
        returns (uint256)
    {
        require(
            tokenId > 0 && tokenId <= totalSupply,
            string(
                abi.encodePacked(
                    "tokenId can only be >=1 and <=",
                    Strings.toString((totalSupply))
                )
            )
        );
        _mint(to, tokenId);
        _setTokenURI(
            tokenId,
            string(abi.encodePacked(Strings.toString(tokenId), ".json"))
        );

        return tokenId;
    }
}
