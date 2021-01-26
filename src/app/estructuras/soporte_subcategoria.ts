
export class SoporteSubcategoria {

    id_subcategoria: number;
    nombre:string;
    estado:string;

    constructor(data?){
        if(data){
            if(data.id)
                this.id_subcategoria = data.id;
            else
                this.id_subcategoria = data.id_subcategoria;
            this.nombre= data.nombre;
            this.estado= data.estado;
        }
    }
}