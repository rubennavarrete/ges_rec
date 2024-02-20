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


// CREAR LISTA DE MEDICAMENTOS
export const createReceta_med = async (id_receta, req, t) => {
    const { medicamentos } = req.body;
    try {
        for (const medicamento of medicamentos) {
            await Recetas_medicacion.create(
                {
                    int_id_receta: id_receta,
                    int_id_medicacion: medicamento.id_medicacion,
                    int_cantidad: medicamento.cantidad,
                    str_dosis: medicamento.dosis,
                    str_tipo: medicamento.tipo,
                    str_indicacion: medicamento.indicaciones,
                    int_vendidos: 0,
                    str_estado: "SIN DESPACHAR",    
                },
                { transaction: t }
            );
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

//EDITAR LISTA DE MEDICAMENTOS
export const updateReceta_med = async (id_receta, req, t) => {
    const { medicamentos } = req.body;
    try {
        await Recetas_medicacion.destroy({ where: { int_id_receta: id_receta } }, { transaction: t });
        await createReceta_med(id_receta, req, t);
    } catch (error) {
        throw new Error(error.message);
    }
};







