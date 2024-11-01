const CadastrarFuncionario = require("./Administrador/CadastrarFuncionario");
const ListarFuncionarios = require("./Administrador/ListarFuncionarios");
const RecuperarFuncionarioPorId = require("./Administrador/RecuperarFuncionarioPorId");
const AtualizarFuncionario = require("./Administrador/AtualizarFuncionario");
const DeletarFuncionario = require("./Administrador/DeletarFuncionario");

class AdministradorController {
  constructor() {
    this.cadastrarFuncionario = new CadastrarFuncionario();
    this.listarFuncionarios = new ListarFuncionarios();
    this.recuperarFuncionarioPorId = new RecuperarFuncionarioPorId();
    this.atualizarFuncionario = new AtualizarFuncionario();
    this.deletarFuncionario = new DeletarFuncionario();
  }
}

module.exports = AdministradorController;
