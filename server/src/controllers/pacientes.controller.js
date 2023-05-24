import { Pacientes } from "../models/Pacientes.js";


export const getPacientes = async (req, res) => {
    try{
        const pacientes = await Pacientes.findAll();
        res.json(pacientes);
    }catch (error){
        return res.status(500).json({message: error.message});
    }
};

export const getPaciente = async(req, res) =>{
    try {
        const {id_paciente} = req.params;
        const paciente = await Pacientes.findOne({
            where: {
                id_paciente,
            },
        });

        if(!id_paciente) return res.status(404).json({ message: "No se ha encontrado el paciente"});
        res.json(paciente)
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

export const createPaciente = async(req,res) => {
    const { persona_res, alergias, cirugias } = req.body;
    try {
        const newPaciente = await Pacientes.create({
            persona_res,
            alergias,
            cirugias
        });

        res.json(newPaciente);
        
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

export const updatePaciente = async(req,res) => {
    const {id_paciente} = req.params;
    const {persona_res, alergias, cirugias} = req.body;
    try {
        const updatePaciente = await Pacientes.findOne({
            where: {
                id_paciente,
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
};

export const deletePacientes = async (req, res) => {
    const {id_paciente} = req.params;
    try{
        const paciente = await Pacientes.destroy({
            where: {
                id_paciente,
            },
        });
        res.sendStatus(204);
    }catch (error){
        return res.status(500).json({message: error.message});
    }
};