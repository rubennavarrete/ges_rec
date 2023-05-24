import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Medicaciones = sequelize.define(
    "medicaciones",
    {
        id_medicacion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        nombre: {
            type: DataTypes.STRING(50),
            allowNull: true, 
        },

        descrpcion: {
            type: DataTypes.STRING(100),
            allowNull: false, 
        },
    },
    {
        timestamps: false,
    },
);