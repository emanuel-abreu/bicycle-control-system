class AluguelResponseServices {

    RespostaErroNaoEncontrado(){
        return {
            codigo: "InvalidData",
            message: 'O ciclista não possui meio de pagamento cadastrado'
        }
    }

    RespostaErroCiclistaAluguelExistente(){
        return {
            codigo: "ResourceAlreadyExists",
            mensagem: "Ciclista já possui um aluguel ativo."
        }
    }

    RespostaErroBicicletaIndisponivel(){
        return {
            codigo: "ResourceUnavailable",
            message: 'Bicicleta indisponível'
        }
    }

    RespostaNaoExisteBicicletaTranca(){
        return {
            codigo: "ResourceDoesNotExist",
            message: 'Não existe bicicleta na tranca especificada'
        }
    }

    RespostaErroPagamento(){
        return {
            codigo: "PaymentError",
            message: 'Erro ao realizar pagamento ou cartão de crédito inválido'
        }
    }

    RespostaErroBicicletaEmReparo(){
        return {
            codigo: "ResourceInRepair",
            message: 'Bicicleta em reparo'
        }
    }

    RespostaErroAluguel(error){
        return {
            codigo: "InvalidData",
            message: 'Erro ao realizar aluguel: '+error
        }
    }


}
module.exports = AluguelResponseServices;