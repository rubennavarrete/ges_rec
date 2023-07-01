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

        str_nombre_comercial: {
            type: DataTypes.STRING(100),
            allowNull: false, 
        },

        str_nombre_generico: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },
    {
        schema: "ges_recetas",
        timestamps:false,
    },
);