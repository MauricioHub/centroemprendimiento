import { Persona } from './persona';
import { Emprendimiento } from './emprendimiento';
import { Sub_programa } from './sub_programa';
import { Etapa } from './etapa';
import { Actividad_edicion } from './actividad_edicion';
import { Actividad_etapa } from './actividad_etapa';

export class Inscripcion {

    constructor(data?){
        if(data){
            this.id_persona=data.id_persona;
            this.id_edicion=data.id_edicion;
            this.id_interes_centro_emprendimiento=data.id_interes_centro_emprendimiento;
            this.fase_asignada=data.fase_asignada;
            this.fase=data.fase;
            this.id_emprendedor=data.id_emprendedor;
            this.id_emprendimiento=data.id_emprendimiento;
            this.emprendimiento = data.emprendimiento;
            this.etapas = data.etapas;
            this.actividades = data.actividades;
            this.sub_programa = data.sub_programa;
            this.pasoEtapa = data.pasoEtapa;
        }
    }

    id_persona:number;
    id_edicion:number;
    id_interes_centro_emprendimiento:number;
    fase_asignada:number;
    fase:number;
    id_emprendedor:number;
    id_emprendimiento:number;
    pasoEtapa:string;

    persona:Persona;
    emprendedor:Emprendimiento;
    emprendimiento:Emprendimiento;
    actividades: Actividad_inscripcion[];
    sub_programa: Sub_programa;
    etapas: Etapa[];
    etapa: Etapa;
    levantarHome:boolean = false;
    inscripcionEtapa:any;
}

export type Actividad_inscripcion = Actividad_etapa & Etapa & Actividad_edicion;