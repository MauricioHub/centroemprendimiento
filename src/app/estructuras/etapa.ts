export interface Etapa {

    id?:number;
    id_etapa?: number;
    id_sub_programa:number;
    nombre:string;
    etapa:string;
    estado:string;
    icono:string;
    logo:string;
    banner:string;
    inicio:string;
    fin:string;
    orden:number;
    antecesor:number;
    predecesor:number;
    img1:string;
    plan_trabajo:string;

    url_icono?:string;
    url_logo?:string;
    url_banner?:string;
    url_img1?:string;
    url_plan_trabajo?:string;
}
