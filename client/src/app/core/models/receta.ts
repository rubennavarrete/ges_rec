export interface Medicamentos {
    nombre: string;
    id_medicacion: number;
    cantidad: string;
    dosis: string;
    duracion: string;
    indicaciones: string;
    int_id_medicacion: number;
    str_nombre_comercial: string;
    str_cantidad: string;
    str_dosis: string;
    str_duracion: string;
    txt_indicaciones: string;
}


export interface Receta {
    id_paciente: number;
    id_medico: number;
    diagnostico: string;
    medicamentos: Medicamentos[];
    int_id_paciente: number;
    int_id_medico: number;
    txt_diagnostico: string;
    
}

export interface EditReceta {
    int_id_paciente: number;
    int_id_medico: number;
    txt_diagnostico: string;
}



export interface RecetaResponse {
    status: string;
    message: string;
    data: Receta;
}


