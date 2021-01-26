import { Etapa } from './etapa';

export class Sub_programa {

    constructor(data?){
        if(data){
            this.id_programa = data.id_programa;
            this.id_sub_programa=data.id_sub_programa;
            this.nombre=data.nombre;
            this.estado=data.estado;
            this.icono=data.icono;
            this.logo=data.logo;
            this.banner=data.banner;
            this.version=data.version;
            this.sub_programa=data.sub_programa;
        }
    }

    id_programa: number;
    id_sub_programa:number;
    sub_programa: string;
    nombre:string;
    estado:string;
    icono:string;
    logo:string;
    banner:string;
    version:string;
    id_emprendedor:number;
    id_emprendimiento:number;
    id_persona:number;
    id_inscripcion?:number;
    fase:number;

    etapas: Etapa[];
}
