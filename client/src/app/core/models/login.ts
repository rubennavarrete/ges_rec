export interface DataLogin {
    status: string;
    message: string;
    token: string;
}

export interface LoginRequest{
    cedula: string;
    password: string;
}

export interface Reset {
    correo: string;
}

export interface ResetResponse {
    status: string;
    token: string;
}

export interface Change {
    password: string;
    confirm_password: string;
}

export interface ChangeResponse {
    status: string;
}