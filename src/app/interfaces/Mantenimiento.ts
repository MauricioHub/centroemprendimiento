export abstract class Mantenimiento {
    lista;
    grabarControlador=true;
    abstract tabla: string;
    registro:any;
    abstract campos:string[];
    abstract camposLista:campoLista[];
    setLista(lista): void{
        this.lista = lista;
    };
    abstract grabar(registro): void;
    abstract eliminar(registro): void;
    setData(registro): void{
        this.registro=registro;
    };
}

export interface campoLista{
    attr: string;
    name: string;
}
