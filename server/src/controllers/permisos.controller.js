import { Permisos } from "../models/Permisos.js";


export const getPermisos = async (req, res) => {
    try{
        const permisos = await Permisos.findAll();
        res.json(permisos);
    }catch (error){
        return res.status(500).json({message: error.message});
    }
};

export const getPermiso = async(req, res) =>{
    try {
        const {id_permiso} = req.params;
        const permiso = await Permisos.findOne({
            where: {
                id_permiso,
            },
        });

        if(!id_permiso) return res.status(404).json({ message: "No se ha encontrado el permiso"});
        res.json(permiso)
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

//EDITAR FALTA CLAVES FORANEAS
export const createPermiso = async(req,res) => {
    const { nombre } = req.body;
    try {
        const newPermiso = await Permisos.create({
            nombre
        });

        res.json(newPermiso);
        
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

//EDITAR FALTA CLAVES FORANEAS
export const updatePermiso = async(req,res) => {
    const {id_permiso} = req.params;
    const {nombre} = req.body;
    try {
        const updatePermiso = await Permisos.findOne({
            where: {
                id_permiso,
            },
        });

        updatePermiso.nombre = nombre

        await updatePermiso.save();
        res.json(updatePermiso);
        
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

export const deletePermisos = async (req, res) => {
    const {id_permiso} = req.params;
    try{
        const permiso = await Permisos.destroy({
            where: {
                id_permiso,
            },
        });
        res.sendStatus(204);
    }catch (error){
        return res.status(500).json({message: error.message});
    }
};