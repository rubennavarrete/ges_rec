import { Recetas } from "../models/Recetas.js";


export const getRecetas = async (req, res) => {
    try{
        const recetas = await Recetas.findAll();
        res.json(recetas);
    }catch (error){
        return res.status(500).json({message: error.message});
    }
};

export const getReceta = async(req, res) =>{
    try {
        const {id_receta} = req.params;
        const receta = await Recetas.findOne({
            where: {
                id_receta,
            },
        });

        if(!id_receta) return res.status(404).json({ message: "No se ha encontrado la receta"});
        res.json(receta)
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

export const createReceta = async(req,res) => {
    const { firma, diagnostico, fecha_exp } = req.body;
    try {
        const newReceta = await Recetas.create({
            firma,
            diagnostico,
            fecha_exp
        });

        res.json(newReceta);
        
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

export const updateReceta = async(req,res) => {
    const {id_receta} = req.params;
    const {firma, diagnostico, fecha_exp} = req.body;
    try {
        const updateReceta = await Recetas.findOne({
            where: {
                id_receta,
            },
        });

        updateReceta.firma = firma
        updateReceta.diagnostico = diagnostico
        updateReceta.fecha_exp = fecha_exp

        await updateReceta.save();
        res.json(updateReceta);
        
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

export const deleteRecetas = async (req, res) => {
    const {id_receta} = req.params;
    try{
        const receta = await Recetas.destroy({
            where: {
                id_receta,
            },
        });
        res.sendStatus(204);
    }catch (error){
        return res.status(500).json({message: error.message});
    }
};