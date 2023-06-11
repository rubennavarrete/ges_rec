import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Perfiles = sequelize.define(
    "perfiles",
    {
        int_id_perfil: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        int_id_rol: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        int_id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    },
    {
        schema: "ges_recetas",
        timestamps:false,
        freezeTableName: true,
    },
);