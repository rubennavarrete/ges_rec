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

// export const sequelize = new Sequelize(
//     "railway",
//     "postgres",
//     "TAP2ejA0Wu4hC5yDEj8e",
//     {
//         host: "http://containers-us-west-156.railway.app",
//         logging: false,
//         dialect: "postgres",
//         port: 7877,
// });
