const { DataTypes, Model } = require("sequelize");
const connection = require("../database/connectionDB");

class Funcionario extends Model {}

Funcionario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    matricula: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    funcao: {
      type: DataTypes.ENUM("ADMINISTRADOR", "REPARADOR"),
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: connection,
    modelName: "Funcionario",
    tableName: "funcionarios",
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  }
);

module.exports = Funcionario;
