import { sequelize } from "../database/database.js";
import { Usuarios } from "../models/Usuarios.js";
import { createPerfil } from "./perfiles.controller.js";
import { createMedico } from "./medicos.controller.js";
import { createPaciente } from "./pacientes.controller.js";
import { paginarDatos } from "../utils/paginacion.utils.js";
import bcrypt from "bcrypt";
import { sentCredenciales } from "./credenciales.controller.js";



//RECIBIR TODOS LOS MEDICOS
export const getMedicos = async (req, res) => {
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

        const result = await sequelize.query('SELECT * FROM obtener_medicos();', { type: sequelize.QueryTypes.SELECT });

        if (result.length === 0 || !result) {
            return res.json({
                status: false,
                message: "No se encontraron usuarios"
            });
        } else {
            const { datos, total } = await paginarDatos(
                paginationData.page,
                paginationData.size,
                result, // Usar directamente el resultado de la consulta
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

        const result = await sequelize.query('SELECT * FROM obtener_pacientes();', { type: sequelize.QueryTypes.SELECT });

        if (result.length === 0 || !result) {
            return res.json({
                status: false,
                message: "No se encontraron usuarios"
            });
        } else {
            const { datos, total } = await paginarDatos(
                paginationData.page,
                paginationData.size,
                result, // Usar directamente el resultado de la consulta
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




//RECIBIR UN USUARIO
export const getUsuario = async(req, res) =>{
    try {
        const {cedula} = req.params;
        const usuario = await Usuarios.findOne({
            where: {
                str_cedula:cedula,
            },
        });

        if(usuario.length === 0) return res.status(404).json({ message: "No se ha encontrado el usuario"});
        res.json(usuario)
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

//RECIBIR UN USUARIO POR CEDULA
export const getPacienteByName= async (req, res) => {
    try {
        const { cedula } = req.query;
        const query = `SELECT int_id_usuario, str_nombres, str_apellidos FROM ges_recetas.usuarios WHERE LOWER(str_cedula) LIKE LOWER('${cedula}%') AND bln_estado = true ORDER BY str_cedula ASC LIMIT 4;`;

        const usuario = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        });
        if (usuario.length === 0) return res.json({status: "error", message: "No se ha encontrado el paciente"});
        
        return res.json({
            data: usuario,
            status: "success",
            message: "Se ha encontrado el paciente"
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


//CREAR UN USUARIO Y PERFIL
export const createUsuario = async (req, res) => {
    const { cedula, password, nombres, apellidos, fecha_nac, genero, correo, direccion, telefono, celular, rol } = req.body;
    try {
        await sequelize.transaction(async (t) => {
            const usuario = await Usuarios.findOne({
                where: {
                    str_cedula: cedula,
                },
                transaction: t,
            });

            if (usuario) {
                return res.status(404).json({ message: 'El usuario ya existe' });
            }

            // Crea el usuario
            const hashedPasss = await bcrypt.hash(password, 10);
            const newUsuario = await Usuarios.create(
                {
                    str_cedula: cedula,
                    str_password: hashedPasss,
                    str_nombres: nombres,
                    str_apellidos: apellidos,
                    dt_fecha_nac: fecha_nac,
                    bln_genero: genero,
                    str_correo: correo,
                    txt_direccion: direccion,
                    str_telefono: telefono,
                    str_celular: celular,
                },
                { transaction: t }
            );

            // Crea el perfil
            await createPerfil(newUsuario.int_id_usuario, t, req); // Pasa el ID del usuario guardado en la variable 

            // Verifica el ID de rol y crea el médico o paciente
            if (rol === 2) {
                await createMedico(newUsuario.int_id_usuario, t, req);
            } else if (rol === 4) {
                await createPaciente(newUsuario.int_id_usuario, t, req);
            }

            await sentCredenciales(req);

            
            return  res.json(
                {
                    status: "success",
                    data: newUsuario,
                },
            );
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    
};



//ACTUALIZAR UN USUARIO
export const updateUsuario = async(req,res) => {
    const {cedula} = req.params;   
    const { password, nombres, apellidos, fecha_nac, genero, correo, direccion, telefono, celular} = req.body;
    try {
        const updateUsuario = await Usuarios.findOne({
            where: {
                str_cedula: cedula,
            },
        });
        
        if(password){
            const hashedPasss = await bcrypt.hash(password, 10);
            updateUsuario.str_password = hashedPasss;
        }
        updateUsuario.str_nombres = nombres;
        updateUsuario.str_apellidos = apellidos;
        updateUsuario.dt_fecha_nac = fecha_nac;
        updateUsuario.bln_genero = genero;
        updateUsuario.str_correo = correo;
        updateUsuario.txt_direccion = direccion;
        updateUsuario.str_telefono = telefono;
        updateUsuario.str_celular = celular;
        await updateUsuario.save();
        res.json({
            status: "success",
            data: updateUsuario,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

//ELIMINAR UN USUARIO
export const deleteUsuario = async(req,res) => {
    const {cedula} = req.params;   
    try {
        const updateUsuario = await Usuarios.findOne({
            where: {
                str_cedula: cedula,
            },
        });
        
        updateUsuario.bln_estado= false;
        await updateUsuario.save();
        res.json({
            status: "success",
            data: updateUsuario,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};


//ACTIVAR USUARIO
export const activarUsuario = async(req,res) => {
    const {cedula} = req.params;   
    try {
        const updateUsuario = await Usuarios.findOne({
            where: {
                str_cedula: cedula,
            },
        });
        
        updateUsuario.bln_estado= true;
        await updateUsuario.save();
        res.json({
            status: "success",
            data: updateUsuario,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};