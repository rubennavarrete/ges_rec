import jwt from 'jsonwebtoken';
import express from 'express';

export const validateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if(token != undefined){
        try {
            const bearer = token.slice(7);
            jwt.verify(bearer, process.env.SECRET_KEY||'secretkey');
            next();
        } catch (error) {
            return res.status(401).json({ message: "Token no válido"});
        }
        
    }else{
        return res.status(401).json({ message: "No se ha encontrado el token"});
    }

    // if(!token) return res.status(401).json({ message: "No se ha encontrado el token"});

    // try {
    //     const payload = jwt.verify(token, process.env.SECRET_KEY||'secretkey');
    //     req.id_rol = payload.id_rol;
    //     next();
    // } catch (error) {
    //     return res.status(401).json({ message: "Token no válido"});
    // }
}

export default validateToken;