"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("leituras", {
            id: {
                autoIncrement: true,
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            co2: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            umidade: {
                type: Sequelize.FLOAT,
                allowNull: true
            },
            temperatura: {
                type: Sequelize.FLOAT,
                allowNull: true
            },
            medidoEm: {
                type: Sequelize.DATE,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("leituras")
    }
};