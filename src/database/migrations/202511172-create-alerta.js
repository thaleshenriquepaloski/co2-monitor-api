"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("alertas", {
            id: {
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            leitura_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "leituras",
                    key: "id"
                },
                allowNull: false,
                onDelete: "CASCADE"
            },
            message: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable("alertas")
    }
};