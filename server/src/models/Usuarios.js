import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";


export const Usuarios = sequelize.define(
    "usuarios",
    {
        int_id_usuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        str_cedula: {
            type: DataTypes.STRING(10),
            allowNull: false, 
        },

        str_contraseña: {
            type: DataTypes.STRING(50),
            allowNull: false, 
        },

        str_nombres: {
            type: DataTypes.STRING(100),
            allowNull: false, 
        },

        str_apellidos: {
            type: DataTypes.STRING(100),
            allowNull: false, 
        },

        dt_fecha_nac: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        bln_genero: {
            type: DataTypes.BOOLEAN,
            allowNull: false, 
        },

        str_correo: {
            type: DataTypes.STRING(100),
            allowNull: false, 
        },

        str_direccion: {
            type: DataTypes.TEXT,
        },

        str_telefono: {
            type: DataTypes.STRING(10),
        },

        str_celular: {
            type: DataTypes.STRING(10),
        },

        bln_estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },

        txt_imagen: {
            type: DataTypes.TEXT,
        },

    },
    {
        schema: "ges_recetas",
        timestamps:false,
        freezeTableName: true,
    }
);

