import { sequelize } from "../database/database.js";
import { Recetas_medicacion } from "../models/Recetas_med.js";
import { Recetas } from "../models/Recetas.js";


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
                    float_precio: medicamento.precio,
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
    /* const { medicamentos } = req.body;
    try {
        await Recetas_medicacion.destroy({ where: { int_id_receta: id_receta } }, { transaction: t });
        await createReceta_med(id_receta, req, t);
    } catch (error) {
        throw new Error(error.message);
    } */

        const { medicamentos } = req.body;
    try {
        /* await Recetas_medicacion.destroy({ where: { int_id_receta: id_receta } }, { transaction: t }); */
        for (const medicamento of medicamentos) {
            const existingRecord = await Recetas_medicacion.findOne({
                where: {
                    int_id_receta: id_receta,
                    int_id_medicacion: medicamento.id_medicacion
                },
                transaction: t
            });

            if (existingRecord) {
                const vendidos = existingRecord.int_vendidos + medicamento.vendidos;
                if (vendidos == existingRecord.int_cantidad) {
                    await Recetas.update(
                        { str_estado: "DESPACHADA", bln_vigencia: false},
                        {
                            where: {
                                int_id_receta: id_receta
                            },
                            transaction: t
                        }           
                    )
                }else{
                    await Recetas.update(
                        { str_estado: "PARCIALMENTE DESPACHADA", bln_vigencia: true},
                        {
                            where: {
                                int_id_receta: id_receta
                            },
                            transaction: t
                        }           
                    )
                }
    
                await Recetas_medicacion.update(
                    { int_vendidos: vendidos},
                    {
                        where: {
                            int_id_receta: id_receta,
                            int_id_medicacion: medicamento.id_medicacion
                        },
                        transaction: t
                    }
                );
            } 
        }
        /* await venderReceta_med(id_receta, req, t); */
    } catch (error) {
        throw new Error(error.message);
    }
};

//VENDER LISTA DE MEDICAMENTOS
export const venderReceta= async (id_receta, req, t) => {
    const { medicamentos } = req.body;
    try {
        /* await Recetas_medicacion.destroy({ where: { int_id_receta: id_receta } }, { transaction: t }); */
        for (const medicamento of medicamentos) {
            const existingRecord = await Recetas_medicacion.findOne({
                where: {
                    int_id_receta: id_receta,
                    int_id_medicacion: medicamento.id_medicacion
                },
                transaction: t
            });

            if (existingRecord) {
                const vendidos = existingRecord.int_vendidos + medicamento.vendidos;
                if (vendidos == existingRecord.int_cantidad) {
                    await Recetas.update(
                        { str_estado: "DESPACHADA", bln_vigencia: false},
                        {
                            where: {
                                int_id_receta: id_receta
                            },
                            transaction: t
                        }           
                    )
                }else{
                    await Recetas.update(
                        { str_estado: "PARCIALMENTE DESPACHADA", bln_vigencia: true},
                        {
                            where: {
                                int_id_receta: id_receta
                            },
                            transaction: t
                        }           
                    )
                }
    
                await Recetas_medicacion.update(
                    { int_vendidos: vendidos},
                    {
                        where: {
                            int_id_receta: id_receta,
                            int_id_medicacion: medicamento.id_medicacion
                        },
                        transaction: t
                    }
                );
            } 
        }
        /* await venderReceta_med(id_receta, req, t); */
    } catch (error) {
        throw new Error(error.message);
    }
};

/* // VENDER LISTA DE MEDICAMENTOS
export const venderReceta_med = async (id_receta, req, t) => {
    const { medicamentos } = req.body;
    console.log(medicamentos);
    try {
        for (const medicamento of medicamentos) {
            const cantidadDisponible = medicamento.cantidad;
            const cantidadVendida = medicamento.vendidos;

            await Recetas_medicacion.create(
                {
                    int_id_receta: id_receta,
                    int_id_medicacion: medicamento.id_medicacion,
                    int_cantidad: Math.max(0, cantidadDisponible - cantidadVendida),
                    str_dosis: medicamento.dosis,
                    str_tipo: medicamento.tipo,
                    str_indicacion: medicamento.indicaciones,
                    int_vendidos: medicamento.vendidos,
                    float_precio: medicamento.precio,
                    str_estado: "SIN DESPACHAR",
                },
                { transaction: t }
            );
        }
    } catch (error) {
        throw new Error(error.message);
    }
} */







