import { Usuarios } from "../models/Usuarios.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import  { jwtVariables } from "../config/variables.config.js"
import { sequelize } from "../database/database.js";
import { Farmacias } from "../models/Farmacias.js";


export const login = async (req, res) => {
    const { cedula, password } = req.body;
    let usuario, credenciales = [];

    // SI NO EXISTE EL USUARIO
    if (cedula.length > 10) {
        // Buscar en la tabla de Farmacias
         usuario = await Farmacias.findOne({
          where: {
            str_ruc: cedula,
          },
        });
      } else {
        // Buscar en la tabla de Usuarios
         usuario = await Usuarios.findOne({
          where: {
            str_cedula: cedula,
          },
        });
      }

    if (!usuario)
        return res.status(404).json({ message: "No se ha encontrado el usuario" });

        console.log('Usuario',usuario);

    // VALIDAR CONTRASEÑA
    const passwordValid = await bcrypt.compare(password, usuario.str_password);
    if (usuario.bln_estado == false){
        return res.status(400).json({ message: "Usuario Inactivo"});
    }else if (!passwordValid){
        return res.status(401).json({ message: "Contraseña incorrecta" });
        }else{
            const {cedula} = req.body;
            if(cedula.length <= 10){
                const query = `SELECT * FROM obtener_info_usuario_por_cedula(:cedula)`;
                credenciales = await sequelize.query(query, {
                    replacements: {cedula}, // Reemplaza 'valor_de_cedula_desde_front' con el valor real de la cédula desde el front
                    type: sequelize.QueryTypes.SELECT,
                });
            }else{
                const query = `SELECT * FROM obtener_info_farmacia_por_ruc(:cedula);`;
                credenciales = await sequelize.query(query, {
                    replacements: {cedula}, // Reemplaza 'valor_de_cedula_desde_front' con el valor real de la cédula desde el front
                    type: sequelize.QueryTypes.SELECT,
                });
            }

            const primeraCredencial = credenciales[0];

            // CREAR TOKEN
            const usuarioToken = {
                id_usuario: primeraCredencial.id_usuario,
                cedula: primeraCredencial.cedula,
                rol: primeraCredencial.nombre_rol,
            };

           
            //console.log('Usuario Token',usuarioToken)
            const token = jwt.sign(usuarioToken, jwtVariables.jwtSecret,
                //process.env.SECRET_KEY || 'secretkey',
                {
                expiresIn: "7d", // Token y cookie expiran en 12 horas
                }
            );

            res.cookie('token', token, {
                httpOnly: false, // La cookie solo es accesible a través de HTTP
                maxAge: 12 * 60 * 60 * 1000, // Tiempo de expiración de la cookie en milisegundos (12 horas)
                secure: true, // Solo se envía la cookie a través de conexiones HTTPS
                sameSite: 'none', // Restricción estricta de envío de cookies en solicitudes cruzadas
            });

            res.json({ 
                message: "Usuario logueado correctamente",
                status: 'success',
                token,
            });
        }

    

    

    

}
