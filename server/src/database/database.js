import { Sequelize } from "sequelize";

// Conexión a la base de datos local
// export const sequelize = new Sequelize("ges_rec","postgres","12345",{
//     host: "localhost",
//     dialect: "postgres",
// })

// Conexión a la base de datos en la nube
export const sequelize = new Sequelize(
  "railway",
  "postgres",
  "r8PaWGOjkaGmEsu87VVL",
  {
    host: "containers-us-west-57.railway.app",
    dialect: "postgres",
    port: 5469,
  }
);
