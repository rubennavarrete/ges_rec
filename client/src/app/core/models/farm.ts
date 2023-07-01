export interface Farm{
    ruc: string;
    nombre: string;
    direccion: string;
    correo: string;
    password: string;
    telefono: string;
    nombre_representante: string;
    celular_representante: string;
    str_ruc: string;
    str_nombre_institucion: string;
    txt_direccion_institucion: string;
    str_correo_institucion: string;
    str_password: string;
    str_telefono_institucion: string;
    str_nombre_representante: string;
    str_celular_representante: string;
}

export interface EditFarm{
    str_ruc: string;
    str_nombre_institucion: string;
    txt_direccion_institucion: string;
    str_correo_institucion: string;
    str_password: string;
    str_telefono_institucion: string;
    str_nombre_representante: string;
    str_celular_representante: string;
    int_id_rol: number;

}

export interface DataFarm {
    status: string;
    data: Farm;
}

