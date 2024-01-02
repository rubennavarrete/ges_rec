import { Op } from 'sequelize';

async function paginarDatos(page, size, modelo, columna, parametro) {
    const skip = (page - 1) * size;
    let where = {}; 

    console.log('PAPI SI',columna, parametro);

    if(parametro == 'ACTIVO' || parametro == 'INACTIVO'){
        where = { [columna]: parametro };
    } else if(columna && parametro){
        where = { [columna]: { [Op.iLike]: `${parametro}%` }};
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

export { paginarDatos };