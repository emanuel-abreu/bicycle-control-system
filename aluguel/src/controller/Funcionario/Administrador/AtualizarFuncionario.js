const erro = require("../../../utils/erro");
const Funcionario = require("../../../models/Funcionario");
const schemaRetornoFuncionario = require("../../../utils/SchemaRetornoFuncionario");

class AtualizarFuncionario {
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

      funcionarioRecuperado.nome = req.body.nome;
      funcionarioRecuperado.idade = req.body.idade;
      funcionarioRecuperado.senha = req.body.senha;
      funcionarioRecuperado.email = req.body.email;
      funcionarioRecuperado.funcao = req.body.funcao;

      const retornoDeFuncionario = schemaRetornoFuncionario(
        funcionarioRecuperado
      );

      await funcionarioRecuperado.save();
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

module.exports = AtualizarFuncionario;
