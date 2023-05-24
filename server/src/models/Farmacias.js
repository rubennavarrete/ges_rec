import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Farmacias = sequelize.define(
    "farmacias",
    {
        id_farmacia: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        RUC: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },

        nom_inst: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        
        dir_inst: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },

        correo_inst: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },

        telefono_inst: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },

        logo: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

    },
    {
        timestamps:false,
    }
);