const { MeioDePagamento } = require("../models/Ciclista");
class CartaoDeCreditoService {

    async adicionarCartaoDeCredito(idCiclista, cartaoDeCredito){
        try{
            const novoCartaoDeCredito = await MeioDePagamento.create({
                ciclistaid: idCiclista,
                nomeTitular: cartaoDeCredito.nomeTitular,
                numero: cartaoDeCredito.numero,
                validade: cartaoDeCredito.validade,
                cvv: cartaoDeCredito.cvv
            });
            return novoCartaoDeCredito;
        }
        catch(err){
            return err.message;
        }

    }
    async recuperarCartaoDeCredito(idCiclista) {
        const cartaoDeCredito = await MeioDePagamento.findOne({
            where: {
                ciclistaid: idCiclista
            }
        });
        return cartaoDeCredito;
    }

    async apagarCartaoDeCredito(idCiclista) {
        const cartaoDeCredito = await MeioDePagamento.findOne({
            where: {
                ciclistaid: idCiclista
            }
        });
        await cartaoDeCredito.destroy();
        return cartaoDeCredito;
    }

    async recuperarIdCartaoDeCredito(idCiclista) {
        const cartaoDeCredito = await MeioDePagamento.findOne({
            where: {
                ciclistaid: idCiclista
            }
        });
        return cartaoDeCredito.id;
    }


    // alterar cartão
    async alterarCartaoDeCredito(idCiclista, nomeTitular, numero, validade, cvv) {
        const cartaoDeCredito = await MeioDePagamento.findOne({
            where: {
                ciclistaid: idCiclista
            }
        });
        cartaoDeCredito.nomeTitular = nomeTitular;
        cartaoDeCredito.numero = numero;
        cartaoDeCredito.validade = validade;
        cartaoDeCredito.cvv = cvv;
        await cartaoDeCredito.save();
        return cartaoDeCredito;
    }

    validarCartaoDeCredito = (cartaoDeCredito) => {
        // validar dados do cartão de crédito, depois mudar para uma função que chama api externa
        return !(!cartaoDeCredito.nomeTitular || !cartaoDeCredito.numero || !cartaoDeCredito.validade || !cartaoDeCredito.cvv);
    }

}

module.exports = CartaoDeCreditoService;