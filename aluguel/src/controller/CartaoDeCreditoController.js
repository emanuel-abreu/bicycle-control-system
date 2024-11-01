const CartaoDeCreditoService = require('../services/CartaoDeCreditoService');
const CartaoDeCreditoResponseServices = require('../services/CartaoDeCreditoResponseServices');
class CartaoDeCreditoController {
    
    constructor() {
        this.cartaoDeCreditoService = new CartaoDeCreditoService();
        this.cartaoDeCreditoResponseServices = new CartaoDeCreditoResponseServices();
    }

    recuperarCartaoDeCredito = async (req, res) => {
        try{
            const { idCiclista } = req.params;
            const cartaoDeCredito = await this.cartaoDeCreditoService.recuperarCartaoDeCredito(idCiclista);
            if (!cartaoDeCredito) {
                return res.status(404).json(this.cartaoDeCreditoResponseServices.RespostaErroNaoEncontrado());
            }
            return res.json(cartaoDeCredito);
        
        }
        catch(err){
            return res.status(402).json({
                error: err.message 
            });
        }

    }
    
    alterarCartaoDeCredito = async (req, res) => {
        try {
            const { idCiclista } = req.params;
            const validacao = this.cartaoDeCreditoService.validarCartaoDeCredito(req.body);
            if (!validacao) {
                return res.status(422).json(this.cartaoDeCreditoResponseServices.RespostaErroDadosInvalidos());
            }
            const { nomeTitular, numero, validade, cvv } = req.body;
            const cartaoDeCredito = await this.cartaoDeCreditoService.alterarCartaoDeCredito(idCiclista, nomeTitular, numero, validade, 
            cvv);
            if (!cartaoDeCredito) {
                return res.status(404).json(this.cartaoDeCreditoResponseServices.RespostaErroNaoEncontrado());
            }
            return res.status(200).json(cartaoDeCredito);
        }
        
        catch(err){
            return res.status(400).json({error: err.message});
        }
    }
}
module.exports = CartaoDeCreditoController;
