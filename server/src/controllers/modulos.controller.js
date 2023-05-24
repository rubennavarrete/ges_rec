import { Modulos } from "../models/Modulos.js";


export const getModulos = async (req, res) => {
    try{
        const modulos = await Modulos.findAll();
        res.json(modulos);
    }catch (error){
        return res.status(500).json({message: error.message});
    }
};

export const getModulo = async(req, res) =>{
    try {
        const {id_modulo} = req.params;
        const modulo = await Modulos.findOne({
            where: {
                id_modulo,
            },
        });

        if(!id_modulo) return res.status(404).json({ message: "No se ha encontrado el modulo"});
        res.json(modulo)
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

export const createModulo = async(req,res) => {
    const { nombre } = req.body;
    try {
        const newModulo = await Modulos.create({
            nombre
        });

        res.json(newModulo);
        
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

export const updateModulo = async(req,res) => {
    const {id_modulo} = req.params;
    const {nombre} = req.body;
    try {
        const updateModulo = await Modulos.findOne({
            where: {
                id_modulo,
            },
        });

        updateModulo.nombre = nombre

        await updateModulo.save();
        res.json(updateModulo);
        
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

export const deleteModulos = async (req, res) => {
    const {id_modulo} = req.params;
    try{
        const modulo = await Modulos.destroy({
            where: {
                id_modulo,
            },
        });
        res.sendStatus(204);
    }catch (error){
        return res.status(500).json({message: error.message});
    }
};
