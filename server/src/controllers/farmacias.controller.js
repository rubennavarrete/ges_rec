import { sequelize } from "../database/database.js";
import { Farmacias } from "../models/Farmacias.js";
import { paginarDatos } from "../utils/paginacion.utils.js";
import bcrypt from "bcrypt";
import { paginarDatosExtras } from "../utils/paginacionData.utils.js";

//RECIBIR TODAS LAS FARMACIAS
export const getFarmacias = async (req, res) => {

    try {
        const paginationData = req.query;

        console.log(req.query);

        if(paginationData.page === "undefined") {
            const { datos, total } = await paginarDatosExtras(1, 10, Farmacias, '', '');
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
            const { datos, total } = await paginarDatosExtras(
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
                    int_id_rol: 3,
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
        const { nombre, direccion, telefono, celular, correo, nombre_representante, celular_representante, password } = req.body;
        const updateFarmacia= await Farmacias.findOne({
            where: {
                str_ruc: ruc,
            },
        });

        if(password){
            const hashedPasss = await bcrypt.hash(password, 10);
            updateFarmacia.str_password = hashedPasss;
        }
        updateFarmacia.str_nombre_institucion = nombre;
        updateFarmacia.txt_direccion_institucion = direccion;
        updateFarmacia.str_telefono_institucion = telefono;
        updateFarmacia.str_celular_institucion = celular;
        updateFarmacia.str_correo_institucion = correo;
        updateFarmacia.str_nombre_representante = nombre_representante;
        updateFarmacia.str_celular_representante = celular_representante;
        await updateFarmacia.save();
        res.json({
            status: "success",
            data: updateFarmacia,
        });
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    
}

//DESACTIVAR FARMACIA
export const deleteFarmacia = async(req,res) => {
    const {ruc} = req.params;   
    try {
        const updateFarmacia = await Farmacias.findOne({
            where: {
                str_ruc: ruc,
            },
        });
        
        updateFarmacia.bln_estado= false;
        await updateFarmacia.save();
        res.json({
            status: "success",
            data: updateFarmacia,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};


//ACTIVAR FARMACIA
export const activarFarmacia = async(req,res) => {
    const {ruc} = req.params;   
    try {
        const updateFarmacia = await Farmacias.findOne({
            where: {
                str_ruc: ruc,
            },
        });
        
        updateFarmacia.bln_estado= true;
        await updateFarmacia.save();
        res.json({
            status: "success",
            data: updateFarmacia,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};
