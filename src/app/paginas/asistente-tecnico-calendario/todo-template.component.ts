import { Component, OnInit, Input, TemplateRef } from '@angular/core'; 
import { Globals } from './Globals';

@Component({
    selector: 'app-todo-template',
    templateUrl: './todo-template.component.html' 
 })

export class TodoTemplateComponent implements OnInit {
    todoName:string;
    todoObj = {id:0, name:''};
    
    constructor(
        private globals: Globals
    ) {
        this.todoName = "";  
    }
  
    ngOnInit() {
        switch(this.todoObj.id){
            case 1:
                this.globals.todoLst.push(this.todoObj.name);
                break;
            case 2:
                this.globals.agreementsLst.push(this.todoObj.name);
                break;
            case 3:
                this.globals.observationsLst.push(this.todoObj.name);
                break;        
        }
    }

    completeTodoList(e) {     
        //console.log('SOY TODOLST-ID: ' + this.todoObj.id);
        //console.log('SOY TODOLST-NAME: ' + this.todoObj.name);

        //e.target.parentElement.classList.remove('done-task');
    /*    if (e.target.checked) {
          e.target.parentElement.classList.add('done-task');
          switch(this.todoObj.id){
              case 1:
                  this.globals.todoLst.push(this.todoObj.name);
                  console.log('SOY TODO-OBJ: ' + this.todoObj.name);
                  break;
              case 2:
                  this.globals.agreementsLst.push(this.todoObj.name);
                  console.log('SOY TODO-OBJ: ' + this.todoObj.name);
                  break;
              case 3:
                  this.globals.observationsLst.push(this.todoObj.name);
                  console.log('SOY TODO-OBJ: ' + this.todoObj.name);
                  break;        
          }
        } else{
            e.target.parentElement.classList.remove('done-task');
            switch(this.todoObj.id){
                case 1:
                    const indexTodo: number = this.globals.todoLst.indexOf(this.todoObj.name);
                    console.log('SOY TODO-index: ' + indexTodo);
                    if (indexTodo !== -1) {
                        this.globals.todoLst.splice(indexTodo, 1);
                    }
                    break;
                case 2:
                    const indexAgree: number = this.globals.agreementsLst.indexOf(this.todoObj.name);
                    console.log('SOY AGREE-index: ' + indexAgree);
                    if (indexAgree !== -1) {
                        this.globals.agreementsLst.splice(indexAgree, 1);
                    }
                    break;
                case 3:
                    const indexObser: number = this.globals.observationsLst.indexOf(this.todoObj.name);
                    console.log('SOY OBSER-index: ' + indexObser);
                    if (indexObser !== -1) {
                        this.globals.observationsLst.splice(indexObser, 1);
                    }
                    break;        
            }          
        }*/
    }

    deleteTodoItem(e){
        switch(this.todoObj.id){
            case 1:
                const indexTodo: number = this.globals.todoLst.indexOf(this.todoObj.name);
                if (indexTodo !== -1) {
                    this.globals.todoLst.splice(indexTodo, 1);
                }
                break;
            case 2:
                const indexAgree: number = this.globals.agreementsLst.indexOf(this.todoObj.name);
                if (indexAgree !== -1) {
                    this.globals.agreementsLst.splice(indexAgree, 1);
                }
                break;
            case 3:
                const indexObser: number = this.globals.observationsLst.indexOf(this.todoObj.name);
                if (indexObser !== -1) {
                    this.globals.observationsLst.splice(indexObser, 1);
                }
                break;        
        }
    }
}