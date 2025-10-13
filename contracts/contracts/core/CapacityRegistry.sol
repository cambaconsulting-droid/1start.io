// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./OneStartPassport.sol";

/**
 * @title CapacityRegistry
 * @dev Contrato para registrar una prueba de la reputación y las capacidades verificadas
 * de las entidades que poseen un OneStartPassport.
 */
contract CapacityRegistry is Ownable {
    OneStartPassport public immutable passportContract;

    struct CapacityProof {
        bytes32 dataHash; // Un hash de los datos del score que están off-chain
        uint256 lastUpdated; // Timestamp de la última actualización
        bool isVerified;
    }

    mapping(uint256 => CapacityProof) public capacityRegistry;

    event CapacityProofUpdated(uint256 indexed tokenId, bytes32 dataHash);

    constructor(address _passportAddress) Ownable(msg.sender) {
        passportContract = OneStartPassport(_passportAddress);
    }

    /**
     * @dev Permite al dueño (un servicio de backend autorizado) actualizar la prueba
     * del score de capacidad para un pasaporte específico.
     */
    function updateCapacityProof(
        uint256 tokenId,
        bytes32 _dataHash
    ) public onlyOwner {
        capacityRegistry[tokenId] = CapacityProof({
            dataHash: _dataHash,
            lastUpdated: block.timestamp,
            isVerified: true
        });
        emit CapacityProofUpdated(tokenId, _dataHash);
    }

    /**
     * @dev Permite a cualquiera leer la prueba de capacidad de un pasaporte.
     */
    function getCapacityProof(uint256 tokenId) public view returns (CapacityProof memory) {
        return capacityRegistry[tokenId];
    }
}