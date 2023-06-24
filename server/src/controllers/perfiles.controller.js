import { Perfiles } from "../models/Perfiles.js";

export const getPerfiles = async (req, res) => {
    try{
        const perfiles = await Perfiles.findAll();
        res.json(perfiles);
    }catch (error){
        return res.status(500).json({message: error.message});
    }
}

export const getPerfil = async(req, res) =>{
    try {
        const {id_perfil} = req.params;
        const perfil = await Perfiles.findOne({
            where: {
                int_id_perfil:id_perfil,
            },
        });

        if(!id_perfil) return res.status(404).json({ message: "No se ha encontrado el perfil"});
        res.json(perfil)
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}

//CREAR UN PERFIL
export const createPerfil = async (id_usuario, transaction, req) => {
    const { rol } = req.body;
    try {
        await Perfiles.create(
        {
            int_id_rol: rol,
            int_id_usuario: id_usuario,
        },
        { transaction }
    );
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deletePerfil = async (req, res) => {
    try {
        const {id_perfil} = req.params;
        const deleteRowCount = await Perfiles.destroy({
            where: {
                int_id_perfil: id_perfil,
            },
        });
        res.json({
            message: "Perfil eliminado",
            count: deleteRowCount,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}

