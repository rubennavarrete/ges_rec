import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Recetas_com = sequelize.define(
    "recetas_comentario",
    {
        int_id_receta_com: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        int_id_receta: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        int_id_farmacia: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        txt_comentario: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        fl_precio: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
    },
    {
        schema: "ges_recetas",
        timestamps:false,
        freezeTableName: true,
    },
);