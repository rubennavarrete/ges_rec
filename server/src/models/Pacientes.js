import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Pacientes = sequelize.define(
    "pacientes",
    {
        int_id_usuario: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },

        str_persona_responsable: {
            type: DataTypes.STRING(50),
            allowNull: true, 
        },
        txt_alergias: {
            type: DataTypes.TEXT,
            allowNull: true, 
        },
        txt_cirugias: {
            type: DataTypes.TEXT,
            allowNull: true, 
        },
    },
    {
        schema: "ges_recetas",
        timestamps: false,
        freezeTableName: true,
    },
);