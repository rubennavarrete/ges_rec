import jwt from 'jsonwebtoken';



export default function verificarToken(req, res, next) {

    console.log(req.cookies);
    const token = req.cookies.token;

    if (!token) {
    // Si no se encuentra el token en la cookie, retornar un error
    return res.status(401).json({ mensaje: 'No se proporcionó un token válido' });
    }
    
    try {
    const decoded = jwt.verify(token,process.env.SECRET_KEY||'secretkey');
    // Agregar los datos decodificados a la solicitud para su uso posterior
    req.usuario = decoded;
    console.log(req.usuario);
    console.log(token);
    next();
    } catch (error) {
    // Si ocurre algún error al verificar el token, retornar un error
    return res.status(401).json({ mensaje: 'Token inválido' });
    }
}

