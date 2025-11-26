"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Alerta extends Model {
        static associate(models) {
            this.belongsTo(models.Leitura, {
                foreignKey: "leitura_id",
                onDelete: "CASCADE"
            })
        }
    }
    Alerta.init({
        id: {
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        leitura_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "Alerta",
        tableName: "alertas",
        timestamps: true
    });

    return Alerta;
}