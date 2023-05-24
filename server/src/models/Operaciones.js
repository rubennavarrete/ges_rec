import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Operaciones = sequelize.define(
    "operaciones",
    {
        id_operacion: {
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