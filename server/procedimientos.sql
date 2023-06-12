CREATE OR REPLACE FUNCTION ges_recetas.listarpacientes()
RETURNS TABLE (
  str_cedula VARCHAR,
  str_nombres VARCHAR,
  str_apellidos VARCHAR,
  str_correo VARCHAR,
  str_celular VARCHAR,
  txt_imagen TEXT,
  str_persona_responsable VARCHAR,
  txt_alergias TEXT,
  txt_cirugias TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    usuarios.str_cedula,
    usuarios.str_nombres,
    usuarios.str_apellidos,
    usuarios.str_correo,
    usuarios.str_celular,
    usuarios.txt_imagen,
    pacientes.str_persona_responsable,
    pacientes.txt_alergias,
    pacientes.txt_cirugias
  FROM
    ges_recetas.usuarios
  INNER JOIN
    ges_recetas.pacientes ON usuarios.int_id_usuario = pacientes.int_id_usuario;
END;
$$ LANGUAGE plpgsql

--LISTAR MEDICOS

CREATE OR REPLACE FUNCTION ges_recetas.listarMedicos()
  RETURNS TABLE (
    str_cedula VARCHAR,
  	str_nombres VARCHAR,
  	str_apellidos VARCHAR,
  	str_correo VARCHAR,
  	str_celular VARCHAR,
    txt_imagen TEXT,
		str_especialidad VARCHAR
  )
AS $$
BEGIN
  RETURN QUERY
    SELECT
      usuarios.str_cedula,
      usuarios.str_nombres,
      usuarios.str_apellidos,
      usuarios.str_correo,
      usuarios.str_celular,
      usuarios.txt_imagen,
      medicos.str_especialidad
    FROM
      ges_recetas.usuarios
      INNER JOIN ges_recetas.medicos ON usuarios.int_id_usuario = medicos.int_id_usuario;
END;
$$ LANGUAGE plpgsql;
