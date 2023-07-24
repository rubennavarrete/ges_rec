import { sequelize } from "../database/database.js";
import { Recetas_com } from "../models/Recetas_com.js";

//RECIBIR TODAS LAS RECETAS
export const getRecetas_com = async (req, res) => {
    try{
        const recetas_com = await Recetas_com.findAll();
        res.json(recetas_com);
    }catch (error){
        return res.status(500).json({message: error.message});
    }
    
}

//RECIBIR UNA RECETA
export const getReceta_com = async(req, res) =>{
    try {
        const {id_receta_com} = req.params;
        const receta_com = await Recetas_com.findOne({
            where: {
                id_receta_com:id_receta_com,
            },
        });

        if(receta_com.length === 0) return res.status(404).json({ message: "No se ha encontrado la receta"});
        res.json(receta_com)
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}

//CREAR COEMNTARIO Y PRECIO DE RECETA
export const createReceta_com = async (req, res) => {
    const { id_receta, id_farmacia, precio, comentario} = req.body;
    try {
        const newReceta_com = await Recetas_com.create({
            int_id_receta: id_receta,
            int_id_farmacia: id_farmacia,
            fl_precio: precio,
            txt_comentario: comentario,
        });
        res.json({ 
            message: "Se ha creado un nuevo comentario o precio de receta",
            status: "success",
            data: newReceta_com,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//ACTUALIZAR UNA RECETA
export const updateReceta_com = async (req, res) => {
    const { id_receta_com } = req.params;
    const {precio, comentario} = req.body;
    try {
        const updateReceta_com = await Recetas_com.findOne({
            where: {
                int_id_receta_com: id_receta_com,
            },
        });

        updateReceta_com.fl_precio = precio;
        updateReceta_com.txt_comentario = comentario;

        const receta_comUpdated = await updateReceta_com.save();
        res.json({
            message: "Se ha actualizado el comentario o precio de la receta",
            status: "success",
            data: receta_comUpdated,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//ELIMINAR UNA RECETA
export const deleteReceta_com = async (req, res) => {
    const { id_receta_com } = req.params;
    try {
        const deleteReceta_com = await Recetas_com.destroy({
            where: {
                int_id_receta_com: id_receta_com,
            },
        });
        res.json({
            message: "Se ha eliminado el comentario o precio de la receta",
            status: "success",
            data: deleteReceta_com,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}