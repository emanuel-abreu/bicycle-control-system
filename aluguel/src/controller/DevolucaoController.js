const DevolucaoService = require("../services/DevolucaoService");
const DevolucaoResponseServices = require("../services/DevolucaoResponseServices");
const CartaoDeCreditoService = require("../services/CartaoDeCreditoService");
const AluguelService = require("../services/AluguelService");
const CiclistaService = require("../services/CiclistaService");
const CobrancaAPI = require("../apis/CobrancaAPI");
const CartaoAPI = require("../apis/CartaoAPI");
const EmailAPI = require("../apis/EmailAPI");
const BicicletaAPI = require("../apis/BicicletaAPI");  
const { DateTime } = require("luxon");
class DevolucaoController {
    constructor() {
        this.devolucaoService = new DevolucaoService();
        this.devolucaoResponseServices = new DevolucaoResponseServices();
        this.cartaoDeCreditoService = new CartaoDeCreditoService();
        this.aluguelService = new AluguelService();
        this.ciclistaService = new CiclistaService();
        this.cobrancaAPI = new CobrancaAPI();
        this.cartaoAPI = new CartaoAPI();
        this.emailAPI = new EmailAPI();
        this.bicicletaAPI = new BicicletaAPI();
    }

    getValorExtra = async (dataHoraDevolucao, idCiclista) => {
        let dataHoraAluguel = await this.aluguelService.recuperarDataHoraAluguel(idCiclista);
        dataHoraAluguel = DateTime.fromJSDate(dataHoraAluguel).setZone('America/Sao_Paulo').toISO();
        const diferenca = DateTime.fromISO(dataHoraDevolucao).diff(DateTime.fromISO(dataHoraAluguel), ['hours', 'minutes', 'seconds']).toObject();
        return this.devolucaoService.calcularValorExtra(diferenca);

    }

    realizarDevolucao = async (req, res) => {
        try{
            const {idBicicleta, idTranca} = req.body;
            const idCiclista = await this.aluguelService.recuperarIdCiclista(idBicicleta);
            const ciclista = await this.ciclistaService.recuperarCiclista(idCiclista);
            const cartao = await this.cartaoDeCreditoService.recuperarCartaoDeCredito(idCiclista);
            if (!cartao) {
                return res.status(404).json(this.devolucaoResponseServices.RespostaErroNaoEncontrado());
            }
            await this.cartaoAPI.validar(cartao.numero, cartao.validade, cartao.cvv);
            const dataHoraDevolucao = DateTime.now().setZone('America/Sao_Paulo').toISO();
            const valorExtra = await this.getValorExtra(dataHoraDevolucao, idCiclista);
            if (valorExtra > 0){
                await this.cobrancaAPI.realizarCobranca(valorExtra, idCiclista);
            }
            
            const dadosDevolucao = {
                dataHoraDevolucao,
                idCiclista,
                idTranca,
                idBicicleta,
                valorExtra,
                idCartao: cartao.id
            }
            

            const devolucao = await this.devolucaoService.adicionarDevolucao(dadosDevolucao);
            await this.aluguelService.atualizarIdDevolucao(idCiclista, devolucao.id);
            await this.bicicletaAPI.alterarStatus(idBicicleta, 'DISPONIVEL');
            await this.emailAPI.enviarEmail(ciclista.email, "Devolução de bicicleta", "Sua bicicleta foi devolvida com sucesso! Segue o recibo:\n Data: " + dadosDevolucao.dataHoraDevolucao + " Valor extra: " + dadosDevolucao.valorExtra);
            
            
            return res.status(200).json(dadosDevolucao); 
        }
        catch(err){
            return res.status(400).json(this.devolucaoResponseServices.RespostaErroDevolucao(err.message));
        }
    }
}
module.exports = DevolucaoController;