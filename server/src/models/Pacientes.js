import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Pacientes = sequelize.define(
    "pacientes",
    {
        id_paciente: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        persona_res: {
            type: DataTypes.STRING(50),
            allowNull: false, 
        },
        alergias: {
            type: DataTypes.STRING(500),
            allowNull: false, 
        },
        cirugias: {
            type: DataTypes.STRING(500),
            allowNull: false, 
        },
    },
    {
        timestamps: false,
    },
);