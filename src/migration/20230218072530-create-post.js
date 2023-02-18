'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Title: {
        type: Sequelize.STRING
      },
      Description: {
        type: Sequelize.STRING
      },
      Status: {
        type: Sequelize.BOOLEAN
      },
      IdUser: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint('Posts', {
      fields: ['IdUser'],
      type: 'foreign key',
      references: {
        table: 'Users',
        field: 'Id'
      }
    })

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');

    await queryInterface.removeConstraint('Posts', {
      fields: ['IdUser'],
      type: 'foreign key',
      references: {
        table: 'Users',
        field: 'Id'
      }
    })
  }
};