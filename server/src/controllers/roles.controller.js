import { Roles } from "../models/Roles.js";


export const getRoles = async (req, res) => {
    try{
        const roles = await Roles.findAll();
        res.json(roles);
    }catch (error){
        return res.status(500).json({message: error.message});
    }
};

export const getRol = async(req, res) =>{
    try {
        const {id_rol} = req.params;
        const rol = await Roles.findOne({
            where: {
                id_rol,
            },
        });

        if(!id_rol) return res.status(404).json({ message: "No se ha encontrado el rol"});
        res.json(rol)
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

export const createRol = async(req,res) => {
    const { nombre } = req.body;
    try {
        const newRol = await Roles.create({
            nombre
        });

        res.json(newRol);
        
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

export const updateRol = async(req,res) => {
    const {id_rol} = req.params;
    const {nombre} = req.body;
    try {
        const updateRol = await Roles.findOne({
            where: {
                id_rol,
            },
        });

        updateRol.nombre = nombre

        await updateRol.save();
        res.json(updateRol);
        
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

export const deleteRoles = async (req, res) => {
    const {id_rol} = req.params;
    try{
        const rol = await Roles.destroy({
            where: {
                id_rol,
            },
        });
        res.sendStatus(204);
    }catch (error){
        return res.status(500).json({message: error.message});
    }
};