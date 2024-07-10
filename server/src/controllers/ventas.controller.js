import { sequelize } from "../database/database.js";


export const getVentas = async (req, res) => {
    try {
        const { page = 1, size = 10, parameter: columna, data: parametro } = req.query; // Parámetros de paginación y filtrado

        // Obtén todas las ventas de la función almacenada
        const ventas = await sequelize.query('SELECT * FROM ges_recetas.obtener_ventas_resumen()', { type: sequelize.QueryTypes.SELECT });

        if (ventas.length === 0) {
            return res.json({
                status: false,
                message: "No se encontraron ventas"
            });
        }

        // Filtrar los datos manualmente si se proporcionan columna y parámetro
        let filteredVentas = ventas;

        if (columna && parametro) {
            filteredVentas = ventas.filter(venta => 
                venta[columna] && venta[columna].toString().toLowerCase().includes(parametro.toLowerCase())
            );
        }

        // Implementar paginación manualmente
        const total = filteredVentas.length;
        const offset = (page - 1) * size;
        const paginatedVentas = filteredVentas.slice(offset, offset + size);

        return res.json({
            status: true,
            message: "Ventas obtenidas correctamente",
            body: paginatedVentas,
            total: total
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


