const Devolucao = require("../models/Devolucao");

class DevolucaoService {
    async adicionarDevolucao(dadosDevolucao) {
        try{
            const novaDevolucao = await Devolucao.create({
                dataHoraDevolucao: dadosDevolucao.dataHoraDevolucao,
                idCiclista: dadosDevolucao.idCiclista,
                idTranca: dadosDevolucao.idTranca,
                idBicicleta: dadosDevolucao.idBicicleta,
                valorExtra: dadosDevolucao.valorExtra,
                idCartao: dadosDevolucao.idCartao
            });
            return novaDevolucao;
        }
        catch(err){
            return err.message;
        }

    }

    async recuperarDadosDevolucao(idCiclista) {
        const devolucao = await Devolucao.findOne({
            where: {
                idCiclista: idCiclista
            }
        });
        return devolucao;
    }

    async apagarDevolucao(idCiclista) {
        const devolucao = await Devolucao.findOne({
            where: {
                idCiclista: idCiclista
            }
        });
        await devolucao.destroy();
        return devolucao;
    }

    calcularValorExtra(diferenca) {
        
        const horas = diferenca.hours;
        const minutos = diferenca.minutes;
        const segundos = diferenca.seconds;
        const minutosTotais = horas*60 + minutos + segundos/60;
        if (minutosTotais >= 120){
            const minutosExtras = minutosTotais - 120;
            const valorExtra = Math.ceil(minutosExtras/30)*5;
            return valorExtra;
        }
        return 0;
    }
}
module.exports = DevolucaoService;