import { Recetas_com } from "../models/Recetas_com.js";


export const getRecetas_com = async (req, res) => {
    try{
        const recetas_com = await Recetas_com.findAll();
        res.json(recetas_com);
    }catch (error){
        return res.status(500).json({message: error.message});
    }
};

export const getReceta_com = async(req, res) =>{
    try {
        const {id_receta_com} = req.params;
        const receta_com = await Recetas_com.findOne({
            where: {
                id_receta_com,
            },
        });

        if(!id_receta_com) return res.status(404).json({ message: "No se ha encontrado cometarios sobre la receta"});
        res.json(receta_com)
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

export const createReceta_com = async(req,res) => {
    const { comentario } = req.body;
    try {
        const newReceta_com = await Recetas_com.create({
            comentario
        });

        res.json(newReceta_com);
        
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

export const updateReceta_com = async(req,res) => {
    const {id_receta_com} = req.params;
    const {comentario} = req.body;
    try {
        const updateReceta_com = await Recetas_com.findOne({
            where: {
                id_receta_com,
            },
        });

        updateReceta_com.comentario = comentario

        await updateReceta_com.save();
        res.json(updateReceta_com);
        
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

export const deleteRecetas_com = async (req, res) => {
    const {id_receta_com} = req.params;
    try{
        const receta_com = await Recetas_com.destroy({
            where: {
                id_receta_com,
            },
        });
        res.sendStatus(204);
    }catch (error){
        return res.status(500).json({message: error.message});
    }
};