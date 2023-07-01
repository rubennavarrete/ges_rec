export interface Receta {
    nombre: string;
    dosis: string;
    duracion: string;
    indicaciones: string;
}


export interface RecetaResponse {
    status: string;
    data: Receta[];
    message: string;
}