const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

class TrancaAPI {
    constructor() {
        this.url = `${process.env.EQUIPAMENTO_URL}/validaCartaoDeCredito`;
    }

    async getBicicleta(idTranca) {
        try {
            const bicicleta = await axios.get(this.url + '/' + idTranca + '/bicicleta');
            return bicicleta.data;      
        } catch (err) {
            throw new Error(err.message);
        }
    
    }
}
module.exports = TrancaAPI;