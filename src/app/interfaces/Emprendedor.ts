import { Emprendedor } from '../estructuras/emprendedor';
import { Persona } from '../estructuras/persona';
import { Emprendimiento } from '../estructuras/emprendimiento';


export type EmprendedorInter = Emprendedor & Persona & Emprendimiento;
/*export interface EmprendedorInter extends Emprendedor{
}*/
