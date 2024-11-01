'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('devolucoes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      dataHoraDevolucao: {
        type: Sequelize.DATE,
        allowNull: false
      },
      idCiclista: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ciclistas',
          key: 'id'
        }
      },
      idTranca: {
        type: Sequelize.INTEGER,
        allowNull: false
        //Descomentar quando integrar com os serviços de equipamento
        // references: {
        //     model: trancas,
        //     key: "id",
        // },
      },
      idBicicleta: {
        type: Sequelize.INTEGER,
        allowNull: false
        // references: {
        //     model: bicicletas,
        //     key: "id",
        // },
      },
      valorExtra: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      idCartao: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'meiosDePagamento',
          key: 'id'
        }
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('devolucoes');
  }
};
