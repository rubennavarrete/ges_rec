import { sequelize } from "../database/database.js";
import { Usuarios } from "../models/Usuarios.js";
import { Perfiles } from "../models/Perfiles.js";

export const getUsuarios = async (req, res) => {
    try{
        const usuarios = await Usuarios.findAll();
        res.json(usuarios);
    }catch (error){
        return res.status(500).json({message: error.message});
    }
};

export const getUsuario = async(req, res) =>{
    try {
        const {cedula} = req.params;
        const usuario = await Usuarios.findOne({
            where: {
                str_cedula:cedula,
            },
        });

        if(!usuario) return res.status(404).json({ message: "No se ha encontrado el usaurio"});
        res.json(usuario)
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

export const createUsuario = async (req, res) => {
    const { cedula, contraseña, nombres, apellidos, fnac, genero, correo, direccion, telefono, celular, imagen} = req.body;
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
        await createPerfil(newUsuario.int_id_usuario, t, req); // Pasa el ID del usuario guardado en la variable 
        res.json(newUsuario);
    });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const createPerfil = async (id_usuario, transaction, req) => {
    const { id_rol } = req.body;
    try {
        await Perfiles.create(
        {
            int_id_rol: id_rol,
            int_id_usuario: id_usuario,
        },
        { transaction }
    );
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateUsuario = async(req,res) => {
    const {cedula} = req.params;
    const {usuario, contraseña, nombres, apellidos, fnac, genero, correo, direccion, telefono, image} = req.body;
    try {
        const updateUsuario = await Usuarios.findOne({
            where: {
                str_cedula:cedula,
            },
        });

        updateUsuario.str_cedula = cedula,
        updateUsuario.str_usuario = usuario,
        updateUsuario.str_contraseña = contraseña,
        updateUsuario.str_nombres = nombres,
        updateUsuario.str_apellidos = apellidos,
        updateUsuario.dt_fecha_nac = fnac,
        updateUsuario.bln_genero = genero,
        updateUsuario.str_correo = correo,
        updateUsuario.str_direccion = direccion,
        updateUsuario.str_telefono = telefono,
        updateUsuario.txt_image = image

        await updateUsuario.save();
        res.json(updateUsuario);
        
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

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