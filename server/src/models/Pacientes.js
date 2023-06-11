import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Pacientes = sequelize.define(
    "pacientes",
    {
        int_id_paciente: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        str_persona_res: {
            type: DataTypes.STRING(50),
            allowNull: true, 
        },
        str_alergias: {
            type: DataTypes.TEXT,
            allowNull: true, 
        },
        str_cirugias: {
            type: DataTypes.TEXT,
            allowNull: true, 
        },
    },
    {
        timestamps: false,
    },
);