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

        str_nombre_institucion: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        
        str_direccion_institucion: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        str_telefono_institucion: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },

        str_correo_institucion: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        str_nombre_representante: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

    },
    {
        schema: "ges_recetas",
        timestamps:false,
    }
);