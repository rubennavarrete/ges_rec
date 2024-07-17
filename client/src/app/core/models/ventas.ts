
export interface Venta {
    dt_fecha_venta: string;
    str_cod_venta: string;
    float_total: number;


    str_nombre_comercial: string;
    str_forma_farmaceutica : string;
    int_vendidos : number;
    float_subtotal : number;
    float_precio : number;
}


export interface DetalleVenta  {
    data:Venta[];
}




export interface VentaResponse {
    status: string;
    message: string;
    data: Venta [];
}