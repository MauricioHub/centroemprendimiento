import { SoporteSubcategoria } from './Soporte_subcategoria';

export class SoporteCategoria {

    /*subcategorias: [SoporteSubcategoria];*/
    id: number;
    nombre:string;
    estado:string;

    constructor(data?){
        if(data){
            if(data.id)
                this.id = data.id;
            else
                this.id = data.id_categoria;
            this.nombre= data.nombre;
            this.estado= data.estado;
        }
    }
}