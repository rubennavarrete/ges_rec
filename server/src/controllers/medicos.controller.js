import { Medicos } from "../models/Medicos.js";
import { sequelize } from "../database/database.js";


//RECIBIR TODOS LOS MEDICOS
export const getMedicos = async (req, res) => {
    try {
        const query = `
        SELECT * FROM ges_recetas.listarMedicos();
        `;

        const medicos = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
    });

        res.json(medicos);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//RECIBIR UN MEDICO
export const getMedico = async (req, res) => {
    try {
        const {cedula} = req.params;
        const query = `
        SELECT ges_recetas.usuarios.*, ges_recetas.medicos.*
        FROM ges_recetas.usuarios
        INNER JOIN ges_recetas.medicos ON ges_recetas.usuarios.int_id_usuario = ges_recetas.medicos.int_id_usuario
        WHERE ges_recetas.usuarios.str_cedula = :cedula
        `;

        const medico = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
        replacements: { cedula } 
    });

    if(medico.length === 0) return res.status(404).json({ message: "No se ha encontrado el paciente"});

        res.json(medico);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// CREAR UN MEDICO
export const createMedico = async (id_usuario, transaction, req) => {
    const { especialidad } = req.body;
    try {
        const newMedico = await Medicos.create({
            int_id_usuario: id_usuario,
            str_especialidad: especialidad
        }, { transaction });

        return newMedico;
    } catch (error) {
        throw new Error(error.message);
    }
};


//ACTUALIZAR UN MEDICO
export const updateMedico = async(req,res) => {
    const {id_medico} = req.params;
    const {especialidad} = req.body;
    try {
        const updateMedico = await Medicos.findOne({
            where: {
                id_medico:id_medico,
            },
        });

        updateMedico.especialidad = especialidad
        await updateMedico.save();

        res.json(updateMedico);
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}

//ELIMINAR UN MEDICO
export const deleteMedico = async (req, res) => {
    try {
        const {id_medico} = req.params;
        const deleteRowCount = await Medicos.destroy({
            where: {
                id_medico: id_medico,
            },
        });
        res.json({
            message: "Medico eliminado",
            count: deleteRowCount,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}