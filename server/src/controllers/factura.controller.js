import { Usuarios } from "../models/Usuarios.js";
import nodemailer from 'nodemailer';
import { sequelize } from "../database/database.js";

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
});

export const Factura = async (id_receta, req, res) => {
    try {
        // Obtener datos de la receta
        const recetaQuery = `
        SELECT * FROM ObtenerDatosPorReceta(:id_receta);
        `;
        const receta = await sequelize.query(recetaQuery, {
            type: sequelize.QueryTypes.SELECT,
            replacements: { id_receta },
        });

        const usuario = await Usuarios.findOne({
            where: {
                str_correo: receta[0]?.str_correo,
            },
        });
        if (!usuario) {
            return res.status(404).json({ message: "No se ha encontrado el usuario" });
        }

        console.log('HOLAAAAAAAAAAAAAAA', receta[0]?.str_correo);

        // Obtener datos de los medicamentos
        const medicamentosQuery = `
            SELECT * FROM Obtenerdatosreceta(:id_receta);
        `;
        const medicamentos = await sequelize.query(medicamentosQuery, {
            type: sequelize.QueryTypes.SELECT,
            replacements: { id_receta },
        });

        // Calcular la edad del paciente a partir de su fecha de nacimiento
        const qrCodeImageUrl = "https://www.codesyntax.com/es/blog/como-medir-el-exito-de-tus-codigos-qr/@@images/88f0dea0-0385-42c6-8caf-cabbe13dd458.png";
        var mailOptions = {
            from: process.env.EMAIL,
            to: receta[0]?.str_correo,
            subject: 'Factura de compra',
            html: `
                <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Factura Electrónica</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        font-size: 12px;
                        display: flex;
                        flex-direction: column;
                        min-height: 100vh;
                        margin-bottom: 50px;
                        position: relative;
                    }

                    header {
                        background-color: #0da1af;
                        color: #ffffff;
                        padding: 8px;
                        text-align: center;
                        width: 100%;
                    }

                    .container {
                        background-color: #ffffff;
                        padding: 16px;
                        margin: 0 auto;
                        max-width: 595px;
                        flex: 1;
                    }

                    .header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        flex-wrap: wrap;
                    }

                    .seller-info {
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                        text-align: center;
                    }

                    .seller-info h1 {
                        margin: 8px 0;
                        font-size: 1rem;
                        font-weight: bold;
                        color: #ffffff;
                    }

                    .seller-info p {
                        margin: 4px 0;
                        color: #ffffff;
                    }

                    .separator {
                        margin-top: 8px;
                        border-top: 2px solid #008080;
                    }

                    .grid-container {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 8px;
                        margin-top: 8px;
                    }

                    .grid-item p {
                        margin: 0;
                        color: #333;
                    }

                    .products {
                        margin-top: 8px;
                    }

                    .products table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 8px;
                        border-radius: 8px;
                    }

                    .products th,
                    .products td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: left;
                    }

                    .products th {
                        background-color: #f2f2f2;
                    }

                    .products td {
                        color: #333;
                    }

                    img.qr-code {
                        max-width: 70%;
                        height: 80px;
                        margin: 0 auto 20px;
                        display: block;
                    }

                    footer {
                        background-color: #fffff;
                        color: #333;
                        padding: 8px;
                        text-align: center;
                        width: 100%;
                        display: block;
                        bottom: 0;
                    }
                </style>
            </head>

            <body>
                <header>
                    <div class="seller-info">
                        <h1>${receta[0]?.str_nombres_medico} ${receta[0]?.str_apellidos_medico}</h1>
                        <p>RUC: ${receta[0]?.str_cedula_medico} </p>
                        <p>📞 ${receta[0]?.str_telefono_medico} 🏠 ${receta[0]?.txt_direccion_medico} ✉️ ${receta[0]?.str_correo_medico}</p>
                    </div>
                </header>
                <br>
                <div class="container">
                    <h2>Datos del Comprador:</h2>
                    <div class="grid-container">
                        <div class="grid-item">
                            <p>Nombre: ${receta[0]?.str_nombres_paciente} ${receta[0]?.str_apellidos_paciente}</p>
                            <hr class="separator">
                        </div>
                        <div class="grid-item">
                            <p>RUC: ${receta[0]?.str_cedula_medico}</p>
                            <hr class="separator">
                        </div>
                        <div class="grid-item">
                            <p>Fecha: ${new Date().toLocaleDateString()}</p>
                            <hr class="separator">
                        </div>
                        <div class="grid-item">
                            <p>Número de Factura: 2093872809328034923</p>
                            <hr class="separator">
                        </div>
                    </div>
                    <div class="products">
                        <h2>Productos:</h2>
                        <table>
                            <tr>
                                <th>Descripción</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                                <th>Total</th>
                            </tr>
                            ${medicamentos
                                .map(
                                    med => `
                                        <tr>
                                            <td>${med.str_nombre_comercial}</td>
                                            <td>${med.int_cantidad}</td>
                                            <td>${med.float_precio}</td>
                                            <td>${med.int_cantidad * med.float_precio}</td>
                                        </tr>
                                    `
                                )
                                .join('')}
                        </table>
                        <br>
                        
                    </div>
                </div>
                <img src="${qrCodeImageUrl}" alt="Código QR" class="qr-code">
                <footer>
                    <p>Factura generada electrónicamente por el sistema SAVELIFE</p>
                    <p>© ${new Date().getFullYear()} SAVELIFE. Todos los derechos reservados.</p>
                </footer>
            </body>
            </html>
            `
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                if (res) res.status(500).send(error.message);
            } else {
                console.log('Email enviado: ' + info.response);
                if (res) res.status(200).json({ message: "Se ha enviado un correo para recuperar la contraseña" });
            }
        });

        if (res) {
            res.json({
                status: "success",
            });
        }
    } catch (error) {
        console.error('Error en Factura:', error);
        if (res) {
            res.status(500).json({ error: error.message });
        }
    }
}
