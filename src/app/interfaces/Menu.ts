export interface Menu {
    id_menu?: number;
    nombre: string;
    id_menu_padre?: number;
    url?: string;
    estado?: string;
    orden: number;
    id_aplicacion: number;
    menu_padre?: string;
    icono?: string;
}
