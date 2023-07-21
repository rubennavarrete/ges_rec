import app from "./app.js";   
import cookieParser from "cookie-parser";
import { sequelize } from "./database/database.js";


async function main(){
    
    try{
        
        await sequelize.sync({force:false});
        sequelize
        .authenticate()
        .then(() => {  
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });

        app.listen(4000);
        console.log("El servidor estta escuchando el puerto",4000);

    } catch (error){

        console.error("Existe un error en la conexion con la base de datos", error);
    }
}

main();