export interface Medicamentos {
    nombre: string;
    id_medicacion: number;
    cantidad: string;
    dosis: string;
    duracion: string;
    indicaciones: string;
}


export interface Receta {
    id_paciente: number;
    id_medico: number;
    diagnostico: string;
    medicamentos: Medicamentos[];
}


export interface RecetaResponse {
    status: string;
}

