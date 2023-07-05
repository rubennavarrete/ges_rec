
import jwt from 'jsonwebtoken';

export const validateToken = (req, res, next) => {
    const headerToken = req.headers['authorization'];

    if (headerToken !== undefined && headerToken.startsWith('Bearer ')) {
    // Tiene token
    try {
        const bearerToken = headerToken.slice(7);
        jwt.verify(bearerToken, process.env.SECRET_KEY || 'secretkey');
        next();
    } catch (error) {
        res.status(401).json({
        msg: 'token no válido'
        });
    }
    } else {
    res.status(401).json({
        msg: 'Acceso denegado'
    });
    }
};



export default validateToken;