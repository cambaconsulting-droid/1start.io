// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title OneStartPassport
 * @dev Un token no fungible para representar una identidad soberana y verificada.
 * Este contrato crea un "Pasaporte Digital" único para cada entidad en el ecosistema 1Start.
 * @dev Solo el "Dueño" (La Fundación 1Start) puede acuñar nuevos pasaportes.
 */
contract OneStartPassport is ERC721, Ownable {
    uint256 private _nextTokenId;

    /**
     * @dev Configura el nombre del token ("1Start Passport") y su símbolo ("1SP").
     */
    constructor() ERC721("1Start Passport", "1SP") Ownable(msg.sender) {}

    /**
     * @dev Acuña un nuevo pasaporte de identidad. Restringido al dueño del contrato.
     * @param to La dirección que recibirá el pasaporte.
     * @return El ID del nuevo token acuñado.
     */
    function safeMint(address to) public onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId;
        _nextTokenId++;
        _safeMint(to, tokenId);
        return tokenId;
    }
}