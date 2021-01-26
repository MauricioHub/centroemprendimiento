import { environment } from 'src/environments/environment';
import { General } from './General';

export class Usuario {

    public static getUser(): Usuario{
        return new Usuario(JSON.parse(sessionStorage.getItem(environment.usuario)));
    }

    public static setUser(usuario): void{
        if(!usuario){
            return;
        }
        if(typeof usuario == 'string'){
            usuario = JSON.parse(usuario);            
        }
        if(typeof usuario ==  "object"){
            if(usuario.url_foto){
                usuario.url_foto = usuario.url_foto + '?v=' + General.generateId();
            }
            usuario = JSON.stringify(usuario);
        }
        sessionStorage.setItem(environment.usuario, usuario);
    }

    constructor(data?: any) {
        if (data) {
            if (data["id"])
                this.id_usuario = data["id"];

            this.usuario = data["usuario"];
            this.foto = data["foto"];
            if (data["url_foto"])
                this.url_foto = data["url_foto"];
            else
                this.url_foto = "images/user.png";
            this.nombre = data['nombre'];
            this.apellido = data['apellido'];
            this.data = data;
            this.id_persona = data['id_persona']
            this.emprendedor = data['emprendedor']
            this.mentor = data['mentor']
            this.administrador = data['administrador']
            this.asistencia_tecnica = data['asistencia_tecnica']
            this.mesa_servicio = data['mesa_servicio']
        }
    }
    id: string;
    usuario: string;
    password: string;
    id_usuario: number;
    id_institucion: number;
    foto: string;
    url_foto: string;
    nombre: string;
    apellido: string;
    correo: string;
    data: object;
    id_persona:number;
    estado: string;
    asistencia_tecnica: number;
    emprendedor: number;
    mentor: number;
    administrador: number;
    mesa_servicio:number;

    get(atrr) {
        return this.data[atrr];
    }

    getName() {
        if (this.nombre && this.apellido) {
            return this.nombre.split(" ")[0] + ' ' + this.apellido.split(" ")[0];
        }
        if (this.nombre)
            return this.nombre.split(" ")[0];
        return "Sin Usuario";
    }
}