
export class Meeting {

    HORAS_MIN_AGENDA_CAN: string;
    HORAS_MIN_AGENDA_AT: string;
    MAX_DIAS_AGENDA_AT: string;
    HORAS_MIN_REUNION_INI: string;

    constructor(data?){
        if(data){
            this.HORAS_MIN_AGENDA_CAN = data.HORAS_MIN_AGENDA_CAN;
            this.HORAS_MIN_AGENDA_AT = data.HORAS_MIN_AGENDA_AT;
            this.MAX_DIAS_AGENDA_AT = data.MAX_DIAS_AGENDA_AT;
            this.HORAS_MIN_REUNION_INI = data.HORAS_MIN_REUNION_INI;
        } else{
            this.HORAS_MIN_AGENDA_CAN = null;
            this.HORAS_MIN_AGENDA_AT = null;
            this.MAX_DIAS_AGENDA_AT = null;
            this.HORAS_MIN_REUNION_INI = null;
        }
    }
}