import { sequelize } from "../database/database.js";
import { Recetas_medicacion } from "../models/Recetas_med.js";
import { Recetas } from "../models/Recetas.js";
import { Medicaciones } from "../models/Medicaciones.js";
import { Ventas } from "../models/Ventas.js";
import { Ventas_rec } from "../models/Ventas_rec.js";
import { Factura } from "./factura.controller.js";


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
    const { medicamentos } = req.body;
    try {
        await Recetas_medicacion.destroy({ where: { int_id_receta: id_receta } }, { transaction: t });
        await createReceta_med(id_receta, req, t);
    } catch (error) {
        throw new Error(error.message);
    }
};

const generateVentaCode = async () => {
    // Obtener la fecha actual en formato MMDDYY
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const dateCode = `${month}${day}${year}`;

    // Obtener el último contador de la base de datos y aumentarlo
    const lastVenta = await Ventas.findOne({
        attributes: ['str_cod_venta']
    });

    let counter = 1;
    if (lastVenta) {
        const lastCode = lastVenta.str_cod_venta;
        const lastCounter = parseInt(lastCode.slice(6)) || 0;
        counter = lastCounter + 1;
    }

    // Generar el nuevo código
    const ventaCode = `${dateCode}${String(counter).padStart(2, '0')}`;
    return ventaCode;
};

export const venderReceta = async (id_receta, req, res, t) => {
    const { medicamentos } = req.body;
    try {
        const codigo = await generateVentaCode(); // Genera un código de venta único
        console.log('HOLAAAAAAAAAAAAAAAAA', codigo);
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
                        { str_estado: "DESPACHADA", bln_vigencia: false },
                        {
                            where: {
                                int_id_receta: id_receta
                            },
                            transaction: t
                        }
                    )
                } else {
                    await Recetas.update(
                        { str_estado: "PARCIALMENTE DESPACHADA", bln_vigencia: true },
                        {
                            where: {
                                int_id_receta: id_receta
                            },
                            transaction: t
                        }
                    )
                }

                await Recetas_medicacion.update(
                    { int_vendidos: vendidos },
                    {
                        where: {
                            int_id_receta: id_receta,
                            int_id_medicacion: medicamento.id_medicacion
                        },
                        transaction: t
                    }
                );

                await Medicaciones.update(
                    { int_stock: sequelize.literal(`int_stock - ${medicamento.vendidos}`) },
                    {
                        where: {
                            int_id_medicacion: medicamento.id_medicacion
                        },
                        transaction: t
                    }
                );

                await Ventas.create(
                    {
                        int_id_medicacion: medicamento.id_medicacion,
                        str_cod_venta: codigo,
                        int_vendidos: medicamento.vendidos,
                        float_subtotal: medicamento.vendidos * medicamento.precio,
                        dt_fecha_venta: new Date(),
                    },
                    { transaction: t }
                );
            }
        }
        if (id_receta != 0) {
            await Ventas_rec.create(
                {
                    int_id_receta: id_receta,
                    str_cod_venta: codigo,
                },
                { transaction: t }
            );
        }

        await Factura(id_receta);

        return codigo; // Devuelve el código de venta
    } catch (error) {
        throw new Error(error.message);
    }
};











