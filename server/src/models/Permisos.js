import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Permisos = sequelize.define(
    "permisos",
    {
        id_permiso: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    },
    {
        timestamps: false,
    },
);