"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn("leituras", "medidoEm", {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn("leituras", "medidoEm", {
            type: Sequelize.DATE,
            allowNull: false,
            // sem defaultValue
        });
    }
};