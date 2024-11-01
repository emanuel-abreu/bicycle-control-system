const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
class CobrancaAPI {
    constructor() {
        this.url = `${process.env.EXTERNO_URL}/cobranca`;
    }

    async realizarCobranca(valor, ciclista) {
        try {
            const cobranca = await axios.post(this.url, {
                valor,
                ciclista
            });
            return cobranca.data;
        } catch (err) {
            throw new Error(err.message);
        }
    
    }
}
module.exports = CobrancaAPI;