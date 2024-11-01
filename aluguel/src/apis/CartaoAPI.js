const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
class CartaoAPI {
    constructor() {
        this.url = `${process.env.EXTERNO_URL}/validaCartaoDeCredito`;
    }

    async validar(numero, validade, cvv) {
        try {
            const cartao = await axios.post(this.url, {
                numero,
                validade,
                cvv
            });
            return cartao.data;
        } catch (err) {
            throw new Error(err.message);
        }
    
    }
}
module.exports = CartaoAPI;