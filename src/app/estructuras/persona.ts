export class Persona {

    constructor(persona?) {
        if (persona) {
            let data = persona;
            if(data.persona)
                data = data.persona; 
            //if(data.id_persona)
                this.id_persona = data.id_persona;
            /*else
                this.id_persona = data.id;*/

            this.id = data.id;
            this.id_usuario = data.id_usuario;
            this.apellido = data.apellido;
            this.nombre = data.nombre;
            this.fecha_nacimiento = data.fecha_nacimiento;
            this.id_genero = data.id_genero;
            this.id_ciudad = data.id_ciudad;
            this.id_provincia = data.id_provincia;
            this.email = data.email;
            this.telefono = data.telefono;
            this.telefono_fijo = data.telefono_fijo;
            this.id_situacion_laboral = data.id_situacion_laboral;
            this.tipo_identificacion = data.tipo_identificacion;
            this.identificacion = data.identificacion;
            this.id_nivel_academico = data.id_nivel_academico;
            this.direccion = data.direccion;
            this.perfil = data.perfil;
            this.frase_perfil = data.frase_perfil;
            this.cv = data.cv;
            this.uso_datos = data.uso_datos;
            this.url_foto = data.url_foto;

            this.genero = data.genero;
            this.nivel_academico = data.nivel_academico;
            this.situacion_laboral = data.situacion_laboral;
            this.ciudad = data.ciudad;
            this.aceptar_uso_datos = data.aceptar_uso_datos;
            this.id_interes_centro_emprendimiento = data.id_interes_centro_emprendimiento;
        }
    }

    id: number;
    id_persona: number;
    id_usuario: number;
	nombre: string;
    apellido: string;
    fecha_nacimiento: string;
    id_genero: number;
    genero: string;
    id_provincia: number;
    id_ciudad: number;
    ciudad: string;
    provincia: string;
    email: string;
    telefono: string;
    id_situacion_laboral: number;
	situacion_laboral: string;
    tipo_identificacion: string;
    identificacion: string;
    id_nivel_academico: number;
	nivel_academico: string;
    direccion: string;
    id_ciudad_domicilio: number;
    ciudad_domicilio: string;
    telefono_fijo: string;
    perfil: string;
    frase_perfil: string;
    cv: string;
    uso_datos: string;
    url_foto: string;
    aceptar_uso_datos: boolean;
    id_interes_centro_emprendimiento: number;
    tipo_persona: string;
    redes_sociales=[];
    intereses=[];
}