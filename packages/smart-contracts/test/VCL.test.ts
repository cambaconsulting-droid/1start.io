import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("VCL", function () {
  // Esta es la "receta" para preparar nuestro mundo de pruebas.
  async function deployVCLFixture() {
    // Obtenemos 3 cuentas de prueba: el dueño y dos extras.
    const [owner, addr1, addr2] = await ethers.getSigners();

    // Para poder construir el contrato VCL, PRIMERO necesitamos construir un VerinstatePassport.
    // Es como necesitar harina para hacer un pastel.
    const VerinstatePassportFactory = await ethers.getContractFactory("VerinstatePassport");
    const verinstatePassport = await VerinstatePassportFactory.deploy();
    const passportAddress = await verinstatePassport.getAddress();

    // Ahora que tenemos la "harina" (la dirección del pasaporte), podemos construir el VCL.
    const VCLFactory = await ethers.getContractFactory("VCL");
    const vcl = await VCLFactory.deploy(passportAddress); // Le damos la dirección como ingrediente

    // Devolvemos todas las piezas que necesitaremos para nuestras pruebas.
    return { vcl, verinstatePassport, owner, addr1, addr2 };
  }

  // La primera sección de pruebas es sobre el despliegue.
  describe("Deployment", function () {
    
    it("Should set the correct owner", async function () {
      // Cargamos nuestro mundo de pruebas.
      const { vcl, owner } = await loadFixture(deployVCLFixture);

      // Le decimos al inspector: "Espero que el dueño del contrato VCL sea la cuenta 'owner'".
      expect(await vcl.owner()).to.equal(owner.address);
    });

    it("Should store the correct VerinstatePassport contract address", async function () {
      // Cargamos nuestro mundo de pruebas.
      const { vcl, verinstatePassport } = await loadFixture(deployVCLFixture);
      const passportAddress = await verinstatePassport.getAddress();

      // Le decimos al inspector: "Espero que la dirección del pasaporte guardada dentro del VCL
      // sea la misma que la del contrato de pasaporte que creamos".
      expect(await vcl.passportContract()).to.equal(passportAddress);
    });

  });

      // --- ¡NUEVA SECCIÓN DE PRUEBAS AQUÍ! ---

    describe("Capacity Management", function () {
      it("Should allow the owner to update VCL data for a passport", async function () {
        // Preparamos el taller: necesitamos los contratos, el dueño y una dirección extra.
        const { vcl, verinstatePassport, owner, addr1 } = await loadFixture(deployVCLFixture);
        
        // Paso 1: Creamos un pasaporte de prueba (ID 0) para la dirección addr1.
        await verinstatePassport.safeMint(addr1.address);

        // Paso 2: El dueño actualiza la ficha del pasaporte #0 con nuevos datos.
        // Esperamos que esta acción emita nuestro "sello de notificación" VCLUpdated.
        await expect(vcl.updateVCL(0, 5, 4, 3, 2))
          .to.emit(vcl, "VCLUpdated")
          .withArgs(0, 5, 4); // Verificamos que el recibo tenga los datos correctos

        // Paso 3: Pedimos una copia de la ficha del pasaporte #0 para inspeccionarla.
        const data = await vcl.getVCL(0);

        // Paso 4: Usamos la lupa para verificar que cada dato en la ficha es correcto.
        expect(data.financialLevel).to.equal(5);
        expect(data.technicalLevel).to.equal(4);
        expect(data.operationalLevel).to.equal(3);
        expect(data.complianceLevel).to.equal(2);
        expect(data.isVerified).to.be.true;
      });

      it("Should NOT allow another address to update VCL data", async function () {
        // Preparamos el taller: necesitamos el contrato VCL y un actor que NO es el dueño (addr1).
        const { vcl, addr1 } = await loadFixture(deployVCLFixture);

        // Le decimos al inspector: "Espera que esta acción falle".
        // El actor addr1 intenta actualizar la ficha del pasaporte #0.
        await expect(vcl.connect(addr1).updateVCL(0, 1, 1, 1, 1))
          .to.be.revertedWithCustomError(vcl, "OwnableUnauthorizedAccount"); // Esperamos el error específico de "No eres el dueño".
      });
    });
});