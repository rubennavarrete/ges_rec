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

        bln_vigencia:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },

        dt_fecha_creacion : {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        str_estado: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        str_cie: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        txt_nota: {
            type: DataTypes.TEXT, 
            allowNull: true,
        }
            
    },
    {
        schema: "ges_recetas",
        timestamps:false,
        freezeTableName: true,
    },
);