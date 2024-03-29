import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Roles = sequelize.define(
    "roles",
    {
        int_id_rol: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        str_nombre: {
            type: DataTypes.STRING(50),
            allowNull: false, 
        },

        bln_estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false, 
        },
    },
    {
        schema: "ges_recetas",
        timestamps:false,
        freezeTableName: true,
    },
);