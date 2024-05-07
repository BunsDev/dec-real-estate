// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract RealEstateToken is ERC1155, Ownable, ERC1155Burnable, ERC1155Supply {
    struct Token {
        string uri;
        address creator;
        uint256 totalSupply;
        uint256 remainingSupply;
    }

    Counters.Counter private _currentTokenId;
    mapping(uint256 => Token) public tokens;

    constructor() ERC1155("https://example.com/api/{id}.json") {}

    function createToken(
        address account,
        uint256 amount,
        string memory uri
    ) public onlyOwner {
        require(amount > 0, "Amount should be greater than 0");

        _currentTokenId.increment();
        uint256 tokenId = _currentTokenId.current();
        tokens[tokenId] = Token(uri, account, amount, amount);
        _mint(account, tokenId, amount, "");
    }

    function transferTokens(
        address from,
        address to,
        uint256 tokenId,
        uint256 amount
    ) public {
        require(balanceOf(from, tokenId) >= amount, "Insufficient balance");

        safeTransferFrom(from, to, tokenId, amount, "");
    }

    function getAccountTokens(
        address account
    ) public view returns (uint256[] memory) {
        uint256[] memory accountTokens = new uint256[](balanceOf(account));
        for (uint256 i = 0; i < balanceOf(account); i++) {
            accountTokens[i] = tokenOfOwnerByIndex(account, i);
        }
        return accountTokens;
    }

    function buyTokens()
}
