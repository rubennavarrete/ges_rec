import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Recetas = sequelize.define(
    "recetas",
    {
        id_receta: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        firma: {
            type: DataTypes.STRING(100),
            allowNull: true, 
        },

        diagnostico: {
            type: DataTypes.STRING(200),
            allowNull: false, 
        },

        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false, 
        },

        fecha_exp: {
            type: DataTypes.DATE,
            allowNull: true, 
        },
    },
    {
        timestamps: false,
    },
);