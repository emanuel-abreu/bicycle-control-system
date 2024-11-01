const express = require("express");
const CartaoDeCreditoController = require("../controller/CartaoDeCreditoController");

class CartaoDeCreditoRoutes {
  constructor() {
    this.router = express.Router();
    this.cartaoDeCreditoController = new CartaoDeCreditoController();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get(
      "/cartaoDeCredito/:idCiclista",
      this.cartaoDeCreditoController.recuperarCartaoDeCredito
    );
    this.router.put(
      "/cartaoDeCredito/:idCiclista",
      this.cartaoDeCreditoController.alterarCartaoDeCredito
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = CartaoDeCreditoRoutes;