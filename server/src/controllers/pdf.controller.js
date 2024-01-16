import { sequelize } from "../database/database.js";
import { Recetas } from "../models/Recetas.js";

//RECIBIR DATOS DATOS DEL PACIENTE-MEDICO-RECETA
export const getRecetaPaciente = async (req, res) => {
    try {
        const {id_receta} = req.params;
        const query = `
        SELECT * FROM  ObtenerDatosPorReceta(:id_receta);
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

//RECIBIR DATOS DATOS DE LOS MEDICAMENTOS DE LA RECETA
export const getMedicamentosPaciente = async (req, res) => {
    try {
        const {id_receta} = req.params;
        const query = `
        SELECT * FROM  ObtenerMedicamentosPorReceta(:id_receta);
        `;

        const medicamentos = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
        replacements: { id_receta } 
    });

        if(medicamentos.length === 0) return res.status(404).json({ message: "No se ha encontrado medicamentos"});

        res.json(medicamentos);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    
};

import PDFDocument from 'pdfkit';
import fs from 'fs';
import base64 from 'base64-stream';

// ...

export const pdfReceta = async (req, res) => {
    const { id_receta } = req.params;

    try {
        // Obtener datos de la receta
        const recetaQuery = `
            SELECT * FROM ObtenerDatosPorReceta(:id_receta);
        `;
        const receta = await sequelize.query(recetaQuery, {
            type: sequelize.QueryTypes.SELECT,
            replacements: { id_receta },
        });

        // Obtener datos de los medicamentos
        const medicamentosQuery = `
            SELECT * FROM ObtenerMedicamentosPorReceta(:id_receta);
        `;
        const medicamentos = await sequelize.query(medicamentosQuery, {
            type: sequelize.QueryTypes.SELECT,
            replacements: { id_receta },
        });

        // Crear el documento PDF
        const doc = new PDFDocument();

        // Agregar contenido al PDF
        doc.text('Datos de la Receta', { align: 'center' });
        doc.text('\n');

        // Agregar datos de la receta
        if (receta.length > 0) {
            const datosReceta = receta[0];
            doc.text(`ID Medico: ${datosReceta.int_id_medico}`);
            doc.text(`Cedula Medico: ${datosReceta.str_cedula_medico}`);
            doc.text(`Nombres Medico: ${datosReceta.str_nombres_medico}`);
            doc.text(`Apellidos Medico: ${datosReceta.str_apellidos_medico}`);
            doc.text(`Fecha Nacimiento Medico: ${datosReceta.dt_fecha_nac_medico}`);
            doc.text('\n');
            doc.text(`Cedula Paciente: ${datosReceta.str_cedula_paciente}`);
            doc.text(`Nombres Paciente: ${datosReceta.str_nombres_paciente}`);
            doc.text(`Apellidos Paciente: ${datosReceta.str_apellidos_paciente}`);
            doc.text(`Fecha Nacimiento Paciente: ${datosReceta.dt_fecha_nac_paciente}`);
            doc.text('\n');
            doc.text(`ID Receta: ${datosReceta.int_id_receta}`);
            doc.text(`Fecha Creacion: ${datosReceta.dt_fecha_creacion}`);
            doc.text(`Vigencia: ${datosReceta.bln_vigencia}`);
            doc.text(`Diagnostico: ${datosReceta.txt_diagnostico}`);
        }

        doc.text('\n');
        doc.text('Medicamentos', { align: 'center' });
        doc.text('\n');

        // Agregar datos de los medicamentos
        if (medicamentos.length > 0) {
            medicamentos.forEach((medicamento, index) => {
                doc.text(`Medicamento ${index + 1}`);
                doc.text(`Nombre Comercial: ${medicamento.str_nombre_comercial}`);
                doc.text(`Nombre Generico: ${medicamento.str_nombre_generico}`);
                doc.text(`Cantidad: ${medicamento.str_cantidad}`);
                doc.text(`Dosis: ${medicamento.str_dosis}`);
                doc.text(`Indicacion: ${medicamento.str_indicacion}`);
                doc.text(`Duracion: ${medicamento.str_duracion}`);
                doc.text('\n');
            });
        }

        // Guardar el PDF en un archivo
        const outputPath = 'receta.pdf';
        const writeStream = fs.createWriteStream(outputPath);
        doc.pipe(writeStream);
        doc.end();

        writeStream.on('finish', () => {
            console.log(`El PDF se ha guardado correctamente en: ${outputPath}`);
            // Convertir el archivo PDF a base64 y enviarlo en la respuesta
            const pdfBase64 = fs.readFileSync(outputPath, 'base64');
            res.json({ pdfBase64 });
        });
    } catch (error) {
        console.error('Error al generar el PDF:', error);
        res.status(500).json({ message: 'Error al generar el PDF' });
    }
};


