import { Medicaciones } from "../models/Medicaciones.js";


export const getMedicaciones = async (req, res) => {
    try{
        const medicaciones = await Medicaciones.findAll();
        res.json(medicaciones);
    }catch (error){
        return res.status(500).json({message: error.message});
    }
};

export const getMedicacion = async(req, res) =>{
    try {
        const {id_medicacion} = req.params;
        const medicacion = await Medicaciones.findOne({
            where: {
                id_medicacion,
            },
        });

        if(!id_medicacion) return res.status(404).json({ message: "No se ha encontrado el medicamento"});
        res.json(medicacion)
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

export const createMedicacion = async(req,res) => {
    const { nombre, descripcion} = req.body;
    try {
        const newMedicacion = await Medicaciones.create({
            nombre, 
            descripcion
        });

        res.json(newMedicacion);
        
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

export const updateMedicacion = async(req,res) => {
    const {id_medicacion} = req.params;
    const {nombre, descripcion} = req.body;
    try {
        const updateMedicacion = await Medicaciones.findOne({
            where: {
                id_medicacion,
            },
        });

        updateMedicacion.nombre = nombre,
        updateMedicacion.descripcion = descripcion

        await updateMedicacion.save();
        res.json(updateMedicacion);
        
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

export const deleteMedicaciones = async (req, res) => {
    const {id_medicacion} = req.params;
    try{
        const medicacion = await Medicaciones.destroy({
            where: {
                id_medicacion,
            },
        });
        res.sendStatus(204);
    }catch (error){
        return res.status(500).json({message: error.message});
    }
};

