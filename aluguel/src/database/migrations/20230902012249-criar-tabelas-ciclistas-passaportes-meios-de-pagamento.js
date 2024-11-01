'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ciclistas", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nacionalidade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      passaporte: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      urlFotoDocumento: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });

    await queryInterface.createTable("passaportes", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      numero: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      validade: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      ciclistaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "ciclistas",
          key: "id",
        },
        pais: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });

    await queryInterface.createTable("meiosDePagamento", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
        allowNull: false,
      },
      cvv: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ciclistaid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "ciclistas",
          key: "id",
        },
      
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("funcionarios");
    await queryInterface.dropTable("ciclistas");
    await queryInterface.dropTable("passaportes");
    await queryInterface.dropTable("meiosDePagamento");
  }
};