const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
class EmailAPI {
    constructor() {
        this.url = `${process.env.EXTERNO_URL}/enviarEmail`;
    }

    async enviarEmail(email, assunto, mensagem) {
        try {
            const mail = await axios.post(this.url, {
                email,
                assunto,
                mensagem
            });
            return mail.data;
        } catch (err) {
            throw new Error(err.message);
        }
    
    }
}
module.exports = EmailAPI;