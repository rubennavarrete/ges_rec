import { Usuarios } from "../models/Usuarios.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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
    const token = jwt.sign(
        {
            nombre: usuario.str_nombres,
            id_rol: usuario.id_rol,
            id_usuario: usuario.id_usuario,
        },
        process.env.SECRET_KEY || 'secretkey',
        {
        expiresIn: '12h', // Token y cookie expiran en 12 horas
        }
    );

    res.json({token});
    
}
