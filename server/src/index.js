import app from "./app.js";   
import { sequelize } from "./database/database.js";


async function main(){
    
    try{
        
        await sequelize.sync({force:false});
        app.listen(4000);
        console.log("El servidor estta escuchando el puerto",4000);

    } catch (error){

        console.error("Existe un error en la conexion con la base de datos", error);
    }
}

main();