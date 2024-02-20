export interface Medicamentos {
    nombre: string;
    id_medicacion: number;
    cantidad: number;
    vendidos: number;
    dosis: string;
    tipo: string;
    indicaciones: string;


    int_id_medicacion: number;
    str_nombre_comercial: string;
    int_cantidad: number;
    int_vendidos: number;
    str_dosis: string;
    str_tipo: string;
    txt_indicaciones: string;
}


export interface Receta {
    id_receta: number;
    id_paciente: number;
    id_medico: number;
    diagnostico: string;
    cie: string;
    nota: string;
    medicamentos: Medicamentos[];
    int_id_receta: number;
    int_id_paciente: number;
    int_id_medico: number;
    txt_diagnostico: string;
    str_cie: string;
    txt_nota: string;
    
}

export interface EditReceta {
    int_id_receta:number;
    int_id_paciente: number;
    int_id_medico: number;
    txt_diagnostico: string;
    str_cie: string;
    txt_nota: string;
}



export interface RecetaResponse {
    status: string;
    message: string;
    data: Receta;
}


export interface MedicacionResponse{
    data:any;
}


