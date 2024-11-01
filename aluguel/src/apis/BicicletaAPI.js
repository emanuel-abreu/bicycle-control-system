const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
class BicicletaAPI {
  constructor() {
    this.url = `${process.env.EQUIPAMENTO_URL}/validaCartaoDeCredito`;
  }
  //
  async alterarStatus(status, idBicicleta) {
    try {
      const bicicleta = await axios.post(
        this.url + "/" + idBicicleta + "/status" + status,
        {
          status,
        }
      );
      return bicicleta.data;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
module.exports = BicicletaAPI;
