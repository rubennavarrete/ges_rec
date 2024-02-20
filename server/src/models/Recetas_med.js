import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Recetas_medicacion = sequelize.define(
    "receta_medicacion",
    {
        int_id_receta_med: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        int_id_receta: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        int_id_medicacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        int_cantidad: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        str_dosis: {
            type: DataTypes.STRING(100),
            allowNull: false, 
        },

        str_tipo: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        str_indicacion: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        int_vendidos: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        str_estado: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },
    {
        schema: "ges_recetas",
        timestamps:false,
        freezeTableName: true,
    },
);