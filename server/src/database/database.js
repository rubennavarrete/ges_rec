import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("gesrecdb","postgres","12345",{
    host: "localhost",
    dialect: "postgres",
})