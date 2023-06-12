import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";


export const Medicos = sequelize.define(
    "medicos",
    {
        int_id_usuario: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },

        str_especialidad: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
    },
    {
        schema: "ges_recetas",
        timestamps:false,
        freezeTableName: true,
    }
);