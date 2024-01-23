import { sequelize } from "../database/database.js";
import { Pacientes } from "../models/Pacientes.js";



//RECIBIR TODOS LOS PACIENTES
export const getPacientes = async (req, res) => {
    try {
        const paginationData = req.query;

        if (paginationData.page === "undefined" || isNaN(paginationData.page)) {
            paginationData.page = 1;
            const { datos, total } = await paginarDatos(1, 10,'', '');
            return res.json({
                status: true,
                message: "Usuarios obtenidos correctamente",
                body: datos,
                total: total
            });
        }

        const pacientes = await sequelize.query('SELECT * FROM obtener_pacientes()', { type: sequelize.QueryTypes.SELECT });

        if (result.length === 0 || !result) {
            return res.json({
                status: false,
                message: "No se encontraron usuarios"
            });
        } else {
            const { datos, total } = await paginarDatos(
                paginationData.page,
                paginationData.size,
                pacientes, // Usar directamente el resultado de la consulta
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


// CREAR UN PACIENTE
export const createPaciente = async (id_usuario, transaction, req) => {
    const { persona_res, alergias, cirugias } = req.body;
    try {
        const newPaciente = await Pacientes.create({
            int_id_usuario: id_usuario,
            str_persona_responsable: persona_res,
            txt_alergias: alergias,
            txt_cirugias: cirugias
        }, { transaction });

        return newPaciente;
    } catch (error) {
        throw new Error(error.message);
    }
};

//ACTUALIZAR UN PACIENTE
export const updatePaciente = async(req,res) => {
    const {id_paciente} = req.params;
    const {persona_res, alergias, cirugias} = req.body;
    try {
        const updatePaciente = await Pacientes.findOne({
            where: {
                int_id_usuario:id_paciente,
            },
        });

        updatePaciente.persona_res = persona_res
        updatePaciente.alergias = alergias
        updatePaciente.cirugias = cirugias

        await updatePaciente.save();
        res.json(updatePaciente);
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}

//ELIMINAR UN PACIENTE
export const deletePaciente = async(req,res) => {
    const {id_paciente} = req.params;
    try {
        const deletePaciente = await Pacientes.destroy({
            where: {
                int_id_usuario:id_paciente,
            },
        });

        res.json({
            message: "Paciente eliminado correctamente",
            count: deletePaciente
        });
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}