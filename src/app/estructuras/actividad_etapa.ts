export interface Actividad_etapa {
    id: number;
    id_actividad_etapa?: number;
    nombre: string;
    actividad: string;
    estado: string;
    id_etapa: number;
    id_tipo_actividad;
    orden: number;
    antecesor: number;
    predecesor: number;
    hora_max: string;
    hora_min: string;
    cod_referencia: string;
    icono: string;
    logo: string;
    banner: string;
    actividad_igual: number;
    url: string;
    aprueba_etapa: string;
    id_tipo_ejecucion;
    archivo_actividad: string;
    url_archivo_actividad: string;
    boton_finalizar: string;
    boton_guardar: string;
    id_rubrica: number;
    archivo: string;
    componente:string;
    nemonico_file:string;
    cod_aplicacion_externa:string;
    cod_trama:string;
    id_actividad_padre:string;
    actividad_paralelo:string;
    metodo_api:string;
    mensaje_estado_ina:string;

    url_logo?:string;
    url_banner?:string;
    url_icono?:string;
    url_archivo?:string;
    nemonico?:string;
    mimetype?:string;
    size_max?:number;

    listaMensajes:any[];
}
