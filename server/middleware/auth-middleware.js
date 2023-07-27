import jwt from 'jsonwebtoken';
import  { jwtVariables } from "../src/config/variables.config.js"
import cookieParser from 'cookie-parser';

const  verificarToken = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ").pop();
        if(token){
            next();
        }else{
            res.status(401).json({mensaje: "No autorizado"});
        }
    }catch (error){
        console.log(error);
        res.status(401).json({mensaje: "No autorizado"});
    }
}

export default verificarToken;

