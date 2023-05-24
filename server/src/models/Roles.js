import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Roles = sequelize.define(
    "roles",
    {
        id_rol: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        nombre: {
            type: DataTypes.STRING(50),
            allowNull: true, 
        },
    },
    {
        timestamps: false,
    },
);