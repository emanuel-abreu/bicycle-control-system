const erro = require("../../../utils/erro");
const Funcionario = require("../../../models/Funcionario");
const schemaRetornoFuncionario = require("../../../utils/SchemaRetornoFuncionario");

class RecuperarFuncionarioPorId {
  async executar(req, res) {
    try {
      const funcionarioRecuperado = await Funcionario.findOne({
        where: { id: req.params.idFuncionario },
      });

      if (!funcionarioRecuperado) {
        return erro(
          res,
          404,
          "Não encontramos o cadastro do(a) funcionário(a)"
        );
      }

      const retornoDeFuncionario = schemaRetornoFuncionario(
        funcionarioRecuperado
      );

      res.status(200).json(retornoDeFuncionario);
    } catch (error) {
      return erro(
        res,
        500,
        "Desculpe, ocorreu um erro interno no servidor. Por favor, tente novamente mais tarde."
      );
    }
  }
}

module.exports = RecuperarFuncionarioPorId;
