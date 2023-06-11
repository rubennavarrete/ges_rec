import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Operaciones = sequelize.define(
    "operaciones",
    {
        int_id_operacion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        str_nombre: {
            type: DataTypes.STRING(50),
            allowNull: false, 
        },
    },
    {
        timestamps: false,
    },
);