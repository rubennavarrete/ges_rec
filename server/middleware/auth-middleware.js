import jwt from 'jsonwebtoken';



const  verificarToken = (req, res, next) => {
    // Obtener el token de la cookie
    const token = req.cookies.token;
    console.log(token);

    if (!token) {
    // Si no se encuentra el token en la cookie, retornar un error
    return res.status(401).json({ mensaje: 'No se proporcionó un token válido' });
    }
    
    try {
    const decoded = jwt.verify(token,process.env.SECRET_KEY||'secretkey');
    // Agregar los datos decodificados a la solicitud para su uso posterior
    req.usuario = decoded;
    next();
    } catch (error) {
    // Si ocurre algún error al verificar el token, retornar un error
    return res.status(401).json({ mensaje: 'Token inválido' });
    }
}

export default verificarToken;

