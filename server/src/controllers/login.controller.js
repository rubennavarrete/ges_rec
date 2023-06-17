import { Usuarios } from "../models/Usuarios.js";


export const login = async (req, res) => {
    const { cedula, password } = req.body;

    try {
        const usuario = await Usuarios.findOne({
        where: {
            str_cedula: cedula,
            str_contraseña: password,
        },
    });

    if (usuario) {
        // Retornar true si el usuario y password son correctos
        res.status(200).json({ success: true });
    } else {
        res.status(400).json({ message: "Usuario o password incorrectos" });
    }
    } catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión" });
    }
}
