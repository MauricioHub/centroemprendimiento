import { Sub_programa } from './sub_programa';

export class Programa {

    constructor(data?){
        if(data){
            if(data.id)
                this.id_programa = data.id;
            else
                this.id_programa = data.id_programa;
            this.nombre= data.nombre;
            this.estado= data.estado;
            this.icono= data.icono;
            this.logo= data.logo;
            this.banner= data.banner;

            this.sub_programas = data.sub_programas;
        }
    }
    id_programa: number;
    nombre:string;
    estado:string;
    icono:string;
    logo:string;
    banner:string;

    sub_programas: Sub_programa[];
}
