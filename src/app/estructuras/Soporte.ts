import { SoporteCategoria } from './Soporte_categoria';

export class Soporte {

    /*categorias: [SoporteCategoria];*/
    id: number;
    nombre:string;
    estado:string;

    constructor(data?){
        if(data){
            if(data.id)
                this.id = data.id;
            else
                this.id = data.id_categoria;
            this.id = data.id;
            this.nombre= data.nombre;
            this.estado= data.estado;
        }
    }
}
