const { Sequelize, Model } = require("sequelize");
const connection = require("../database/connectionDB");

class Ciclista extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        nascimento: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        cpf: {
          type: Sequelize.STRING,
          allowNull: true,
          unique: true,
          validate: {
            isCPFRequired: function (value) {
              if (this.nacionalidade === "brasileiro" && !value) {
                throw new Error("CPF é obrigatório para ciclistas brasileiros");
              }
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        senha: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        passaporte: {
          type: Sequelize.STRING,
          allowNull: true,
          validate: {
            isPassportRequired: function (value) {
              if (this.nacionalidade === "estrangeiro" && !value) {
                throw new Error("Passaporte é obrigatório para ciclistas estrangeiros");
              }
            },
          },
        },
        nacionalidade: {
          type: Sequelize.STRING,
          allowNull: false,
          set(value) {
            this.setDataValue("nacionalidade", value.toLowerCase()); // Converte para letras minúsculas
          },
        },
        urlFotoDocumento: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "ciclistas",
        timestamps: false,
      }
    );
  }
}

Ciclista.init(connection); // Use a conexão `connection` para inicializar o modelo

class Passaporte extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        numero: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        validade: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        ciclistaid: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: Ciclista,
            key: "id",
          },
        },
      },
      {
        sequelize,
        tableName: "passaportes",
        timestamps: false,
      }
    );
  }
}

Passaporte.init(connection); // Use a conexão `connection` para inicializar o modelo

class MeioDePagamento extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        numero: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        nomeTitular: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        validade: {
          type: Sequelize.STRING,
        },
        cvv: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        ciclistaid: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: Ciclista,
            key: "id",
          },
        },
      },
      {
        sequelize,
        tableName: "meiosDePagamento",
        timestamps: false
      }
    );
  }
}

MeioDePagamento.init(connection);

module.exports = {
  Ciclista,
  Passaporte,
  MeioDePagamento,
};