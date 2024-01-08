import { sequelize } from "../database/database.js";
import { Recetas_medicacion } from "../models/Recetas_med.js";

//RECIBIR TODAS LAS RECETAS
export const getRecetas_med = async (req, res) => {
    try{
        const recetas_med = await Recetas_medicacion.findAll();
        res.json(recetas_med);
    }catch (error){
        return res.status(500).json({message: error.message});
    }
    
}

//RECIBIR UNA RECETA
export const getReceta_med = async(req, res) =>{
    try {
        const {id_receta_med} = req.params;
        const receta_med = await Recetas_medicacion.findOne({
            where: {
                id_receta_med:id_receta_med,
            },
        });

        if(receta_med.length === 0) return res.status(404).json({ message: "No se ha encontrado la receta"});
        res.json(receta_med)
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}



// CREAR LISTA DE MEDICAMENTOS
export const createReceta_med = async (id_receta, req, t) => {
    const { medicamentos } = req.body;
    try {
        for (const medicamento of medicamentos) {
            await Recetas_medicacion.create(
                {
                    int_id_receta: id_receta,
                    int_id_medicacion: medicamento.id_medicacion,
                    str_cantidad: medicamento.cantidad,
                    str_dosis: medicamento.dosis,
                    str_duracion: medicamento.duracion,
                    str_indicacion: medicamento.indicaciones,
                },
                { transaction: t }
            );
        }
    } catch (error) {
        throw new Error(error.message);
    }
};





