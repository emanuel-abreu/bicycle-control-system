const { Sequelize, Model } = require("sequelize");
const connection = require("../database/connectionDB");
const { Ciclista, MeioDePagamento } = require("./Ciclista");
const Devolucao = require("./Devolucao");
class Aluguel extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                dataHoraAluguel: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                idCiclista: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: Ciclista,
                        key: "id",
                    },
                },
                idTranca: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                idBicicleta: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                valorCobrado: {
                    type: Sequelize.FLOAT,
                    allowNull: false,
                },
                idCartao: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: MeioDePagamento,
                        key: "id",
                    },
                },
                idDevolucao: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    references: {
                        model: Devolucao,
                        key: "id",
                    },
                },
                

            },
            {
                sequelize,
                tableName: "alugueis",
                timestamps: false,
            }
        );
    }
}
Aluguel.init(connection); 

module.exports = Aluguel;