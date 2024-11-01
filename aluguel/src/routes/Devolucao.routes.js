const express = require("express");
const DevolucaoController = require("../controller/DevolucaoController");

class DevolucaoRoutes {
    constructor() {
        this.router = express.Router();
        this.devolucaoController = new DevolucaoController();
        this.setupRoutes();
    }
    
    setupRoutes() {
        this.router.post(
        "/devolucao",
        this.devolucaoController.realizarDevolucao
        );
    }
    
    getRouter() {
        return this.router;
    }
}
module.exports = DevolucaoRoutes;