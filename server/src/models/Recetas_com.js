import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Recetas_com = sequelize.define(
    "recetas_com",
    {
        id_receta_com: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        comentario: {
            type: DataTypes.STRING(200),
            allowNull: tue, 
        },
    },
    {
        schema: "ges_recetas",
        timestamps:false,
        freezeTableName: true,
    },
);