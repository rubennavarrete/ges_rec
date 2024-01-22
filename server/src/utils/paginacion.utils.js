import { Op } from 'sequelize';

async function paginarDatos(page, size, modelo, columna, parametro) {
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;

    let filteredData = modelo;

    if (parametro === 'ACTIVO' || parametro === 'INACTIVO') {
        // Filtrar por columna y valor
        
    } else if (columna && parametro) {
        if (columna === 'str_cedula') {
            // Filtrar por str_cedula y bln_estado=true
            filteredData = filteredData.filter(item => item[columna].toLowerCase().startsWith(parametro.toLowerCase()));
            }else if (columna === 'bln_estado') {
            // Filtrar por bln_estado
            if (parametro === 'true') {
                filteredData = filteredData.filter(item => item[columna] === true);
            } else if (parametro === 'false') {
                filteredData = filteredData.filter(item => item[columna] === false);
            }
        }
    }
    filteredData.sort((a, b) => {
        if (a.bln_estado === b.bln_estado) {
            // Si los estados son iguales, ordenar por fecha de actualización de forma descendente
            return new Date(b.dt_fecha_actualizacion) - new Date(a.dt_fecha_actualizacion);
        } else {
            // Si los estados son diferentes, ordenar por estado de forma descendente
            return b.bln_estado - a.bln_estado;
        }
    });

    // Aplicar paginación con slice
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return { datos: paginatedData, total: filteredData.length };
}


export { paginarDatos };