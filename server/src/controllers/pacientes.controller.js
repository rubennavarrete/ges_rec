import { sequelize } from "../database/database.js";
import { Pacientes } from "../models/Pacientes.js";



//RECIBIR TODOS LOS PACIENTES
export const getPacientes = async (req, res) => {
    try {
        const query = `
        SELECT * FROM ges_recetas.listarPacientes();
        `;

        const pacientes = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
    });

        res.json(pacientes);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
    

//RECIBIR UN PACIENTE
export const getPaciente = async (req, res) => {
    try {
        const {cedula} = req.params;
        const query = `
        SELECT * FROM ges_recetas.listarPaciente(:cedula);
        `;

        const paciente = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
        replacements: { cedula } 
    });

        if(paciente.length === 0) return res.status(404).json({ message: "No se ha encontrado el paciente"});

        res.json(paciente);
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