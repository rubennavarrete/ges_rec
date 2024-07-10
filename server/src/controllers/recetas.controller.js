import { sequelize } from "../database/database.js";
import { Recetas } from "../models/Recetas.js";
import { updateReceta_med, createReceta_med, venderReceta } from "./recetas_med.controller.js";
import { paginarDatosRecetas } from "../utils/paginacion.utils.js";






//RECIBIR TODAS LAS RECETAS POR PACIENTE
export const getRecetasPaciente = async (req, res) => {
    const { id_usuario } = req.params;
    try{
        const recetas = await Recetas.findAll({
            where: {
                int_id_paciente: id_usuario
            }
        });
        res.json(recetas);
    }catch (error){
        return res.status(500).json({message: error.message});
    }
    
}

//RECIBIR UNA RECETA
export const getReceta = async (req, res) => {
    try{
        const { id_receta } = req.params;
        const receta = await Recetas.findOne({
            where: {
                int_id_receta: id_receta
            }
        });
        res.json(receta);
    }catch (error){
        return res.status(500).json({message: error.message});
    }
    
}

//RECIBIR TODAS LAS RECETAS
export const getRecetas = async (req, res) => {
    try {
        const paginationData = req.query;
        if(paginationData.page === "undefined" || isNaN(paginationData.page)){
            paginationData.page = 1;
            const { datos, total } = await paginarDatosRecetas(1, 10, '', '');
            return res.json({
                status: true,
                message: "Recetas obtenidas correctamente",
                body: datos,
                total: total
            });
        }
        const recetas = await sequelize.query('SELECT * FROM obtener_datos_recetas();', { type: sequelize.QueryTypes.SELECT });

        
        if(recetas.length === 0 || !recetas){
            return res.json({
                status: false,
                message: "No se encontraron recetas"
            });
        }else {
            const { datos, total } = await paginarDatosRecetas(
                paginationData.page,
                paginationData.size,
                recetas,
                paginationData.parameter,
                paginationData.data
            );

            return res.json({
                status: true,
                body: datos,
                total: total
            });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}




export const getRecetaCompleta = async (req, res) => {
    try {
        const { id_receta } = req.params;

        // Define la consulta SQL para llamar a la función obtenerdatosreceta
        const query = `
            SELECT * FROM obtenerdatosreceta(:id_receta);
        `;

        // Ejecuta la consulta con Sequelize
        const receta = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
            replacements: { id_receta } 
        });

        // Verifica si se encontraron resultados
        if (receta.length === 0) {
            return res.status(404).json({ message: "No se ha encontrado medicamentos" });
        }

        // Mapea los datos obtenidos para estructurarlos mejor
        const recetaCompleta = receta.map(item => ({
            id_receta_medicacion: item.int_id_receta_medicacion,
            int_id_receta: item.int_id_receta,
            int_id_medicacion: item.int_id_medicacion,
            str_nombre_comercial: item.str_nombre_comercial,
            str_dosis: item.str_dosis,
            str_tipo: item.str_tipo,
            str_indicacion: item.str_indicacion,
            int_cantidad: item.int_cantidad,
            float_precio: item.float_precio,
            int_vendidos: item.int_vendidos
        }));

        // Envía los datos mapeados en formato JSON
        res.json(recetaCompleta);
    } catch (error) {
        // Maneja errores y envía una respuesta con el error
        return res.status(500).json({ message: error.message });
    }
};


//CREAR UNA RECETA Y LISTA DE MEDICAMENTOS

export const createReceta = async (req, res) => {
    const { id_paciente, id_medico, diagnostico, cie } = req.body;
    const t = await sequelize.transaction();
    try {
        const newReceta = await Recetas.create(
            {
                int_id_paciente: id_paciente,
                int_id_medico: id_medico,
                txt_diagnostico: diagnostico,
                str_cie: cie,
                bln_vigencia: true,
                str_estado: 'SIN DESPACHAR',
            },
            { transaction: t }
        );

        // Crea la lista de medicamentos
    
        await createReceta_med(newReceta.int_id_receta, req, t);

        await t.commit();

        return res.json({
            message: "Se ha creado la receta",
            status: 'success',
            data: newReceta,
        });
    } catch (error) {
        console.error('Error al crear la receta médica', error);
        await t.rollback();
        return res.status(500).json({ error: 'Error al crear la receta médica' });
    }
};

//ACTUALIZAR UNA RECETA

export const updateReceta = async (req, res) => {
    const { id_receta } = req.params;
    const { id_medico, diagnostico, cie } = req.body;
    const t = await sequelize.transaction();
    try {
        const updateReceta = await Recetas.findOne({
            where: {
                int_id_receta: id_receta
            }
        });

        if (!updateReceta) {
            return res.status(404).json({ message: "No se ha encontrado la receta" });
        }

        updateReceta.int_id_medico = id_medico;
        updateReceta.txt_diagnostico = diagnostico;
        updateReceta.str_cie = cie;
        await updateReceta.save();
        await updateReceta_med(updateReceta.int_id_receta, req, t);
        await t.commit();

        
        

        return res.json({
            message: "Se ha actualizado la receta",
            status: 'success',
            data: updateReceta,
        });
    } catch (error) {
        console.error('Error al actualizar la receta médica', error);
        return res.status(500).json({ error: 'Error al actualizar la receta médica' });
    }
}

//COMPRAR UNA RECETA

export const comprarReceta = async (req, res) => {
    const { id_receta } = req.params;
    const t = await sequelize.transaction();
    try {
        const updateReceta = await Recetas.findOne({
            where: {
                int_id_receta: id_receta
            }
        });

        if (!updateReceta) {
            await t.rollback();
            return res.status(404).json({ message: "No se ha encontrado la receta" });
        }

        const codigoVenta = await venderReceta(updateReceta.int_id_receta, req, t); // Captura el código de venta
        await t.commit();
        return res.json({
            message: "Su código de venta es " + codigoVenta,
            status: 'success',
            data: updateReceta,
        });
    } catch (error) {
        console.error('Error al actualizar la receta médica', error);
        await t.rollback();
        return res.status(500).json({ error: 'Error al actualizar la receta médica' });
    }
};


//ACTIVAR RECETA

export const activarReceta = async(req,res) => {
    const {id_receta} = req.params;   
    try {
        const updateReceta = await Recetas.findOne({
            where: {
                int_id_receta: id_receta,
            },
        });
        
        updateReceta.bln_vigencia= true;
        await updateReceta.save();
        res.json({
            status: "success",
            data: updateReceta,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};


//DESACTIVAR RECETA

export const deleteReceta = async(req,res) => {
    const {id_receta} = req.params;   
    try {
        const updateReceta = await Recetas.findOne({
            where: {
                int_id_receta: id_receta,
            },
        });
        
        updateReceta.bln_vigencia= false;
        await updateReceta.save();
        res.json({
            status: "success",
            data: updateReceta,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};