
export class Ticket {

    id_ticket: number;
    id_tipo: number;
    ticket_estado: String; 
    nombre_usuario_creacion: String;                        
    apellido_usuario_creacion: String;
    email_usuario_creacion: String; 
    alias_usuario_creacion: String;
    foto_usuario_creacion: string;
    foto_usuario_atencion: string;
    nombre_usuario_atencion: String;                        
    apellido_usuario_atencion: String; 
    id_usuario_creacion: number;
    id_tipo_atencion: number;
    id_usuario_atencion: number;
    id_categoria: number;
    id_subcategoria: number;
    id_persona: number; 
    fecha_creacion: String;
    fecha_toma: String;
    fecha_finalizacion: String;                        
    categoria: String; 
    subcategoria: String;
    observacion: String;                        
    descripcion: String; 
    atendido: boolean; 
    estado: String;
    id_reunion: number;

    constructor(data?){
        
        this.id_tipo_atencion = null;
        this.id_usuario_creacion = null;
        this.id_usuario_atencion = null;
        this.id_categoria = null;
        this.id_subcategoria = null;
        this.nombre_usuario_creacion = null;
        this.descripcion = null; 
        this.fecha_toma = null;
        this.fecha_finalizacion = null;

        if(data){
            if(data.id)
                this.id_ticket = data.id;
            else
                this.id_ticket = 0;
            this.id_tipo = data.nombre;
            this.id_usuario_creacion = data.categorias;
            this.fecha_creacion = data.categorias;
            this.estado = data.estado;
        }
    }
}