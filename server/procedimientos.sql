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

--LISTAR 1 MEDICO
CREATE OR REPLACE FUNCTION ges_recetas.listarMedico(cedula VARCHAR)
RETURNS TABLE (
    str_cedula VARCHAR,
    str_nombres VARCHAR,
    str_apellidos VARCHAR,
    str_correo VARCHAR,
    txt_direccion text,
    str_telefono VARCHAR,
    str_celular VARCHAR,
    txt_imagen text,
    str_especialidad VARCHAR
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        u.str_cedula,
        u.str_nombres,
        u.str_apellidos,
        u.str_correo,
        u.txt_direccion,
        u.str_telefono,
        u.str_celular,
        u.txt_imagen,
        m.str_especialidad
    FROM
        ges_recetas.usuarios u
    INNER JOIN
        ges_recetas.medicos m ON u.int_id_usuario = m.int_id_usuario
    WHERE
        u.str_cedula = cedula;
END;
$$ LANGUAGE plpgsql;

--LISTAR 1 PACIENTE

CREATE OR REPLACE FUNCTION ges_recetas.listarPaciente(cedula varchar)
RETURNS TABLE (
    str_cedula varchar,
    str_nombres varchar,
    str_apellidos varchar,
    str_correo varchar,
    txt_direccion text,
    str_telefono varchar,
    str_celular varchar,
    txt_imagen text,
    str_persona_responsable varchar,
    txt_alergias text,
    txt_cirugias text
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        u.str_cedula,
        u.str_nombres,
        u.str_apellidos,
        u.str_correo,
        u.txt_direccion,
        u.str_telefono,
        u.str_celular,
        u.txt_imagen,
        p.str_persona_responsable,
        p.txt_alergias,
        p.txt_cirugias
    FROM
        ges_recetas.usuarios u
    INNER JOIN
        ges_recetas.pacientes p ON u.int_id_usuario = p.int_id_usuario
    WHERE
        u.str_cedula = cedula;
END;
$$ LANGUAGE plpgsql;