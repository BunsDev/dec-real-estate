// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";

contract RealEstateToken is ERC1155, Ownable, ERC1155Pausable, ERC1155Burnable {
    uint256 private currentTokenId;

    mapping(uint256 => uint256) private tokens; // tokenId => supply

    constructor(
        address initialOwner
    )
        ERC1155("http://localhost:3000/api/realEstate/{id}")
        Ownable(initialOwner)
    {
        currentTokenId = 1;
    }

    function createToken(uint256 supply) public returns (uint256, uint256) {
        _mint(msg.sender, currentTokenId, supply, "0x0");
        tokens[currentTokenId] = supply;
        currentTokenId++;

        return (currentTokenId - 1, supply);
    }

    function exhcangeEthForTokens(
        address payable tokenOwner,
        uint256 tokenId,
        uint256 numOfTokens
    ) public payable {
        require(
            tokens[tokenId] * numOfTokens == msg.value,
            "Prices do not match"
        );
        require(tokenOwner != msg.sender, "User cannot buy his own tokens");

        safeTransferFrom(tokenOwner, msg.sender, tokenId, numOfTokens, "");

        tokenOwner.transfer(msg.value);
    }

    receive() external payable {}

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyOwner {
        _mint(account, id, amount, data);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }

    // The following functions are overrides required by Solidity.

    function _update(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values
    ) internal override(ERC1155, ERC1155Pausable) {
        super._update(from, to, ids, values);
    }

    function getCurrentTokenId() public view returns (uint256) {
        return currentTokenId;
    }
}
