export interface Medicacion {
    id_medicacion: number;
    nombre_comercial: string;
    nombre_generico: string;
    int_id_medicacion: number;
    str_nombre_comercial: string;
    str_nombre_generico: string;
}

export interface MedicacionResponse {
    status: string;
    message: string;
    data: Medicacion [];
}

export interface EditMedicacion {
    int_id_medicacion: number;
    str_nombre_comercial: string;
    str_nombre_generico: string;
}