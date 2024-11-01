function schemaRetornoFuncionario(funcionario) {
  return {
    id: funcionario.id,
    matricula: funcionario.matricula,
    email: funcionario.email,
    nome: funcionario.nome,
    idade: funcionario.idade,
    funcao: funcionario.funcao,
    cpf: funcionario.cpf,
    createdAt: funcionario.createdAt,
    updatedAt: funcionario.updatedAt,
  };
}

module.exports = schemaRetornoFuncionario;
