import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Usuarios = sequelize.define(
    "usuarios",
    {
        id_usuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        cedula: {
            type: DataTypes.STRING(10),
            allowNull: true, 
        },

        usuario: {
            type: DataTypes.STRING(50),
            allowNull: true, 
        },

        contraseña: {
            type: DataTypes.STRING(50),
            allowNull: true, 
        },

        nombres: {
            type: DataTypes.STRING(100),
            allowNull: true, 
        },

        apellidos: {
            type: DataTypes.STRING(100),
            allowNull: true, 
        },

        fnac: {
            type: DataTypes.DATE,
            allowNull: false, 
        },

        genero: {
            type: DataTypes.BOOLEAN,
            allowNull: false, 
        },

        correo: {
            type: DataTypes.STRING(100),
            allowNull: true, 
        },

        direccion: {
            type: DataTypes.STRING(100),
            allowNull: false, 
        },

        telefono: {
            type: DataTypes.STRING(100),
            allowNull: false, 
        },

        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: true, 
        },

        image: {
            type: DataTypes.STRING(100),
            allowNull: false, 
        },

    },
    {
        timestamps:false,
    }
);

