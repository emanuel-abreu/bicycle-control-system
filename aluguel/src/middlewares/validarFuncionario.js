const yup = require("yup");
const validator = require("validator");
const erro = require("../utils/erro");

const Funcionario = require("../models/Funcionario");

function validateCPF(cpf, res) {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11) return erro(res, 422, "CPF inválido!");

  if (
    cpf === "00000000000" ||
    cpf === "11111111111" ||
    cpf === "22222222222" ||
    cpf === "33333333333" ||
    cpf === "44444444444" ||
    cpf === "55555555555" ||
    cpf === "66666666666" ||
    cpf === "77777777777" ||
    cpf === "88888888888" ||
    cpf === "99999999999"
  ) {
    return erro(res, 422, "CPF inválido!");
  }

  let sum = 0;
  let rest;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }

  if (rest !== parseInt(cpf.substring(9, 10))) {
    return erro(res, 422, "CPF inválido!");
  }

  sum = 0;

  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }

  if (rest !== parseInt(cpf.substring(10, 11))) {
    return erro(res, 422, "CPF inválido!");
  }

  return true;
}

const validarNovo = yup.object().shape({
  matricula: yup.string().required("A matrícula é obrigatória no cadastro."),
  senha: yup.string().required("A senha é obrigatória no cadastro."),
  email: yup
    .string()
    .required("O email é obrigatório no cadastro.")
    .test("is-email-valid", "Email inválido", (value) => {
      return validator.isEmail(value);
    }),
  nome: yup.string().required("O nome é obrigatório no cadastro."),
  idade: yup.number().required("A idade é obrigatória no cadastro."),
  funcao: yup
    .string()
    .oneOf(
      ["ADMINISTRADOR", "REPARADOR"],
      "A função deve ser ADMINISTRADOR ou REPARADOR"
    )
    .required("A função é obrigatória no cadastro"),
  cpf: yup
    .string()
    .required("O CPF é obrigatório no cadastro")
    .min(11, "CPF deve conter 11 dígitos"),
});

const validarAtualizacao = yup.object().shape({
  nome: yup.string().required("O campo nome é obrigatório."),
  idade: yup.number().required("A campo idade é obrigatório."),
  senha: yup.string().required("A campo senha é obrigatório."),
  email: yup
    .string()
    .required("O email é obrigatório no cadastro.")
    .test("is-email-valid", "Email inválido", (value) => {
      return validator.isEmail(value);
    }),
  funcao: yup
    .string()
    .oneOf(
      ["ADMINISTRADOR", "REPARADOR"],
      "A função deve ser ADMINISTRADOR ou REPARADOR"
    )
    .required("O campo função é obrigatório."),
});

async function validarNovoFuncionario(req, res, next) {
  try {
    await validarNovo.validate(req.body);

    const funcionario = {
      cpf: req.body.cpf,
      email: req.body.email,
    };

    validateCPF(funcionario.cpf, res);

    const validarCpfUnico = await Funcionario.findOne({
      where: { cpf: funcionario.cpf },
    });

    if (validarCpfUnico) {
      return erro(
        res,
        409,
        "Já existe um funcionário com esse CPF cadastrado."
      );
    }

    const validarEmailUnico = await Funcionario.findOne({
      where: { email: funcionario.email },
    });

    if (validarEmailUnico) {
      return erro(
        res,
        409,
        "Já existe um funcionário com esse email cadastrado."
      );
    }

    next();
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = error.errors.map((errorMessage) => ({
        codigo: "422",
        mensagem: errorMessage,
      }));
      return res.status(422).json(validationErrors);
    }
  }
}

async function validarAtualizacaoFuncionario(req, res, next) {
  try {
    await validarAtualizacao.validate(req.body);
    next();
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = error.errors.map((errorMessage) => ({
        codigo: "422",
        mensagem: errorMessage,
      }));
      return res.status(422).json(validationErrors);
    }
  }
}

module.exports = { validarNovoFuncionario, validarAtualizacaoFuncionario };
