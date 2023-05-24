import { Medicos } from "../models/Medicos.js";

export const getMedicos = async (req, res) => {
    try {
        const medicos = await Medicos.findAll();
        res.json(medicos);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

/*export const getMedico = async (req,res) => {
    try {
        const {cedula} = req.parms ;
        const medico = await Medicos.findOne({
            where: {
                cedula,
            },
        });
    } catch (error) {
        
    }
}*/

