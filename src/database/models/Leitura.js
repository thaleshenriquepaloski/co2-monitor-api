"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Leitura extends Model {
        static associate(models) {
            this.hasOne(models.Alerta, {
                foreignKey: "leitura_id",
                onDelete: "CASCADE"
            })
        }
    }
    Leitura.init({
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        co2: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        umidade: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        temperatura: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        medidoEm: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: "Leitura",
        tableName: "leituras",
        timestamps: true
    });
    
    return Leitura;
}