import { Operaciones } from "../models/Operaciones.js";


export const getOperaciones = async (req, res) => {
    try{
        const operacions = await Operaciones.findAll();
        res.json(operacions);
    }catch (error){
        return res.status(500).json({message: error.message});
    }
};

export const getOperacion = async(req, res) =>{
    try {
        const {id_operacion} = req.params;
        const operacion = await Operaciones.findOne({
            where: {
                id_operacion,
            },
        });

        if(!id_operacion) return res.status(404).json({ message: "No se ha encontrado la operacion"});
        res.json(operacion)
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

export const createOperacion = async(req,res) => {
    const { nombre } = req.body;
    try {
        const newOperacion = await Operaciones.create({
            nombre
        });

        res.json(newOperacion);
        
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

export const updateOperacion = async(req,res) => {
    const {id_operacion} = req.params;
    const {nombre} = req.body;
    try {
        const updateOperacion = await Operaciones.findOne({
            where: {
                id_operacion,
            },
        });

        updateOperacion.nombre = nombre

        await updateOperacion.save();
        res.json(updateOperacion);
        
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

export const deleteOperaciones = async (req, res) => {
    const {id_operacion} = req.params;
    try{
        const operacion = await Operaciones.destroy({
            where: {
                id_operacion,
            },
        });
        res.sendStatus(204);
    }catch (error){
        return res.status(500).json({message: error.message});
    }
};