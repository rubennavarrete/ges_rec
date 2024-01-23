

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

CREATE OR REPLACE FUNCTION obtener_medicos()
RETURNS TABLE (
    int_id_usuario INT,
    str_cedula VARCHAR(20),
    str_nombres VARCHAR(100),
    str_apellidos VARCHAR(100),
    dt_fecha_nac DATE,
    str_correo VARCHAR(100),
    txt_direccion TEXT,
    str_telefono VARCHAR(20),
    str_password VARCHAR(100),
    dt_fecha_creacion TIMESTAMP,
	dt_fecha_actualizacion TIMESTAMP,
    bln_estado BOOLEAN,
    str_celular VARCHAR(20),
    bln_genero BOOLEAN,
    str_token VARCHAR(100),
    str_especialidad VARCHAR(100),
    str_codigo_medico VARCHAR(20)
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        u.int_id_usuario,
        u.str_cedula,
        u.str_nombres,
        u.str_apellidos,
        u.dt_fecha_nac,
        u.str_correo,
        u.txt_direccion,
        u.str_telefono,
        u.str_password,
        u.dt_fecha_creacion,
		u.dt_fecha_actualizacion,
        u.bln_estado,
        u.str_celular,
        u.bln_genero,
        u.str_token,
        m.str_especialidad,
        m.str_codigo_medico
    FROM
        ges_recetas.usuarios AS u
    JOIN
        ges_recetas.medicos AS m ON u.int_id_usuario = m.int_id_usuario;
		
END;
$$ LANGUAGE plpgsql;