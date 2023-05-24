import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Modulos = sequelize.define(
    "modulos",
    {
        id_receta_med: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        unidades: {
            type: DataTypes.INTEGER,
            allowNull: true, 
        },

        pauta: {
            type: DataTypes.INTEGER,
            allowNull: false, 
        },

        duracion: {
            type: DataTypes.INTEGER,
            allowNull: false, 
        },
    },
    {
        timestamps: false,
    },
);