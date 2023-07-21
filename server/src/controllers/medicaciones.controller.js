import { sequelize } from "../database/database.js";
import { Medicaciones } from "../models/Medicaciones.js";

//RECIBIR TODOS LOS MEDICAMENTOS
export const getMedicaciones = async (req, res) => {
    try {
        const medicamentos = await Medicaciones.findAll();
        res.json(medicamentos);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//RECIBIR UN MEDICAMENTO
export const getMedicacion= async (req, res) => {
    try {
        const { id_medicacion } = req.params;
        const medicamento = await Medicaciones.findOne({
            where: {
                int_id_medicacion: id_medicacion,
            },
        });

        if (medicamento.length === 0) return res.status(404).json({ message: "No se ha encontrado el medicamento" });
        res.json(medicamento)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//RECIBIR UN MEDICAMENTO POR NOMBRE
export const getMedicacionByName= async (req, res) => {
    try {
        const { nombre_comercial } = req.query;
        const query = `SELECT int_id_medicacion, str_nombre_comercial FROM ges_recetas.medicaciones WHERE LOWER(str_nombre_comercial) LIKE LOWER('${nombre_comercial}%')`;

        const medicamento = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        });
        console.log(nombre_comercial);
        if (medicamento.length === 0) return res.json({status: "error", message: "No se ha encontrado el medicamento"});
        
        return res.json({
            data: medicamento,
            status: "success",
            message: "Se ha encontrado el medicamento"
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//CREAR UN MEDICAMENTO
export const createMedicacion = async (req, res) => {
    const { nombre_comercial, nombre_generico} = req.body;
    try {
        const newMedicamento = await Medicaciones.create({
            str_nombre_comercial: nombre_comercial,
            str_nombre_generico: nombre_generico,
        });
        res.json({ 
            message: "Se ha creado un nuevo medicamento",
            status: "success",
            data: newMedicamento,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//ACTUALIZAR UN MEDICAMENTO
export const updateMedicacion= async (req, res) => {
    const { id_medicacion } = req.params;
    const { nombre_comercial, nombre_generico } = req.body;
    try {
        const medicamento = await Medicaciones.findOne({
            where: {
                int_id_medicacion: id_medicacion,
            },
        });

        if (medicamento.length === 0) return res.status(404).json({ message: "No se ha encontrado el medicamento" });

        const updateMedicamento = await Medicaciones.update(
            {
                str_nombre_comercial: nombre_comercial,
                str_nombre_generico: nombre_generico,
            },
            {
                where: {
                    int_id_medicacion: id_medicacion,
                },
            }
        );
        
        res.json({ 
            message: "Se ha actualizado el medicamento",
            status: "success",
            data: updateMedicamento,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//ELIMINAR UN MEDICAMENTO
export const deleteMedicacion = async (req, res) => {
    const { id_medicacion } = req.params;
    try {
        const deleteRowCount = await Medicaciones.destroy({
            where: {
                int_id_medicamento: id_medicacion,
            },
        });
        res.json({ message: "Se ha eliminado el medicamento"});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}