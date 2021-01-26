export interface Evaluacion {
    id_evaluacion?: number;
    concepto?: string;
    id_rubrica?: number;
    calificacion?: number;
    aprobado?: string;
    id_evaluador?: number;
    id_evaluado?: number;
    id_usuario_evaluador?: number;
    id_reunion?: number;
    id_emprendimiento?: number;
    id_emprendedor?: number;
    id_mentor?: number;
    id_asistencia_tecnica?: number;
    mensaje?: string;

    criterios?: EvaluacionCriterio[];
}

export interface EvaluacionCriterio{
    id_evaluacion_criterio?: number;
    id_evaluacion?: number;
    id_rubrica_criterio: number;
    calificacion_conf: number;
    ponderado_conf: number;
    calificacion_total: number;
    calificacion_pon: number;

    detalles?: EvaluacionDetalle[];
}

export interface EvaluacionDetalle{
    id_evaluacion_criterio?: number;
    id_rubrica_pregunta: number;
    calificacion_conf: number;
    ponderado_conf: number;
    calificacion?: number;
    ponderado?: number;
    id_calificacion?: number;
}