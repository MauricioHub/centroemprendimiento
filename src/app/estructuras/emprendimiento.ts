export class Emprendimiento {
    id_emprendimiento: number;
    id_emprendedor: number;
    id_persona: number;
    nombre: string;
    nombre_emprendimiento: string;
    id_etapa_emprendimiento: number;
    cant_socios: number;
    emprendimiento_formalizado: string;

    etapa: number;
    estado: string = 'I';
    estado_ce: string = 'I';
    is_ce: number = 1;
    is_mercado: number = 0;
    desea_formalizarse: string;

    ruc_rise: string;
    persona: string;
    opera_ruc_rise: string;
    producto: string;
    descripcion_emprendimiento: string;
    foto_producto1: string;
    foto_producto2: string;
    dispuesto_obtener_ruc_rise: string;
    razon_social: string;
    nombre_comercial: string;
    id_tipo_persona_societaria: number;
    otra_persona_societaria: string;
    url_foto_producto1: string;
    url_foto_producto2: string;
    tiene_facturacion_electronica: string;
    telefono_whatsapp: string;

    id_tipo_emprendimiento: number;
    numero_labora: string;//
    venta_mensual: string;
    ganancia_anual: string;
    id_lugar_comercializacion: number;//
    cant_tipo_producto: string;
    id_canal_venta: number;//
    otra_empresa: string;//
    id_empresa_delivery: number;//
    utiliza_plataforma_electronica: string;
    posee_cuenta_bancaria: string;
    realizado_prestado: string;
    id_forma_capital: number;
    id_sector_crediticio: number;
    direccion: string;//
    direccion_url: string;//

    archivo_ci: string;
    url_archivo_ci: string;
    archivo_permiso_funcionamiento: string;
    url_archivo_permiso_funcionamiento: string;
    archivo_registro_sanitario: string;
    url_archivo_registro_sanitario: string;
    archivo_productos: string;
    url_archivo_productos: string;
    archivo_ruc_rise: string;
    url_archivo_ruc_rise: string;
    archivo_impuesto_renta: string;
    url_archivo_impuesto_renta: string;
    archivo_iess: string;
    url_archivo_iess: string;
    archivo_nombramiento: string;
    url_archivo_nombramiento: string;
    archivo_cuenta_bancaria: string;
    url_archivo_cuenta_bancaria: string;
    email: string;

    completado: number;

    listaRedesSociales: any[];
    listaActividadesComplentarias: any[];
    listaEmpresaDelivery: any[];//
    listaLugarComercializacion: any[];
    listaCanalVentas: any[];
    listaTipoFinancimientoConvencional: any[];
    listaTipoFinancimientoNoConvencional: any[];
}