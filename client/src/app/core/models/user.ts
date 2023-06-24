export interface User {
    cedula: string;
    nombres: string;
    apellidos: string;
    correo: string;
    password: string;
    fecha_nac: Date;
    genero: boolean;
    telefono: string;
    celular: string;
    direccion: string;
    rol: number;
}

export interface DataUser {
    status: string;
    data: User;
}