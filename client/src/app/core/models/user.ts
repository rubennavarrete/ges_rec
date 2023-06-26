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
    str_cedula: string;
    str_nombres: string;
    str_apellidos: string;
    str_correo: string;
    str_password: string;
    dt_fecha_nac: Date;
    bln_genero: boolean;
    str_telefono: string;
    str_celular: string;
    txt_direccion: string;
}

export interface EditUser {
    str_cedula: string;
    str_nombres: string;
    str_apellidos: string;
    str_correo: string;
    str_password: string;
    dt_fecha_nac: Date;
    bln_genero: boolean;
    str_telefono: string;
    str_celular: string;
    txt_direccion: string;
}

export interface DataUser {
    status: string;
    data: User;
}