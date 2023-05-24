import { Usuarios } from "../models/Usuarios.js";

export const getUsuarios = async (req, res) => {
    try{
        const usuarios = await Usuarios.findAll();
        res.json(usuarios);
    }catch (error){
        return res.status(500).json({message: error.message});
    }
};

export const getUsuario = async(req, res) =>{
    try {
        const {cedula} = req.params;
        const usuario = await Usuarios.findOne({
            where: {
                cedula,
            },
        });

        if(!usuario) return res.status(404).json({ message: "No se ha encontrado el usaurio"});
        res.json(usuario)
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

export const createUsuario = async(req,res) => {
    const { cedula, usuario, contraseña, nombres, apellidos, fnac, genero, correo, direccion, telefono, image} = req.body;
    try {
        const newUsuario = await Usuarios.create({
            cedula, 
            usuario, 
            contraseña, 
            nombres, 
            apellidos, 
            fnac, 
            genero, 
            correo, 
            direccion, 
            telefono,
            image
        });

        res.json(newUsuario);
        
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

export const updateUsuario = async(req,res) => {
    const {cedula} = req.params;
    const {usuario, contraseña, nombres, apellidos, fnac, genero, correo, direccion, telefono, image} = req.body;
    try {
        const updateUsuario = await Usuarios.findOne({
            where: {
                cedula,
            },
        });

        updateUsuario.cedula = cedula,
        updateUsuario.usuario = usuario, 
        updateUsuario.contraseña = contraseña, 
        updateUsuario.nombres = nombres, 
        updateUsuario.apellidos = apellidos, 
        updateUsuario.fnac = fnac, 
        updateUsuario.genero = genero, 
        updateUsuario.correo = correo, 
        updateUsuario.direccion = direccion, 
        updateUsuario.telefono = telefono,
        updateUsuario.image = image

        await updateUsuario.save();
        res.json(updateUsuario);
        
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

export const deleteUsuarios = async (req, res) => {
    const {cedula} = req.params;
    try{
        const usuario = await Usuarios.destroy({
            where: {
                cedula,
            },
        });
        res.sendStatus(204);
    }catch (error){
        return res.status(500).json({message: error.message});
    }
};