import { sequelize } from "../database/database.js";
import { Farmacias } from "../models/Farmacias.js";
import { paginarDatos } from "../utils/paginacion.utils.js";
import bcrypt from "bcrypt";

//RECIBIR TODAS LAS FARMACIAS
export const getFarmacias = async (req, res) => {

    console.log(req.query);

    try {
        const paginationData = req.query;

        if(paginationData.page === "undefined") {
            const { datos, total } = await paginarDatos(1, 10, Bienes, '', '');
            return res.json({
                status: true,
                message:  "Farmacias obtenidas correctamente",
                body: datos,
                total: total
            });
        }

        const farmacias = await Farmacias.findAll();
        if(farmacias.length === 0 || !farmacias) {
            return res.json({
                status: false,
                message: "No se encontraron farmacias"
            });
        } else {
            const { datos, total } = await paginarDatos(
                paginationData.page,
                paginationData.size,
                Farmacias,
                paginationData.parameter,
                paginationData.data
            );

            return res.json({
                status: true,
                message: "Farmacias obtenidas correctamente",
                body: datos,
                total: total
            });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//RECIBIR UNA FARMACIA
export const getFarmacia = async(req, res) =>{
    try {
        const {ruc} = req.params;
        const farmacia = await Farmacias.findOne({
            where: {
                str_ruc:ruc,
            },
        });

        if(farmacia.length === 0) return res.status(404).json({ message: "No se ha encontrado la farmacia"});
        res.json(farmacia)
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}

//CREAR UNA FARMACIA
export const createFarmacia = async (req, res) => {
    const { ruc, nombre, direccion, telefono, correo, nombre_representante, celular_representante, password } = req.body;
    try {
        await sequelize.transaction(async (t) => {
            const farmacia = await Farmacias.findOne({
                where: {
                    str_ruc: ruc,
                },
                transaction: t,
            });

            if (farmacia) {
                return res.status(404).json({ message: 'La farmacia ya existe' });
            }

            // Crea la farmacia
            const hashedPasss = await bcrypt.hash(password, 10);
            const newFarmacia = await Farmacias.create(
                {
                    str_ruc: ruc,
                    str_nombre_institucion: nombre,
                    txt_direccion_institucion: direccion,
                    str_telefono_institucion: telefono,
                    str_correo_institucion: correo,
                    str_nombre_representante: nombre_representante,
                    str_celular_representante: celular_representante,
                    str_password: hashedPasss,
                    int_id_rol: 2,
                },
                { transaction: t }
            );
            return res.json({
                status:"success",
                data: newFarmacia,
            });
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    
}

//ACTUALIZAR UNA FARMACIA

export const updateFarmacia = async (req, res) => {
    try {
        const {ruc} = req.params;
        const { nombre, direccion, telefono, celular, correo, representante, celular_representante, password } = req.body;
        const farmacia = await Farmacias.findOne({
            where: {
                str_ruc: ruc,
            },
        });

        if (!farmacia) {
            return res.status(404).json({ message: 'La farmacia no existe' });
        }

        const hashedPasss = await bcrypt.hash(password, 10);
        const updatedFarmacia = await Farmacias.update(
            {
                str_nombre_institucion: nombre,
                txt_direccion_institucion: direccion,
                str_telefono_institucion: telefono,
                str_celular_institucion: celular,
                str_correo_institucion: correo,
                str_nombre_representante: representante,
                str_celular_representante: celular_representante,
                str_password: hashedPasss,
            },
            {
                where: {
                    str_ruc: ruc,
                },
            }
        );
        return res.json({
            status:"success",
            data: updatedFarmacia,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    
}

//ELIMINAR UNA FARMACIA
export const deleteFarmacia = async (req, res) => {
    try {
        const {ruc} = req.params;
        const farmacia = await Farmacias.findOne({
            where: {
                str_ruc: ruc,
            },
        });

        if (!farmacia) {
            return res.status(404).json({ message: 'La farmacia no existe' });
        }

        await Farmacias.destroy({
            where: {
                str_ruc: ruc,
            },
        });
        return res.json({
            status:"success",
            message: "Farmacia eliminada exitosamente",
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    
}
