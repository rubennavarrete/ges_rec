export interface Medicacion {
    id_medicacion: number;
    nombre_comercial: string;
    tipo: string;
    codigo_registro: string;
    stock: number;
    precio: number;
    int_id_medicacion: number;
    str_nombre_comercial: string;
    str_forma_farmaceutica: string;
    str_cod_registro: string;
    int_stock: number;
    float_precio: number;
}

export interface MedicacionResponse {
    status: string;
    message: string;
    data: Medicacion [];
}

export interface EditMedicacion {
    int_id_medicacion: number;
    str_nombre_comercial: string;
    str_forma_farmaceutica: string;
    str_cod_registro: string;
    int_stock: number;
    float_precio: number;

}