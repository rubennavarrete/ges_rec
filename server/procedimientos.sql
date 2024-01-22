

CREATE OR REPLACE FUNCTION ObtenerDatosReceta(id_receta INT)
RETURNS TABLE (
    int_id_receta INT,
    int_id_medicacion INT,
    str_nombre_comercial VARCHAR(255),
    str_dosis VARCHAR(255),
    str_duracion VARCHAR(255),
    str_indicacion VARCHAR(255),
    int_id_receta_med INT,
    str_cantidad VARCHAR(255)
)
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        rm.int_id_receta,
        rm.int_id_medicacion,
        m.str_nombre_comercial,
        rm.str_dosis,
        rm.str_duracion,
        rm.str_indicacion,
        rm.int_id_receta_med,
        rm.str_cantidad
    FROM 
        ges_recetas.receta_medicacion rm
    INNER JOIN 
        ges_recetas.medicaciones m ON rm.int_id_medicacion = m.int_id_medicacion
    WHERE
        rm.int_id_receta = id_receta;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM ObtenerDatosReceta(23);