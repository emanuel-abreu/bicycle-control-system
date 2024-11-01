const Aluguel = require("../models/Aluguel");

class AluguelService {
    async adicionarAluguel(dadosAluguel) {
        try{
            const novoAluguel = await Aluguel.create({
                dataHoraAluguel: dadosAluguel.dataHoraAluguel,
                idCiclista: dadosAluguel.idCiclista,
                idTranca: dadosAluguel.idTranca,
                idBicicleta: dadosAluguel.idBicicleta,
                valorCobrado: dadosAluguel.valorCobrado,
                idCartao: dadosAluguel.idCartao
            });
            return novoAluguel;
        }
        catch(err){
            return err.message;
        }

    }

    async recuperarDadosAluguel(idCiclista) {
        const aluguel = await Aluguel.findOne({
            where: {
                idCiclista: idCiclista,
                idDevolucao: null
            }
        });
        return aluguel;
    }

    async recuperarAlugueisDevolvidos(idCiclista) {
        const alugueis = await Aluguel.findAll({
            where: {
                idCiclista: idCiclista,
                idDevolucao: {
                    [Op.not]: null
                }
            }
        });
        return alugueis;
    }

    async apagarAluguel(idCiclista) {
        const aluguel = await Aluguel.findOne({
            where: {
                idCiclista: idCiclista
            }
        });
        await aluguel.destroy();
        return aluguel;
    }

    async recuperarDataHoraAluguel(idCiclista) {
        const aluguel = await Aluguel.findOne({
            where: {
                idCiclista: idCiclista,
                idDevolucao: null
            }
        });
        return aluguel.dataHoraAluguel;
    }

    async recuperarIdCiclista(idBicicleta) {
        const aluguel = await Aluguel.findOne({
            where: {
                idBicicleta: idBicicleta,
                idDevolucao: null
            }
        });
        return aluguel.idCiclista;
    }

    async atualizarIdDevolucao(idCiclista, idDevolucao) {
        const aluguel = await Aluguel.findOne({
            where: {
                idCiclista: idCiclista,
                idDevolucao: null
            }
        });
        await aluguel.update({idDevolucao: idDevolucao});
        return aluguel;
    }

    async recuperarBicicletaAlugada(idCiclista) {
        const aluguel = await Aluguel.findOne({
            where: {
                idCiclista: idCiclista,
                idDevolucao: null
            }
        });
        // get api bicicleta
        if (!aluguel) {
            return null;
        }
        return aluguel.idBicicleta;
    }
}
module.exports = AluguelService;