// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title VerinstatePassport
 * @dev Un token no fungible para representar una identidad soberana y verificada.
 * Este contrato crea un "Pasaporte Digital" Único para cada entidad en el ecosistema Verinstate.
 * Puede ser emitido a Individuos (personas), organizaciones (empresas, hospitales) o entidades gubernamentales.
 * @dev Solo el "Dueño" del contrato (una entidad central de Verinstate) puede acuñar nuevos
 */
contract VerinstatePassport is ERC721, Ownable {
    uint256 private _nextTokenId;

    /**
     * @dev Configura el nombre del token ("Verinstate Passport") y su símbolo ("VIP").
     * El dueño inicial es la dirección que despliega el contrato.
     */
    constructor() ERC721("Verinstate Passport", "VIP") Ownable(msg.sender) {}

    /**
     * @dev Acuña un nuevo pasaporte de identidad.
     * Restringido para que solo pueda ser llamado por el dueño del contrato.
     * @param to La dirección de la billetera que recibirá el pasaporte (el dueño de la identidad).
     * @return El ID del nuevo token acuñado.
     */
    function safeMint(address to) public onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId;
        _nextTokenId++;
        _safeMint(to, tokenId);
        return tokenId;
    }
}