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

        int_id_rol: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        str_ruc: {
            type: DataTypes.STRING(13),
            allowNull: false,
        },

        str_nombre_institucion: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        
        txt_direccion_institucion: {
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

        str_celular_representante: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        str_password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

    },
    {
        schema: "ges_recetas",
        timestamps:false,
        freezeTableName: true,  //evitar plurarizar las tablas
    }
);