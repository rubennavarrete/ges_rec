import { sequelize } from "../database/database.js";
import { Recetas } from "../models/Recetas.js";
import { Recetas_medicacion } from "../models/Recetas_med.js";
import { createReceta_med } from "./recetas_med.controller.js";
import { paginarDatos } from "../utils/paginacion.utils.js";
import PDF from 'pdfkit';
import fs from 'fs';




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

export const getRecetas = async (req, res) => {
    try {
        const paginationData = req.query;
        if(paginationData.page === "undefined" || isNaN(paginationData.page)){
            paginationData.page = 1;
            const { datos, total } = await paginarDatos(1, 10, Recetas, '', '');
            return res.json({
                status: true,
                message: "Recetas obtenidas correctamente",
                body: datos,
                total: total
            });
        }
        const recetas = await Recetas.findAll();

        
        if(recetas.length === 0 || !recetas){
            return res.json({
                status: false,
                message: "No se encontraron recetas"
            });
        }else {
            const { datos, total } = await paginarDatos(
                paginationData.page,
                paginationData.size,
                Recetas,
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


//RECIBIR UNA RECETA COMPLETA
export const getRecetaCompleta = async (req, res) => {
    try {
        const {id_receta} = req.params;
        const query = `
        SELECT * FROM ObtenerDatosReceta(:id_receta);
        `;

        const receta = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
        replacements: { id_receta } 
    });

        if(receta.length === 0) return res.status(404).json({ message: "No se ha encontrado medicamentos"});

        res.json(receta);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    
};


//CREAR UNA RECETA Y LISTA DE MEDICAMENTOS

export const createReceta = async (req, res) => {
    const { id_paciente, id_medico, diagnostico } = req.body;
    const t = await sequelize.transaction();
    try {
        const newReceta = await Recetas.create(
            {
                int_id_paciente: id_paciente,
                int_id_medico: id_medico,
                txt_diagnostico: diagnostico,
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

export const pdfReceta = async (req, res) => {
    const doc = new PDF();
    doc.text('Hello world!', 100, 100);
    doc.pipe(fs.createWriteStream('receta.pdf'));
    doc.end();
};
