import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Ventas_rec = sequelize.define(
    "venta_receta",
    {
        int_id_venta_receta: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        int_id_receta: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        str_cod_venta: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },  
    },
    {
        schema: "ges_recetas",
        timestamps:false,
        freezeTableName: true,
    },
);