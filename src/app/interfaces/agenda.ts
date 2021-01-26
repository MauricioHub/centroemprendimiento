export interface Agenda {
    id_agenda: number;
    id_persona: number;
    persona1: string;
    id_persona2: number;
    persona2: string;
    tipo_agenda?: string;
    tipo?: string;
    fecha_agenda?: string;
    fecha?:string;
    hora_inicio_agenda: string;
    hora_inicio?:string;
    hora_fin_agenda: string;
    hora_fin?:string;
    hora_inicio_reunion: string;
    hora_fin_reunion: string;
    estado_agenda: string;
    estado_reunion: string;
    estado?:string;
    tema_agenda: string;
    tema?:string;
    id_evento: number;
    color?:string;

    id_reunion?:number;
    telefono?:string;
}
