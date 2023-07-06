import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    "ges_rec",
    "postgres",
    "backend",
    {
        host: "localhost",
        logging: false,
        dialect: "postgres",
});

