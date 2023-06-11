import { Usuarios } from "../models/Usuarios.js";


export const ValidacionLogin = async (req, res) => {
    const {cedula,contraseña} =req.body;
    try{
        cedula = await Usuarios.findOne({
            where: {
                cedula,
            }
        });

        res.json(usuarios);

    }catch (error){
        return res.status(500).json({message: error.message});
    }
}