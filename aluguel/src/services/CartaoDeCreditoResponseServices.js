class CartaoDeCreditoResponseServices {

    RespostaErroNaoEncontrado(){
        return {
            codigo: "InvalidData",
            message: 'Cartão de Crédito não encontrado'
        }
    }

    RespostaErroDadosInvalidos(){
        return {
            codigo: "InvalidData",
            mensagem: "Dados do cartão de crédito são inválidos"
        }
    }

    RespostaErroNaoCadastrado(){
        return {
            status: 400,
            message: 'Cartão de Crédito não cadastrado'
        }
    }

    RespostaErroNaoAlterado(){
        return {
            status: 400,
            message: 'Cartão de Crédito não alterado'
        }
    }

}
module.exports = CartaoDeCreditoResponseServices;