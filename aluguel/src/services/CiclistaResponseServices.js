class CiclistaResponseServices {

    RespostaErroNaoEncontrado(){
        return {
            codigo: "InvalidData",
            message: 'Ciclista não encontrado'
        }
    }

    RespostaErroDadosInvalidos(resultadosValidacao){
        let mensagem = []
        if (!resultadosValidacao.nome){
            mensagem.push('Nome inválido');
        }
        if (!resultadosValidacao.nascimento){
            mensagem.push('Data de nascimento inválida');
        }
        if (!resultadosValidacao.cpf){
            mensagem.push('CPF inválido');
        }
        return {
            codigo: "InvalidData",
            message: mensagem
        }

    }

    RespostaErroCadastro(err){
        return {
            codigo: "InvalidData",
            message: 'Não foi possível cadastrar os dados do ciclista',
            error: err
        }
    }

    RespostaErroNaoCadastrado(){
        return {
            codigo: "InvalidData",
            message: 'Ciclista não cadastrado'
        }
    }

    RespostaErroNaoAlterado(err){
        return {
            codigo: "InvalidData",
            message: 'Não foi possível alterar os dados do ciclista',
            error: err
        }
    }

    RespostaErroCartaoInvalido(){
        return {
            codigo: "InvalidData",
            message: 'Cartão de crédito inválido'
        }
    }

    RespostaErroRecuperarDados(err){
        return {
            codigo: "InvalidData",
            message: 'Não foi possível recuperar os dados do ciclista',
            error: err
        }
    }

    RespostaSucessoEmail(email){
        return {
            codigo: "Success",
            message: 'Email enviado com sucesso ao seu endereço '+email
        }
    }
    RespostaErroEmail(err){
        return {
            codigo: "InvalidData",
            message: 'Não foi possível enviar o email',
            error: err
        }
    }

    RespostaBicicletaAlugada(){
        return {
            codigo: "InvalidData",
            message: 'O ciclista já possui uma bicicleta alugada'
        }
    }

    RespostaSemBicicletaAlugada(){
        return {
            codigo: "InvalidData",
            message: 'O ciclista não possui uma bicicleta alugada'
        }
    }

}
module.exports = CiclistaResponseServices;