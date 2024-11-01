const {Ciclista} = require("../models/Ciclista");


class CiclistaService {
    
    validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
    
        if (cpf.length !== 11) {
            return false;
        }
    
        // Verifica se todos os dígitos são iguais (caso contrário, o CPF é inválido)
        if (/^(\d)\1+$/.test(cpf)) {
            return false;
        }
    
        // Validação dos dígitos verificadores
        let soma = 0;
        for (let i = 0; i < 9; i++) {
          soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
    
        let resto = 11 - (soma % 11);
        if (resto === 10 || resto === 11) {
            resto = 0;
        }
    
        if (resto !== parseInt(cpf.charAt(9))) {
            return false;
        }
    
        soma = 0;
        for (let i = 0; i < 10; i++) {
          soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
    
        resto = 11 - (soma % 11);
        if (resto === 10 || resto === 11) {
            resto = 0;
        }
    
        return resto === parseInt(cpf.charAt(10));
}

    validarNome(nome) {
        return !(!nome || nome.length < 2 || nome.length > 60);
    }

    validarDataformato(data) {
        //verificar se a data está no formato dd/mm/aaaa
        const regex = /^\d{2}\/\d{2}\/\d{4}$/;
        return regex.test(data);

    }

    validarNascimento(nascimento) {
        
        const dataNascimento = new Date(nascimento.split("/").reverse().join("-"));
        const hoje = new Date();
        const idadeMinima = 18;
        if (!dataNascimento) {
            console.log("!dataNascimento");
        }
        if (isNaN(dataNascimento)) {
            console.log("isNaN(dataNascimento)");
        }
        if (!this.validarDataformato(nascimento)) {
            console.log("!this.validarDataformato(nascimento)");
        }
        if (hoje.getFullYear() - dataNascimento.getFullYear() < idadeMinima) {
            console.log("hoje.getFullYear() - dataNascimento.getFullYear() < idadeMinima");
        }

        return !(!dataNascimento || isNaN(dataNascimento) || !this.validarDataformato(nascimento) || hoje.getFullYear() - dataNascimento.getFullYear() < idadeMinima);
    }

    validarDadosCiclista(dadosCiclista) {
        let resultados = {
            nome: true,
            nascimento: true,
            cpf: true,
        };
        resultados.nome = this.validarNome(dadosCiclista.nome);
        resultados.nascimento = this.validarNascimento(dadosCiclista.nascimento);
        resultados.cpf = this.validarCPF(dadosCiclista.cpf);
        return resultados;
    }

    async adicionarCiclista(dadosCiclista) {
        try{
            
            const novoCiclista = await Ciclista.create({
                nome: dadosCiclista.nome,
                nascimento: dadosCiclista.nascimento,
                cpf: dadosCiclista.cpf,
                email: dadosCiclista.email,
                senha: dadosCiclista.senha,
                nacionalidade: dadosCiclista.nacionalidade,
                passaporte: dadosCiclista.passaporte,
                urlFotoDocumento: dadosCiclista.urlFotoDocumento
            });
            return novoCiclista;
        }
        catch(err){
            return err.message;
        }
    }


    async recuperarCiclista(id) {
        const ciclista = await Ciclista.findByPk(id);
        return ciclista;
    }

    async alterarCiclista(ciclista, dadosCiclista) {
        await ciclista.update(dadosCiclista);
        return ciclista;
    }

    async recuperarCiclistaPorEmail(email) {
        const ciclista = await Ciclista.findOne({
            where: {
                email: email
            }
        });
        return ciclista;
    }
    

    
}
module.exports = CiclistaService;
