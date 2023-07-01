import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Recetas = sequelize.define(
    "recetas",
    {
        int_id_receta: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        int_id_paciente: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        int_id_medico: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        txt_diagnostico: {
            type: DataTypes.TEXT, 
            allowNull: false,
        },

        dt_fecha_exp_rec : {
            type: DataTypes.DATE,
            allowNull: false,
        },

        bln_estado:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        schema: "ges_recetas",
        timestamps:false,
    },
);