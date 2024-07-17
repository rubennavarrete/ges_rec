import { sequelize } from "../database/database.js";

export const getVentas = async (req, res) => {
    try {
        const { page = 1, size = 10, parameter: columna, data: parametro, fechaInicio, fechaFin } = req.query; // Parámetros de paginación y filtrado

        // Obtén todas las ventas de la función almacenada
        const ventas = await sequelize.query('SELECT * FROM obtener_ventas_resumen()', { type: sequelize.QueryTypes.SELECT });

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

        // Filtrar por fecha de inicio y fecha de fin si se proporcionan
        if (fechaInicio) {
            const startDate = new Date(fechaInicio);
            filteredVentas = filteredVentas.filter(venta => {
                const ventaDate = new Date(venta.dt_fecha_venta);
                return ventaDate >= startDate;
            });
        }

        if (fechaFin) {
            const endDate = new Date(fechaFin);
            filteredVentas = filteredVentas.filter(venta => {
                const ventaDate = new Date(venta.dt_fecha_venta);
                return ventaDate <= endDate;
            });
        }
        console.log(fechaInicio);
        console.log('NO ME COGE',fechaFin);

        console.log(filteredVentas);

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

export const getVentaByCode = async (req, res) => {
    try {
        const { codigo } = req.params;

        const query = 'SELECT * FROM obtener_venta_completa(:codigo)';

        // Obtén la venta por código de la función almacenada
        const venta = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
            replacements: { codigo },
        });

        if (venta.length === 0) {
            return res.json({
                message: "No se encontró la venta"
            });
        }

        return res.json(venta);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


