export interface Respuesta {
    codigo:string;
    mensaje: string;
    data: any;
    mensaje_error?: string;
    code_error?: string;
}