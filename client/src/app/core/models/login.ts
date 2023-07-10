export interface DataLogin {
    success: boolean;
    message: string;
    token: string;
}

export interface LoginRequest{
    cedula: string;
    password: string;
}

