const express = require("express");

const AdministradorController = require("../controller/Funcionario/AdministradorController");

const {
  validarNovoFuncionario,
  validarAtualizacaoFuncionario,
} = require("../middlewares/validarFuncionario");

class FuncionarioRoutes {
  constructor() {
    this.router = express.Router();
    this.administradorController = new AdministradorController();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get(
      "/funcionario",
      this.administradorController.listarFuncionarios.executar
    );
    this.router.post(
      "/funcionario",
      validarNovoFuncionario,
      this.administradorController.cadastrarFuncionario.executar
    );
    this.router.get(
      "/funcionario/:idFuncionario",
      this.administradorController.recuperarFuncionarioPorId.executar
    );
    this.router.put(
      "/funcionario/:idFuncionario",
      validarAtualizacaoFuncionario,
      this.administradorController.atualizarFuncionario.executar
    );
    this.router.delete(
      "/funcionario/:idFuncionario",
      this.administradorController.deletarFuncionario.executar
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = FuncionarioRoutes;
