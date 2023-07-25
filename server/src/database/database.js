import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    "ges_rec",
    "postgres",
    "12345",
    {
        host: "localhost",
        logging: false,
        dialect: "postgres",
});

