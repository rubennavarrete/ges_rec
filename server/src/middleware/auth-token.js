import express from "express";
import jwt from 'jsonwebtoken';


export const validarToken = (req, res, next) => {
  // Obtener el token de la cookie
    const token = req.cookies.token;
    console.log(token);

    // Verificar si el token existe
    if (!token) {
        return res.status(401).json({ message: 'No se ha proporcionado un token válido' });
    }

    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.SECRET_KEY || 'secretkey');

        // Agregar los datos decodificados al objeto de solicitud (req) para su uso posterior
        req.usuario = decoded;

        // Pasar al siguiente middleware
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};


export default validarToken;