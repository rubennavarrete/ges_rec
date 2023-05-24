import { Recetas_med } from "../models/Recetas_med.js";


export const getRecetas_med = async (req, res) => {
    try{
        const recetas_med = await Recetas_med.findAll();
        res.json(recetas_med);
    }catch (error){
        return res.status(500).json({message: error.message});
    }
};

export const getReceta_med = async(req, res) =>{
    try {
        const {id_receta_med} = req.params;
        const receta_med = await Recetas_med.findOne({
            where: {
                id_receta_med,
            },
        });

        if(!id_receta_med) return res.status(404).json({ message: "No se ha encontrado la"});
        res.json(receta_med)
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

export const createReceta_med = async(req,res) => {
    const { unidades, pauta, duracion } = req.body;
    try {
        const newReceta_med = await Recetas_med.create({
            unidades,
            pauta,
            duracion
        });

        res.json(newReceta_med);
        
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

export const updateReceta_med = async(req,res) => {
    const {id_receta_med} = req.params;
    const {unidades, pauta, duracion} = req.body;
    try {
        const updateReceta_med = await Recetas_med.findOne({
            where: {
                id_receta_med,
            },
        });

        updateReceta_med.nombre = unidades
        updateReceta_med.nombre = pauta
        updateReceta_med.nombre = duracion

        await updateReceta_med.save();
        res.json(updateReceta_med);
        
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

export const deleteRecetas_med = async (req, res) => {
    const {id_receta_med} = req.params;
    try{
        const receta_med = await Recetas_med.destroy({
            where: {
                id_receta_med,
            },
        });
        res.sendStatus(204);
    }catch (error){
        return res.status(500).json({message: error.message});
    }
};