
export interface Venta {
    dt_fecha_venta: string;
    str_cod_venta: string;
    float_total: number;
}


export interface VentaResponse {
    status: string;
    message: string;
    data: Venta;
}