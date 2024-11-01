const CiclistaResponseServices = require("../services/CiclistaResponseServices");
const CartaoDeCreditoResponseServices = require("../services/CartaoDeCreditoResponseServices");
const CartaoDeCreditoService = require("../services/CartaoDeCreditoService");
const CiclistaService = require("../services/CiclistaService");
const AluguelService = require("../services/AluguelService");

class CiclistaController {

  constructor() {
    this.ciclistaService = new CiclistaService();
    this.ciclistaResponseServices = new CiclistaResponseServices(); 
    this.cartaoDeCreditoResponseServices = new CartaoDeCreditoResponseServices();
    this.cartaoDeCreditoService = new CartaoDeCreditoService();
    this.aluguelService = new AluguelService();
  }


  cadastrarCiclista = async (req, res) => {
    try {
      const ciclista = req.body.ciclista; //json obedecendo ao padrão do swagger
      const meioDePagamento = req.body.meioDePagamento;
      const validacaoCartao = this.cartaoDeCreditoService.validarCartaoDeCredito(meioDePagamento);
      //chamar validação passaporte
      const resultadosValidacao = this.ciclistaService.validarDadosCiclista(ciclista);

      if (!resultadosValidacao.nome || !resultadosValidacao.nascimento || !resultadosValidacao.cpf) {
        return res.status(422).json(this.ciclistaResponseServices.RespostaErroDadosInvalidos(resultadosValidacao));
      }
      if (!validacaoCartao) {
        
        return res.status(422).json(this.cartaoDeCreditoResponseServices.RespostaErroDadosInvalidos());
      }
      
      const novoCiclista = await this.ciclistaService.adicionarCiclista(ciclista);
      const novoCartaoDeCredito = await this.cartaoDeCreditoService.adicionarCartaoDeCredito(novoCiclista.id,meioDePagamento);
      
      res.status(200).json({novoCiclista, novoCartaoDeCredito});
    
    } catch (error) {
      res
        .status(500)
        .json(this.ciclistaResponseServices.RespostaErroCadastro(error.message));
    }
  }

  recuperarCiclista = async (req, res) => {
    try {
      const idCiclista = req.params.idCiclista;

      const ciclista = await this.ciclistaService.recuperarCiclista(idCiclista);

      if (!ciclista) {
        return res.status(404).json(this.ciclistaResponseServices.RespostaErroNaoEncontrado());
      }

      res.status(200).json(ciclista);
    } catch (error) {
      res
        .status(500)
        .json(this.ciclistaResponseServices.RespostaErroRecuperarDados(error.message));
    }
  }

  alterarCiclista = async (req, res) => {
    try {
      const idCiclista = req.params.idCiclista;

      const ciclista =  await this.ciclistaService.recuperarCiclista(idCiclista);

      if (!ciclista) {
        return res.status(404).json(this.ciclistaResponseServices.RespostaErroNaoEncontrado());
      }

      const novoCiclista = {
        nome: req.body.nome,
        nascimento: req.body.nascimento,
        cpf: req.body.cpf,
        nacionalidade: req.body.nacionalidade,
        passaporte: req.body.passaporte,
        urlFotoDocumento: req.body.urlFotoDocumento,
        email: req.body.email,
        senha: req.body.senha,
      };

      await this.ciclistaService.alterarCiclista(ciclista, novoCiclista);

      res.status(200).json(ciclista);
    } catch (error) {
      res
        .status(500)
        .json(this.ciclistaResponseServices.RespostaErroNaoAlterado(error.message));
    }
  }

  ativarCadastroCiclista = async (req, res) => { 
    try {
      const email = req.body.email;
  
      // Envie a mensagem de confirmação para o email cadastrado
  
      res
        .status(200)
        .json(this.ciclistaResponseServices.RespostaSucessoEmail(email));
    } catch (error) {
      res
        .status(500)
        .json(this.ciclistaResponseServices.RespostaErroEmail(error.message));
    }
  }

  verificarPermissaoAluguel = async (req, res) => {
    try {
      const idCiclista = req.params.idCiclista;

      const aluguel = await this.aluguelService.recuperarDadosAluguel(idCiclista);

      if (!aluguel) {
        return res.status(200).json("true");
      }

      return res.status(200).json("false");
    } catch (error) {
      res
        .status(500)
        .json(this.ciclistaResponseServices.RespostaErroRecuperarDados(error.message));
    }
  }

  obterBicicletaAlugada = async (req, res) => {
    try {
      const idCiclista = req.params.idCiclista;
      const idBicicleta = await this.aluguelService.recuperarBicicletaAlugada(idCiclista);
      if (!idBicicleta) {
        return res.status(200).json();
      }

      res.status(200).json(idBicicleta);
    } catch (error) {
      res
        .status(500)
        .json(this.ciclistaResponseServices.RespostaErroRecuperarDados(error.message));
    }
  }

  verificarEmailExistente = async (req, res) => {
    try {
      const email = req.params.email;

      const ciclista = await this.ciclistaService.recuperarCiclistaPorEmail(email);

      if (!ciclista) {
        return res.status(200).json("false");
      }

      res.status(200).json("true");
    } catch (error) {
      res
        .status(500)
        .json(this.ciclistaResponseServices.RespostaErroRecuperarDados(error.message));
    }
  }


}

module.exports = CiclistaController;