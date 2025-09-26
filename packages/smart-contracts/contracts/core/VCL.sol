// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./VerinstatePassport.sol";

/**
 * @title Verified Capacity Level (VCL)
 * @dev Contrato para gestionar la reputación y las capacidades verificadas de las
 * entidades que poseen un Verinstate Passport.
 */
contract VCL is Ownable {

    // Declaración de una variable para hacer referencia a nuestro contrato de pasaportes
    VerinstatePassport public immutable passportContract;

    // Estructura para almacenar los datos de capacidad de cada entidad
    struct CapacityData {
        uint256 financialLevel; // Nivel de capacidad financiera (ej. 1 a 5)
        uint256 technicalLevel; // Nivel de capacidad técnica (ej. 1 a 5)
        uint256 operationalLevel; // Nivel de capacidad operativa (ej. 1 a 5)
        uint256 complianceLevel; // Nivel de cumplimiento (ej. 1 a 5)
        bool isVerified;        // Indica si los datos han sido verificados
    }

    // Un "mapa" para asociar el ID de un pasaporte (un tokenId) con sus datos de capacidad
    mapping(uint256 => CapacityData) public capacityRegistry;

    /**
     * @dev El constructor inicializa el contrato apuntando a la dirección
     * del contrato VerinstatePassport desplegado.
     * @param _passportAddress La dirección del contrato VerinstatePassport.
     */
    constructor(address _passportAddress) Ownable(msg.sender) {
        passportContract = VerinstatePassport(_passportAddress);
    }

    // --- Aquí añadiremos las funciones para actualizar y leer los niveles de capacidad ---

    // Evento que se emite cada vez que se actualiza un VCL.
    // Es como un "recibo" público en la blockchain.
    event VCLUpdated(uint256 indexed tokenId, uint256 financialLevel, uint256 technicalLevel);

    /**
     * @dev Permite al dueño del contrato establecer o actualizar los datos de capacidad
     * para un pasaporte específico (tokenId).
     * Solo el dueño puede llamar a esta función, garantizando que solo Verinstate
     * puede verificar y sellar la capacidad de una entidad.
     */
    function updateVCL(
        uint256 tokenId,
        uint256 _financialLevel,
        uint256 _technicalLevel,
        uint256 _operationalLevel,
        uint256 _complianceLevel
    ) public onlyOwner {
        // Creamos una "ficha" en la memoria con los nuevos datos.
        CapacityData memory newData = CapacityData({
            financialLevel: _financialLevel,
            technicalLevel: _technicalLevel,
            operationalLevel: _operationalLevel,
            complianceLevel: _complianceLevel,
            isVerified: true // Si el dueño lo actualiza, está verificado.
        });

        // Guardamos la nueva ficha en nuestro gran archivador.
        capacityRegistry[tokenId] = newData;

        // Emitimos el "recibo" para que todo el mundo sepa que este pasaporte fue actualizado.
        emit VCLUpdated(tokenId, _financialLevel, _technicalLevel);
    }

    /**
     * @dev Permite a cualquiera leer los datos de capacidad de un pasaporte.
     * Es una función de "vista", no cuesta gas llamarla.
     */
    function getVCL(uint256 tokenId) public view returns (CapacityData memory) {
        return capacityRegistry[tokenId];
    }

}