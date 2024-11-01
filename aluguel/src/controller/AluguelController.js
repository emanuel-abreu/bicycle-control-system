const AluguelService = require("../services/AluguelService");
const AluguelResponseServices = require("../services/AluguelResponseServices");
const CartaoDeCreditoService = require("../services/CartaoDeCreditoService");
const DevolucaoService = require("../services/DevolucaoService");
const CiclistaService = require("../services/CiclistaService");  
const CobrancaAPI = require("../apis/CobrancaAPI");
const CartaoAPI = require("../apis/CartaoAPI");
const EmailAPI = require("../apis/EmailAPI");
const TrancaAPI = require("../apis/TrancaAPI");
const BicicletaAPI = require("../apis/BicicletaAPI");
const { DateTime } = require("luxon");
class AluguelController {
    constructor() {
        this.aluguelService = new AluguelService();
        this.aluguelResponseServices = new AluguelResponseServices();
        this.cartaoDeCreditoService = new CartaoDeCreditoService();
        this.devolucaoExistente = new DevolucaoService();
        this.ciclistaService = new CiclistaService();
        this.cobrancaAPI = new CobrancaAPI();
        this.cartaoAPI = new CartaoAPI();
        this.emailAPI = new EmailAPI();
        this.trancaAPI = new TrancaAPI();
        this.bicicletaAPI = new BicicletaAPI();

    }

    realizarAluguel = async (req, res) => {
        try{
            const {ciclista, trancaInicio} = req.body;
            
            const bicicleta = await this.trancaAPI.getBicicleta(trancaInicio);
            if (bicicleta.status !== 'DISPONIVEL') {
                return res.status(422).json(this.aluguelResponseServices.RespostaErroBicicletaIndisponivel());
            }

            const dadosCiclista = await this.ciclistaService.recuperarCiclista(ciclista);

            const aluguelExistente = await this.aluguelService.recuperarDadosAluguel(dadosCiclista.id);
            if(aluguelExistente){
                if (!aluguelExistente.idDevolucao) {
                    return res.status(422).json(this.aluguelResponseServices.RespostaErroCiclistaAluguelExistente());
                }
            }

            const cartao = await this.cartaoDeCreditoService.recuperarCartaoDeCredito(dadosCiclista.id);
            if (!cartao.id) {
                return res.status(404).json(this.aluguelResponseServices.RespostaErroNaoEncontrado());
            }
            await this.cartaoAPI.validar(cartao.numero, cartao.validade, cartao.cvv);
            
            const valorCobrado = 10;
            await this.cobrancaAPI.realizarCobranca(valorCobrado, dadosCiclista.id);
            
            const dataHoraAluguel = DateTime.now().setZone('America/Sao_Paulo').toISO();
        
            const dadosAluguel = {
                dataHoraAluguel,
                idCiclista: dadosCiclista.id,
                idTranca: trancaInicio,
                idBicicleta: bicicleta.id,
                valorCobrado,
                idCartao: cartao.id
            }
            const aluguel = await this.aluguelService.adicionarAluguel(dadosAluguel);
            if (!aluguel) {
                return res.status(400).json(this.aluguelResponseServices.RespostaErroAluguel(err.message));
            }
            
            await this.bicicletaAPI.alterarStatus(bicicleta.id, 'EM_USO');
            
            await this.emailAPI.enviarEmail(dadosCiclista.email, "Aluguel de bicicleta", "Bicicleta alugada com sucesso! Segue os dados do seu aluguel:\n"
            + "Data: " + dadosAluguel.dataHoraAluguel + "\n" + "Valor cobrado: " + dadosAluguel.valorCobrado + "\n" + "Bicicleta alugada: " + bicicleta.marca + " " + bicicleta.modelo + "\n" + "Tranca: " + dadosAluguel.idTranca + "\n" + "Cartão Final: " + cartao.numero.slice(-3));

            return res.status(200).json(dadosAluguel); 
        }
        catch(err){
            return res.status(400).json(this.aluguelResponseServices.RespostaErroAluguel(err.message));
        }
    }
}
module.exports = AluguelController;