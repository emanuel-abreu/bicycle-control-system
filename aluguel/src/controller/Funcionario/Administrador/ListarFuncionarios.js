const erro = require("../../../utils/erro");
const Funcionario = require("../../../models/Funcionario");
const schemaRetornoFuncionario = require("../../../utils/SchemaRetornoFuncionario");

class ListarFuncionarios {
  async executar(req, res) {
    try {
      const todosFuncionarios = await Funcionario.findAll();

      if (todosFuncionarios.length === 0) {
        return erro(
          res,
          404,
          "Não foi cadastrado nenhum funcionário(a) ainda no sistema."
        );
      }

      const retornoDeFuncionarios = todosFuncionarios.map(
        (funcionarioRecuperado) => {
          return schemaRetornoFuncionario(funcionarioRecuperado);
        }
      );

      res.status(200).json(retornoDeFuncionarios);
    } catch (error) {
      console.log(error);
      return erro(
        res,
        500,
        "Desculpe, ocorreu um erro interno no servidor. Por favor, tente novamente mais tarde."
      );
    }
  }
}

module.exports = ListarFuncionarios;
