import { Medicos } from "../models/Medicos.js";
import { sequelize } from "../database/database.js";
import { paginarDatos } from "../utils/paginacion.utils.js";
import { Usuarios } from "../models/Usuarios.js";


//RECIBIR TODOS LOS MEDICOS
export const getMedicos = async (req, res) => {
    try {
        const paginationData = req.query;

        if (paginationData.page === "undefined" || isNaN(paginationData.page)) {
            paginationData.page = 1;
            const { datos, total } = await paginarDatos(1, 10, Usuarios,'', '');
            return res.json({
                status: true,
                message: "Usuarios obtenidos correctamente",
                body: datos,
                total: total
            });
        }

        const medicos = await sequelize.query('SELECT * FROM obtener_medicos()', { type: sequelize.QueryTypes.SELECT });

        if (medicos.length === 0 || !result) {
            return res.json({
                status: false,
                message: "No se encontraron usuarios"
            });
        } else {
            const { datos, total } = await paginarDatos(
                paginationData.page,
                paginationData.size,
                medicos, // Usar directamente el resultado de la consulta
                paginationData.parameter,
                paginationData.data
            );
            return res.json({
                status: true,
                message: "Usuarios obtenidos correctamente",
                body: datos,
                total: total
            });
        }
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