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

        str_codigo: {
            type: DataTypes.STRING(20),
            allowNull: false, 
        },

        txt_diagnostico: {
            type: DataTypes.TEXT, 
        },

        bol_estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false, 
        },
    },
    {
        timestamps: false,
    },
);