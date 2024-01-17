import { sequelize } from "../database/database.js";
import fs from 'fs';
import pdf from 'html-pdf';

export const pdfReceta = async (req, res) => {
    const { id_receta } = req.params;

    try {
        // Obtener datos de la receta
        const recetaQuery = `
            SELECT * FROM ObtenerDatosPorReceta(:id_receta);
        `;
        const receta = await sequelize.query(recetaQuery, {
            type: sequelize.QueryTypes.SELECT,
            replacements: { id_receta },
        });

        // Obtener datos de los medicamentos
        const medicamentosQuery = `
            SELECT * FROM ObtenerMedicamentosPorReceta(:id_receta);
        `;
        const medicamentos = await sequelize.query(medicamentosQuery, {
            type: sequelize.QueryTypes.SELECT,
            replacements: { id_receta },
        });

        // Calcular la edad del paciente a partir de su fecha de nacimiento
        const fechaNacimientoPaciente = receta[0]?.dt_fecha_nac_paciente;
        const edadPaciente = fechaNacimientoPaciente ? calcularEdad(new Date(fechaNacimientoPaciente)) : '';

        // Construir el HTML del documento
        const html = `
            <html>
                <head>
                    <style>
                        body {
                            font-family: 'Arial', sans-serif;
                        }
                        h1, h2, h3 {
                            text-align: center;
                            color: #333; /* Cambiar color del texto */
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-bottom: 20px;
                        }
                        table, th, td {
                            border: 1px solid #ddd;
                        }
                        th, td {
                            padding: 10px;
                            text-align: left;
                            font-family: 'Arial', sans-serif; /* Cambiar fuente */
                        }
                        th {
                            background-color: #f2f2f2; /* Cambiar color de fondo de encabezado */
                        }
                        td {
                            color: #333; /* Cambiar color del texto en celdas de datos */
                        }
                        #pacienteNombre {
                            font-weight: bold;
                            color: #008080; /* Cambiar color del nombre del paciente */
                        }
                        #medicoNombre {
                            font-weight: bold;
                            color: #800080; /* Cambiar color del nombre del médico */
                        }
                    </style>
                </head>
                <body>
                    <h1>Receta Médica</h1>

                    <h2>Datos del Médico:</h2>
                    <p>ID Medico: ${receta[0]?.int_id_medico}</p>
                    <p>Cedula Medico: ${receta[0]?.str_cedula_medico}</p>
                    <p id="medicoNombre">Nombres Medico: ${receta[0]?.str_nombres_medico} ${receta[0]?.str_apellidos_medico}</p>
                    <!-- Eliminada la fecha de nacimiento del médico -->

                    <h2>Datos del Paciente:</h2>
                    <table>
                        <tr>
                            <th>Cedula</th>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Edad</th> <!-- Cambiada etiqueta -->
                        </tr>
                        <tr>
                            <td>${receta[0]?.str_cedula_paciente}</td>
                            <td id="pacienteNombre">${receta[0]?.str_nombres_paciente}</td>
                            <td>${receta[0]?.str_apellidos_paciente}</td>
                            <td>${edadPaciente}</td>
                        </tr>
                    </table>

                    <h2>Medicamentos:</h2>
                    <table>
                        <tr>
                            <th>Nombre Comercial</th>
                            <th>Nombre Generico</th>
                            <th>Cantidad</th>
                            <th>Dosis</th>
                            <th>Indicacion</th>
                            <th>Duracion</th>
                        </tr>
                        ${medicamentos
                            .map(
                                med => `
                                <tr>
                                    <td>${med.str_nombre_comercial}</td>
                                    <td>${med.str_nombre_generico}</td>
                                    <td>${med.str_cantidad}</td>
                                    <td>${med.str_dosis}</td>
                                    <td>${med.str_indicacion}</td>
                                    <td>${med.str_duracion}</td>
                                </tr>
                            `
                            )
                            .join('')}
                    </table>
                </body>
            </html>
        `;

        // Opciones para el PDF
        const options = { format: 'Letter' };

        // Crear el PDF y guardarlo en un archivo
        pdf.create(html, options).toFile('receta.pdf', (err, _) => {
            if (err) {
                console.error('Error al generar el PDF:', err);
                return res.status(500).json({ message: 'Error al generar el PDF' });
            }

            console.log('El PDF se ha guardado correctamente en: receta.pdf');
            // Convertir el archivo PDF a base64 y enviarlo en la respuesta
            const pdfBase64 = fs.readFileSync('receta.pdf', 'base64');
            res.json({ pdfBase64 });
        });
    } catch (error) {
        console.error('Error al generar el PDF:', error);
        res.status(500).json({ message: 'Error al generar el PDF' });
    }
};

// Función para calcular la edad a partir de la fecha de nacimiento
function calcularEdad(fechaNacimiento) {
    const ahora = new Date();
    let edad = ahora.getFullYear() - fechaNacimiento.getFullYear();
    const mesActual = ahora.getMonth() + 1;
    const mesNacimiento = fechaNacimiento.getMonth() + 1;

    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && ahora.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }

    return edad;
}

