export interface loginPayload{
    email: string;
    password: string;
}

export interface registerPayload{
    name: string;
    email: string;
    password: string;
    confirmPassword: string; 
}