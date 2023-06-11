import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Farmacias = sequelize.define(
    "farmacias",
    {
        int_id_farmacia: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        str_RUC: {
            type: DataTypes.STRING(13),
            allowNull: false,
        },

        str_nom_inst: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        
        str_dir_inst: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        str_correo_inst: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        str_telefono_inst: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },

        str_celular_inst: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },

        logo: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

    },
    {
        schema: "ges_recetas",
        timestamps:false,
    }
);