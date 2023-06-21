export interface User {
    cedula: string;
    nombres: string;
    apellidos: string;
    correo: string;
    password: string;
    fecha_nac: string;
    genero: boolean;
    telefono: string;
    celular: string;
    direccion: string;
    rol: string;
}

export interface DataUser {
    success: boolean;
    data: User;
}