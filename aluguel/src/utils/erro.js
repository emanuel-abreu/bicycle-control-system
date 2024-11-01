function erro(res, codigo, mensagem) {
  return res.status(codigo).json({
    codigo: codigo.toString(),
    mensagem: mensagem,
  });
}

module.exports = erro;
