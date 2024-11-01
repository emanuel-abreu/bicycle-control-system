const erro = require("../../../utils/erro");
const Funcionario = require("../../../models/Funcionario");

class CadastrarFuncionario {
  async executar(req, res) {
    try {
      const funcionario = {
        matricula: req.body.matricula,
        senha: req.body.senha,
        email: req.body.email,
        nome: req.body.nome,
        idade: req.body.idade,
        funcao: req.body.funcao,
        cpf: req.body.cpf,
      };

      const novoFuncionario = await Funcionario.create(funcionario);
      res.status(200).json(novoFuncionario);
    } catch (error) {
      return erro(
        res,
        500,
        "Desculpe, ocorreu um erro interno no servidor. Por favor, tente novamente mais tarde."
      );
    }
  }
}

module.exports = CadastrarFuncionario;
