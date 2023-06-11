
import { sequelize } from 'path/to/sequelize'; // Importa la instancia de Sequelize que estás utilizando
import { Usuarios, Perfiles } from 'path/to/models'; // Importa los modelos Usuarios y Perfiles

export const createUsuario = async (req, res) => {
  const { cedula, contraseña, nombres, apellidos, fnac, genero, correo, direccion, telefono, celular, imagen } = req.body;
  try {
    await sequelize.transaction(async (t) => {
      const usuario = await Usuarios.findOne({
        where: {
          str_cedula: cedula,
        },
        transaction: t,
      });

      if (usuario) {
        return res.status(404).json({ message: 'El usuario ya existe' });
      }

      const newUsuario = await Usuarios.create(
        {
          str_cedula: cedula,
          str_contraseña: contraseña,
          str_nombres: nombres,
          str_apellidos: apellidos,
          dt_fecha_nac: fnac,
          bln_genero: genero,
          str_correo: correo,
          str_direccion: direccion,
          str_telefono: telefono,
          str_celular: celular,
          txt_imagen: imagen,
          bln_estado: true,
        },
        { transaction: t }
      );

      await createPerfil(newUsuario.id, t); // Llama a la función createPerfil dentro de la transacción

      res.json(newUsuario);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createPerfil = async (id_usuario, transaction) => {
  const { id_rol } = req.body;
  try {
    await Perfiles.create(
      {
        int_id_rol: id_rol,
        int_id_usuario: id_usuario,
      },
      { transaction }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};
