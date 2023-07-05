import { Usuarios } from "../models/Usuarios.js";
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

    if(!usuario) return res.status(404).json({ message: "No se ha encontrado el usuario"});

    //VALIDAR CONTRASEÑA
    const passwordValid = await bcrypt.compare(password, usuario.str_password) 
    if(!passwordValid) return res.status(400).json({ message: "Contraseña incorrecta"}); 

    //CREAR TOKEN
    const token = jwt.sign(
        {
            nombre: usuario.str_nombres,
            id_usuario: usuario.int_id_usuario,
        },
        process.env.SECRET_KEY||'secretkey',
        {
            expiresIn: 1000 * 60 * 60, //1 hora,
        }
    );

    // res.cookie("token", token, {
    //     httpOnly: false,
    //     secure: true,
    //     sameSite: "none",
    //     expires: new Date(Date.now() + 99999999),
    // });

    res.json(token);
    
}
