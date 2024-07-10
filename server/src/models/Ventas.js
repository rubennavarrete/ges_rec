import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Ventas = sequelize.define(
    "ventas",
    {
        int_id_venta: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        str_cod_venta: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        int_id_medicacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        int_vendidos: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        float_subtotal: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        dt_fecha_venta: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        schema: "ges_recetas",
        timestamps:false,
        freezeTableName: true,
    },
);

export const Venta = sequelize.define(
    "venta",
    {
        str_cod_venta: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        float_total: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        dt_fecha_venta: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        schema: "ges_recetas",
        timestamps:false,
        freezeTableName: true,
    },
);