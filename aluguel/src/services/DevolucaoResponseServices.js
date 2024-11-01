class DevolucaoResponseServices {

    RespostaErroNaoEncontrado(){
        return {
            codigo: "InvalidData",
            message: 'O ciclista não possui meio de pagamento cadastrado'
        }
    }

    RespostaBicicletaInvalida(){
        return {
            codigo: "InvalidData",
            message: 'Não existe bicicleta com o número especificado'
        }
    }

    RespostaErroPagamento(){
        return {
            codigo: "PaymentError",
            message: 'Erro ao realizar pagamento ou cartão de crédito inválido. O valor da devolução será cobrado no próximo aluguel.'
        }
    }

    RespostaErroDevolucao(error){
        return {
            codigo: "InvalidData",
            message: 'Erro ao realizar devolução: '+error
        }
    }

    RespostaDataHoraInvalida(){
        return {
            codigo: "InvalidData",
            message: 'Data e hora de devolução inválida'
        }
    }


}
module.exports = DevolucaoResponseServices;