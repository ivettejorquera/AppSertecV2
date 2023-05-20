export interface Cliente {
    nombre: string;
    direccion: string
    correo: string;
    numero: number;
    id: string;
    fecha: Date;
}

export interface Perfil {
    uid: string;
    email: string;
    celular: string;
    nombre: string;
    foto: string;
    password: string;
}