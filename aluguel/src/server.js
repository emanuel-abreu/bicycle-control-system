require("dotenv").config();
const express = require("express");

const CiclistaRoutes = require("./routes/Ciclista.routes");
const CartaoDeCreditoRoutes = require("./routes/CartaoDeCredito.routes");
const AluguelRoutes = require("./routes/Aluguel.routes");
const DevolucaoRoutes = require("./routes/Devolucao.routes");
const FuncionarioRoutes = require("./routes/Funcionario.routes");
const HelloWorldRoutes = require("./routes/helloworld.routes");

const connection = require("./database/connectionDB");

class Server {
  constructor(server = express()) {
    this.middlewares(server);
    this.database();
    this.allRoutes(server);
    this.initializeServer(server);
  }

  async middlewares(app) {
    app.use(express.json());
  }

  async database() {
    try {
      await connection.authenticate();
      console.log("Conexão bem sucedida!");
    } catch (error) {
      console.error("Não foi possível se conectar", error);
    }
  }

  async allRoutes(app) {
    const prefix =
      process.env.NODE_ENV === "production" ? "/aluguel-grupo-1" : ""; 
    
    const cartaoDeCreditoRoutes = new CartaoDeCreditoRoutes();
    const ciclistaRoutes = new CiclistaRoutes();
    const aluguelRoutes = new AluguelRoutes();
    const devolucaoRoutes = new DevolucaoRoutes();
    const funcionarioRoutes = new FuncionarioRoutes();
    const helloWorldRoutes = new HelloWorldRoutes();

    app.use(prefix, ciclistaRoutes.getRouter());
    app.use(prefix, cartaoDeCreditoRoutes.getRouter());
    app.use(prefix, aluguelRoutes.getRouter());
    app.use(prefix, devolucaoRoutes.getRouter());
    app.use(prefix, funcionarioRoutes.getRouter());
    app.use(prefix, helloWorldRoutes.getRouter());
  }

  async initializeServer(app) {
    const SERVER_PORT = process.env.PORT || 3000;
    app.listen(SERVER_PORT, () => {
      console.log(
        `Server is listening on http://localhost:${SERVER_PORT}/aluguel-grupo-1`
      );
    });
  }
}

new Server();
