const Totem = require('../models/TotemModel');
const Tranca = require('../models/tranca');
const Messages = require('../utils/totemResponses');
const RelacaoTotemTranca = require('../models/relacaoTotemTranca');

class TotemService {
    static INTERNAL_ERROR = { codigo: "500", mensagem: Messages.SERVER_INTERNAL_ERROR };

    
    static async possuiTranca(idTranca) {
        try {
            const tranca = await Tranca.findByPk(idTranca, {
                include: [{ model: Totem, as: "totem" }],
            });

            if (!tranca) {
                return { failure: { codigo: "404", mensagem: "Tranca não encontrada" } };
            }

            if (tranca.totem) {
                return { success: { possuiTotem: true, totem: tranca.totem } };
            } else {
                return { success: { possuiTotem: false } };
            }
        } catch (erro) {
            return { failure: TotemService.INTERNAL_ERROR };
        }
    }

    static async canAddTranca() {
        try {
            // Limite de trancas por totem
            const limiteDeTrancasPorTotem = 20;

            // Obtém a lista de totens e o número de trancas associadas a cada totem
            const totens = await RelacaoTotemTranca.findAll({
                include: [{ model: Tranca, as: "trancas" }],
            });

            // Verifica se algum totem já atingiu o limite de 20 trancas
            const totemComLimiteExcedido = totens.find((totem) => totem.trancas.length >= limiteDeTrancasPorTotem);

            if (totemComLimiteExcedido) {
                return { success: { podeReceberTranca: false } };
            } else {
                return { success: { podeReceberTranca: true } };
            }
        } catch (erro) {
            return { failure: TotemService.INTERNAL_ERROR };
        }
    }
}

module.exports = TotemService;
