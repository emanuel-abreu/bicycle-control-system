const express = require("express");
const CiclistaController = require("../controller/CiclistaController");

class CiclistaRoutes {
  constructor() {
    this.router = express.Router();
    this.ciclistaController = new CiclistaController();
    this.setupRoutes();
  }

  async setupRoutes() {
    this.router.post(
      "/ciclista",
      this.ciclistaController.cadastrarCiclista
    );
    this.router.get(
      "/ciclista/:idCiclista",
      this.ciclistaController.recuperarCiclista
    );
    this.router.put(
      "/ciclista/:idCiclista",
      this.ciclistaController.alterarCiclista
    );
    this.router.post(
      "/ciclista/:idCiclista/ativar",
      this.ciclistaController.ativarCadastroCiclista
    );
    this.router.get(
      "/ciclista/:idCiclista/permiteAluguel",
      this.ciclistaController.verificarPermissaoAluguel
    );
    this.router.get(
      "/ciclista/:idCiclista/bicicletaAlugada",
      this.ciclistaController.obterBicicletaAlugada
    );
    this.router.get(
      "/ciclista/existeEmail/:email",
      this.ciclistaController.verificarEmailExistente
    )
  }

  getRouter() {
    return this.router;
  }
}

module.exports = CiclistaRoutes;