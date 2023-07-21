import jwt from 'jsonwebtoken';
import  { jwtVariables } from "../src/config/variables.config.js"
import cookieParser from 'cookie-parser';


const  verificarToken = (req, res, next) => {


    /*cookieParser()(req, res, () => {
        // Acceder a la cookie
        const token = req.cookies.token;
        console.log(req)
        console.log('token con cookie parser', token);
        // Realizar las operaciones necesarias con la cookie
    
        next();
      });*/

    console.log('verificando token');
    console.log(req);
    // Obtener el token de la cookie
    const token = req.cookies.token;
    console.log('req.', req.cookies.token);
    console.log(token);

    if (!token) {
    // Si no se encuentra el token en la cookie, retornar un error
    return res.status(401).json({ mensaje: 'No se proporcionó un token válido' });
    }
    
    try {
    const decoded = jwt.verify(token, jwtVariables.jwtSecret);
    // Agregar los datos decodificados a la solicitud para su uso posterior
    req.usuario = decoded;
    console.log('decoded', decoded);
    next();
    } catch (error) {
    // Si ocurre algún error al verificar el token, retornar un error
    return res.status(401).json({ mensaje: 'Token inválido' });
    }
}

export default verificarToken;

