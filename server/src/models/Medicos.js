import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Medicos = sequelize.define(
    "medicos",
    {
        id_medico: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        especialidad: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);