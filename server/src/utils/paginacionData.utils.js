import { Op } from 'sequelize';

async function paginarDatosExtras(page, size, modelo, columna, parametro) {
    const skip = (page - 1) * size;

    let where = {}; 

    if(parametro == 'ACTIVO' || parametro == 'INACTIVO'){
        where = { [columna]: parametro };
    } else if(columna && parametro){
        where = { [columna]: { [Op.like]: `%${parametro}%` }};
    }

    const [datos, total] = await Promise.all([
        modelo.findAll({
            limit: size,
            offset: skip,
            where,  
        }),
        modelo.count({ where }),
    ]);
    return { datos, total };
}

export { paginarDatosExtras };