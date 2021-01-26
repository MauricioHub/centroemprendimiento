import { EvaluacionCriterio, EvaluacionDetalle } from './Evaluacion';

export interface Rubrica {
    id_rubrica: number;
    nombre:string;
    tipo:string;
    estado:string;
    calificacion:number;
    calificacion_min:number;
    descripcion:string;

    criterios: RubricaCriterio[];

}

export interface RubricaCriterio{
    id_rubrica_criterio:number;
    nombre:string;
    criterio:string;
    id_rubrica:number;
    id_criterio:number;
    calificacion:number;
    ponderado:number;
    descripcion:string;
    order:number;
    calificacionS:number;

    preguntas:PreguntaCriterio[];

    criterio_evaluacion?: EvaluacionCriterio;
}

export interface PreguntaCriterio{
    id_rubrica_pregunta: number;
    pregunta: string;
    nombre: string;
    id_rubrica_criterio: number;
    id_pregunta: number;
    calificacion: number;
    ponderado: number;
    orden: number;
    estado: string;
    
    calificacionS:number;

    calificaciones: CalificacionPregunta[];

    detalle?: EvaluacionDetalle;
}

export interface CalificacionPregunta{
    id: number;
    nombre: string;
    id_rubrica_criterio_pregunta: number;
    id_calificacion: number;
    calificacion: number;
    ponderado: number;
}