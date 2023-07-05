import { sequelize } from "../database/database.js";
import { Usuarios } from "../models/Usuarios.js";
import { createPerfil } from "./perfiles.controller.js";
import { createMedico } from "./medicos.controller.js";
import { createPaciente } from "./pacientes.controller.js";
import bcrypt from "bcrypt";



//RECIBIR TODOS LOS USUARIOS
export const getUsuarios = async (req, res) => {
    try{
        const usuarios = await Usuarios.findAll();
        res.json(usuarios);
    }catch (error){
        return res.status(500).json({message: error.message});
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
                    bln_estado: true,
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
    const { password, nombres, apellidos, fnac, genero, correo, direccion, telefono, celular} = req.body;
    try {
        const updateUsuario = await Usuarios.findOne({
            where: {
                str_cedula: cedula,
            },
        });
        const hashedPasss = await bcrypt.hash(password, 10);
        updateUsuario.str_password = password;
        updateUsuario.str_nombres = nombres;
        updateUsuario.str_apellidos = apellidos;
        updateUsuario.dt_fecha_nac = fnac;
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
export const deleteUsuario = async (req, res) => {
    try {
        const {cedula} = req.params;
        const deleteRowCount = await Usuarios.destroy({
            where: {
                str_cedula: cedula,
            },
        });
        res.json({
            message: "Usuario eliminado",
            count: deleteRowCount,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}