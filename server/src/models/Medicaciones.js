import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Medicaciones = sequelize.define(
    "medicaciones",
    {
        int_id_medicacion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        str_nombre: {
            type: DataTypes.STRING(50),
            allowNull: false, 
        },

        txt_descrpcion: {
            type: DataTypes.TEXT,
            allowNull: true, 
        },
    },
    {
        timestamps: false,
    },
);