const { Sequelize, Model } = require("sequelize");
const connection = require("../database/connectionDB");
const { Ciclista, MeioDePagamento } = require("./Ciclista");
class Devolucao extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                dataHoraDevolucao: {
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
                    //Descomentar quando integrar com os serviços de equipamento
                    // references: {
                    //     model: Tranca,
                    //     key: "id",
                    // },
                },
                idBicicleta: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    // references: {
                    //     model: Bicicleta,
                    //     key: "id",
                    // },
                },
                valorExtra: {
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
                

            },
            {
                sequelize,
                tableName: "devolucoes",
                timestamps: false,
            }
        );
    }
}
Devolucao.init(connection); 

module.exports = Devolucao;