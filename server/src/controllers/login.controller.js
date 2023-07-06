import { Usuarios } from "../models/Usuarios.js";
import { jwtVariables } from "../config/variables.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export const login = async (req, res) => {
    const { cedula, password } = req.body;

    //SI NO EXISTE EL USUARIO
    const usuario = await Usuarios.findOne({
        where: {
            str_cedula: cedula,
        },
    });

    if(!usuario) return res.status(500).json({ message: "No se ha encontrado el usuario"});

    //VALIDAR CONTRASEÑA
    const passwordValid = await bcrypt.compare(password, usuario.str_password) 
    if(!passwordValid) return res.status(500).json({ message: "Contraseña incorrecta"}); 

    //CREAR TOKEN

    const usuarioToken = {
        cedula: cedula,
        nombre: usuario.str_nombres,
        id_rol: usuario.id_rol,
        id_usuario: usuario.id_usuario,
    };

    console.log('Usuario Token: ', usuarioToken);

    const token = jwt.sign(usuarioToken, jwtVariables.jwtSecret, {
        expiresIn: "7d",
    }
    );


    res.cookie("token", token, {
        expires: new Date(Date.now() + 99999999),
        httpOnly: false,
        sameSite: "none",
        secure: true,
        damin: "localhost"
    });
   

    console.log(token);

    res.json({
        status: "success",
        message: "Existe el usuario",
        datosUsuario: {
            datos: usuario
        },
        accessToken: token,
    });
    
    /*res.json({
        token
    });*/
}

/*export const validarLogin = async (req, res) => {
    const { cedula, password } = req.body;

    //Información del token
    const usuarioToken = {
        cedula:
    };
};*/