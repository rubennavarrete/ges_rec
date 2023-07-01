import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Recetas_medicacion = sequelize.define(
    "recetas_medicacion",
    {
        id_receta_med: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        int_id_medicacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        str_dosis: {
            type: DataTypes.INTEGER,
            allowNull: false, 
        },

        str_duracion: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        str_indicacion: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },
    {
        schema: "ges_recetas",
        timestamps:false,
    },
);