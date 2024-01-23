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
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Prescription</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-size: 12px;
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh; /* Establecer la altura mínima de la vista para ocupar la pantalla completa */
                }

                header,
                footer {
                    background-color: #0da1af; /* Color del header */
                    color: #ffffff; /* Color del texto en el header */
                    padding: 8px;
                    text-align: center;
                    width: 100%; /* Ocupar todo el ancho de la página */
                }

                .container {
                    background-color: #ffffff;
                    padding: 16px;
                    margin: 0 auto;
                    max-width: 595px;
                    flex: 1; /* Hacer que el contenedor principal ocupe el espacio disponible */
                }

                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                }

                .doctor-info {
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    text-align: center;
                }

                .doctor-info h1 {
                    margin: 8px 0;
                    font-size: 1rem;
                    font-weight: bold;
                    color: #ffffff;
                }

                .doctor-info p {
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

                .pill-icon {
                    color: #008080;
                    height: 20px;
                    width: 20px;
                    margin-top: 8px;
                }

                .medicamentos {
                    margin-top: 8px;
                }

                .medicamentos table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 8px;
                    border-radius: 8px; /* Bordes redondeados para la tabla */
                }

                .medicamentos th,
                .medicamentos td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                    font-family: 'Arial', sans-serif;
                }

                .medicamentos th {
                    background-color: #f2f2f2;
                }

                .medicamentos td {
                    color: #333;
                }
            </style>
        </head>

        <body>
            <header>
                <div class="doctor-info">
                    <h1>${receta[0]?.str_nombres_medico} ${receta[0]?.str_apellidos_medico}</h1>
                    <p>Código de Médico: ${receta[0]?.str_cedula_medico} </p>
                    <p>📞 ${receta[0]?.str_telefono_medico} 🏠 ${receta[0]?.txt_direccion_medico} ✉️ ${receta[0]?.str_correo_medico}</p>

                </div>
            </header>
            <br>
            <div class="container">
                <h2>Datos del Paciente:</h2>
                <div class="grid-container">
                    <div class="grid-item">
                        <p>Paciente: ${receta[0]?.str_nombres_paciente} ${receta[0]?.str_apellidos_paciente}</p>
                        <hr class="separator">
                    </div>
                    <div class="grid-item">
                        <p>Diagnóstico: ${receta[0]?.txt_diagnostico}</p>
                        <hr class="separator">
                    </div>
                    <div class="grid-item">
                        <p>Edad: ${edadPaciente}</p>
                        <hr class="separator">
                    </div>
                    <div class="grid-item">
                        <p>Fecha: ${new Date(receta[0]?.dt_fecha_creacion).toLocaleDateString()}</p>
                        <hr class="separator">
                    </div>
                </div>
                <svg class="pill-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
                    <path d="m8.5 8.5 7 7" />
                </svg>
                <div class="medicamentos">
                    <h2>Medicamentos:</h2>
                    <table>
                        <tr>
                            <th>Nombre Comercial</th>
                            <th>Nombre Genérico</th>
                            <th>Cantidad</th>
                            <th>Dosis</th>
                            <th>Indicación</th>
                            <th>Duración</th>
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
                </div>
            </div>
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
            res.json({ 
                data: pdfBase64 });
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

