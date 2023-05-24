import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Modulos = sequelize.define(
    "modulos",
    {
        id_modulo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        nombre: {
            type: DataTypes.STRING(50),
            allowNull: true, 
        },
    },
    {
        timestamps: false,
    },
);