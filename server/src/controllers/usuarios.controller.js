import { sequelize } from "../database/database.js";
import { Usuarios } from "../models/Usuarios.js";
import { createPerfil } from "./perfiles.controller.js";
import { createMedico } from "./medicos.controller.js";




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
    const { cedula, contraseña, nombres, apellidos, fnac, genero, correo, direccion, telefono, celular, imagen, id_rol } = req.body;
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
            const newUsuario = await Usuarios.create(
                {
                    str_cedula: cedula,
                    str_contraseña: contraseña,
                    str_nombres: nombres,
                    str_apellidos: apellidos,
                    dt_fecha_nac: fnac,
                    bln_genero: genero,
                    str_correo: correo,
                    str_direccion: direccion,
                    str_telefono: telefono,
                    str_celular: celular,
                    txt_imagen: imagen,
                    bln_estado: true,
                },
                { transaction: t }
            );

            // Crea el perfil
            await createPerfil(newUsuario.int_id_usuario, t, req); // Pasa el ID del usuario guardado en la variable 

            // Verifica el ID de rol y crea el médico o paciente
            if (id_rol === 2) {
                await createMedico(newUsuario.int_id_usuario, t, req);
            } else if (id_rol === 4) {
                await createPaciente(newUsuario.int_id_usuario, t, req);
            }

            res.json(newUsuario);
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



//ACTUALIZAR UN USUARIO
export const updateUsuario = async(req,res) => {
    const {cedula} = req.params;   
    const { contraseña, nombres, apellidos, fnac, genero, correo, direccion, telefono, celular, imagen} = req.body;
    try {
        const updateUsuario = await Usuarios.findOne({
            where: {
                str_cedula: cedula,
            },
        });

        updateUsuario.str_contraseña = contraseña;
        updateUsuario.str_nombres = nombres;
        updateUsuario.str_apellidos = apellidos;
        updateUsuario.dt_fecha_nac = fnac;
        updateUsuario.bln_genero = genero;
        updateUsuario.str_correo = correo;
        updateUsuario.str_direccion = direccion;
        updateUsuario.str_telefono = telefono;
        updateUsuario.str_celular = celular;
        updateUsuario.txt_imagen = imagen;

        await updateUsuario.save();
        res.json(updateUsuario);

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