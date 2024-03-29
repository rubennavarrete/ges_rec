import { Usuarios } from "../models/Usuarios.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import  { jwtVariables } from "../config/variables.config.js"


export const login = async (req, res) => {
    const { cedula, password } = req.body;

    // SI NO EXISTE EL USUARIO
    const usuario = await Usuarios.findOne({
        where: {
        str_cedula: cedula,
        },
    });

    if (!usuario)
        return res.status(404).json({ message: "No se ha encontrado el usuario" });

    // VALIDAR CONTRASEÑA
    const passwordValid = await bcrypt.compare(password, usuario.str_password);
    if (!passwordValid)
        return res.status(400).json({ message: "Contraseña incorrecta" });

    // CREAR TOKEN
    const usuarioToken = {
        nombre: usuario.str_nombres,
        id_usuario: usuario.int_id_usuario,
    };
    console.log('Usuario Token',usuarioToken)
    const token = jwt.sign(usuarioToken, jwtVariables.jwtSecret,
        //process.env.SECRET_KEY || 'secretkey',
        {
        expiresIn: "7d", // Token y cookie expiran en 12 horas
        }
    );

    res.cookie('token', token, {
        httpOnly: false, // La cookie solo es accesible a través de HTTP
        maxAge: 12 * 60 * 60 * 1000, // Tiempo de expiración de la cookie en milisegundos (12 horas)
        secure: true, // Solo se envía la cookie a través de conexiones HTTPS
        sameSite: 'none', // Restricción estricta de envío de cookies en solicitudes cruzadas
    });

    res.json({ 
        message: "Usuario logueado correctamente",
        status: 'success',
        token,
    });

    

    

}
