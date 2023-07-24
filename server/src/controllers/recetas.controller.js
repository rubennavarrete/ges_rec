import { sequelize } from "../database/database.js";
import { Recetas } from "../models/Recetas.js";
import { createReceta_med } from "./recetas_med.controller.js";

//RECIBIR TODAS LAS RECETAS
export const getRecetas = async (req, res) => {
    try{
        const recetas = await Recetas.findAll();
        res.json(recetas);
    }catch (error){
        return res.status(500).json({message: error.message});
    }
    
}

//RECIBIR UNA RECETA
export const getReceta = async(req, res) =>{
    try {
        const {id_receta} = req.params;
        const receta = await Recetas.findOne({
            where: {
                int_id_receta:id_receta,
            },
        });

        if(receta.length === 0) return res.status(404).json({ message: "No se ha encontrado la receta"});
        res.json(receta)
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}

//CREAR UNA RECETA Y LISTA DE MEDICAMENTOS

export const createReceta = async (req, res) => {
    const { id_paciente, id_medico, diagnostico, medicamentos } = req.body;
    const t = await sequelize.transaction();
    try {
        const newReceta = await Recetas.create(
            {
                int_id_paciente: id_paciente,
                int_id_medico: id_medico,
                txt_diagnostico: diagnostico,
                bln_estado: true,
            },
            { transaction: t }
        );

        // Crea la lista de medicamentos
    
        await createReceta_med(newReceta.int_id_receta, req, t);

        await t.commit();

        return res.json({
            status: 'success'
        });
    } catch (error) {
        console.error('Error al crear la receta médica', error);
        await t.rollback();
        return res.status(500).json({ error: 'Error al crear la receta médica' });
    }
};
