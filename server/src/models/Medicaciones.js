import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Medicaciones = sequelize.define(
    "medicaciones",
    {
        int_id_medicacion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        str_cod_registro: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        str_nombre_comercial: {
            type: DataTypes.TEXT,
            allowNull: false, 
        },
        str_forma_farmaceutica: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        bln_vigencia: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        int_stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        float_precio: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        schema: "ges_recetas",
        timestamps:false,
        freezeTableName: true,
    },
);