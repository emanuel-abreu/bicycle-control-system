
const dbConfig = require("../config/sequelize-config");
const { DataTypes, Model } = require("sequelize");

class RelacaoTotemTranca extends Model {}

RelacaoTotemTranca.init(
    {
    },
    {
        sequelize: dbConfig,
        modelName: 'relacao_totem_tranca',
        tableName: 'relacao_totem_tranca',
        timestamps: true,
        underscored: true,
        underscoredALL: true,
    }
);

module.exports = RelacaoTotemTranca;