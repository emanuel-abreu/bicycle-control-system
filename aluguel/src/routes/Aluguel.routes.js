const express = require("express");
const AluguelController = require("../controller/AluguelController");

class AluguelRoutes {
    constructor() {
        this.router = express.Router();
        this.aluguelController = new AluguelController();
        this.setupRoutes();
    }
    
    setupRoutes() {
        this.router.post(
        "/aluguel",
        this.aluguelController.realizarAluguel
        );
    }
    
    getRouter() {
        return this.router;
    }
}
module.exports = AluguelRoutes;