import { Usuarios } from "../models/Usuarios.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import  { jwtVariables } from "../config/variables.config.js"
import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
});

export const ResetPassword = async (req, res) => {
    const {correo} = req.body;
    const usuario = await Usuarios.findOne({
        where: {
            str_correo: correo,
        },
    });
    if (!usuario)
        return res.status(404).json({ message: "No se ha encontrado el usuario" });
    const usuarioToken = {
        nombre: usuario.str_nombres,
        id_usuario: usuario.int_id_usuario,
    };
    const token = jwt.sign(usuarioToken, jwtVariables.jwtSecret);
    
    res.cookie('token', token, {
        httpOnly: false, // La cookie solo es accesible a través de HTTP
        maxAge: 12 * 60 * 60 * 1000, // Tiempo de expiración de la cookie en milisegundos (12 horas)
        secure: true, // Solo se envía la cookie a través de conexiones HTTPS
        sameSite: 'none', // Restricción estricta de envío de cookies en solicitudes cruzadas
    });

    var mailOptions = {
        from: process.env.EMAIL,
        to: correo,
        subject: 'Recuperación de contraseña',
        html: '<h1>Recuperación de contraseña</h1><p>Para recuperar su contraseña haga click en el siguiente enlace: </p><a href="http://localhost:4200/reset_password/'+token+'">Recuperar contraseña</a>'
    };

    const updateUsuario = await Usuarios.findOne({
        where: {
            str_cedula: usuario.str_cedula,
        },
    });
    updateUsuario.str_token = token;
    await updateUsuario.save();

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.status(500).send(error.message);
        } else {
            console.log('Email enviado: ' + info.response);
            res.status(200).json({ message: "Se ha enviado un correo para recuperar la contraseña" });
        }
    }
    );

    res.json({ 
        status: "success",
        token: token,
    });
}

export const ChangePassword = async (req, res) => {
    const {token} = req.params;
    const {password} = req.body;
    const usuario = await Usuarios.findOne({
        where: {
            str_token: token,
        },
    });
    if (!usuario)
        return res.status(404).json({ message: "No se ha encontrado el usuario" });
    const hashedPasss = await bcrypt.hash(password, 10);
    const updateUsuario = await Usuarios.findOne({
        where: {
            str_cedula: usuario.str_cedula,
        },
    });
    updateUsuario.str_password = hashedPasss;
    updateUsuario.str_token = null;
    await updateUsuario.save();
    res.status(200).json({ message: "Se ha cambiado la contraseña correctamente" });
}




