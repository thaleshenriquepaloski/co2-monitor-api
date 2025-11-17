"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Configuracao extends Model {
        static associate(models) {
            //null
        }
    }
    Configuracao.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        maxCo2: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: "Configuracao",
        tableName: "configuracoes",
        timestamps: true
    })

    return Configuracao
}