import { Farmacias } from "../models/Farmacias.js";

export const getFarmacias = async (req, res) => {
    try{
        const farmacias = await Farmacias.findAll();
        res.json(farmacias);
    }catch (error){
        return res.status(500).json({message: error.message});
    }
};

export const getFarmacia = async(req, res) =>{
    try {
        const {RUC} = req.params;
        const farmacia = await Farmacias.findOne({
            where: {
                RUC,
            },
        });

        if(!farmacia) return res.status(404).json({ message: "No se ha encontrado la farmacia afiliada"});
        res.json(farmacia)
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

export const createFarmacia = async(req,res) => {
    const {RUC, nom_inst, dir_inst, correo_inst, telefono_inst, logo} = req.body;
    try {
        const newFarmacia = await Farmacias.create({ 
            RUC, 
            nom_inst, 
            dir_inst, 
            correo_inst, 
            telefono_inst, 
            logo,
        });

        res.json(newFarmacia);
        
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

export const updateFarmacia = async(req,res) => {
    const {RUC} = req.params;
    const {nom_inst, dir_inst, correo_inst, telefono_inst, logo} = req.body;
    try {
        const updateFarmacia = await Farmacias.findOne({
            where: {
                RUC,
            },
        });

        updateFarmacia.RUC = RUC,
        updateFarmacia.nom_inst = nom_inst, 
        updateFarmacia.dir_inst = dir_inst, 
        updateFarmacia.correo_inst = correo_inst, 
        updateFarmacia.telefono_inst = telefono_inst, 
        updateFarmacia.logo = logo, 

        await updateFarmacia.save();
        res.json(updateFarmacia);
        
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

export const deleteFarmacias = async (req, res) => {
    const {RUC} = req.params;
    try{
        const farmacia = await Farmacias.destroy({
            where: {
                RUC,
            },
        });
        res.sendStatus(204);
    }catch (error){
        return res.status(500).json({message: error.message});
    }
};