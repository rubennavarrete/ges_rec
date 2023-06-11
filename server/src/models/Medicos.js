import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";


export const Medicos = sequelize.define(
    "medicos",
    {
        int_id_medico: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        str_especialidad: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);