import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Soporte } from 'src/app/estructuras/Soporte';
import { Ticket } from 'src/app/estructuras/Ticket';
import { Usuario } from 'src/app/estructuras/usuario';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import { SoporteService } from 'src/app/servicio/Soporte.service';

@Component({
  selector: 'app-hd-customer-list',
  templateUrl: './hd-customer-list.component.html',
  styleUrls: ['./hd-customer-list.component.scss']
})
export class HdCustomerListComponent implements OnInit {
  public size = 'md-view';
  public showView = false;
  public basicContent: string;
  public radioAct: string = "";
  public statusImage:string;
  public startDateStr:string = '';
  public endDateStr:string = '';
  public startDateLng:number = 0;
  public endDateLng:number = 0;
  public ticketType: boolean;

  public ticket: Ticket = new Ticket();
  public ticketSearch: Ticket = new Ticket();
  public ticketLst: Ticket[] = [];
  public ticketCategory: Soporte = new Soporte();
  public ticketSubcategory: Soporte = new Soporte();
  usuario: Usuario= Usuario.getUser();
  form = new FormGroup({entrepreneur: new FormControl('')});

  profileLst:any[] = [{id: "", nombre: ""}];
  selectedProfile:any = {id: "" , nombre: ""};
  ticketTypeLst:any[] = [{id: "", nombre: ""}];
  selectedTicketType:any = {id: "" , nombre: ""};
  statusLst:any[] = [{id: "", nombre: ""}];
  selectedStatus:any = {id: "" , nombre: ""};
  categoryLst:any[] = [{id: "", nombre: ""}];
  selectedCategory:any = {id: "" , nombre: ""};
  subcategoryLst:any[] = [{id: "", nombre: ""}];
  selectedSubcategory:any = {id: "" , nombre: ""};
  startDate:any = {day:'', month:'', year:''};
  endDate:any = {day:'', month:'', year:''};

  constructor(private soporteService: SoporteService,
    private mensajeService: MensajeService,
    private _datePipeService: DatePipe) { }

  ngOnInit() {
    this.loadProfiles();
    this.loadTicketTypes();
    this.loadStatus();
    this.loadCatalogs(1);
    this.loadSubcatalogs(1);
  }

  public pictNotLoading(event) { event.target.src = 'images/user.png'; }

  public getStatusImage(statusName: string){
    switch(statusName){
      case 'Abierto':
        return 'p3';
      case 'Tomado':
        return 'p2';
      case 'Resuelto':
        return 'p1';
      case 'Rechazado':
        return 'p5';
      default:
        return 'p3';
    }
  }

  public getURLImage(urlPicture: string){
    if(urlPicture === null)
      return "assets/images/user/avatar-5.jpg";
    else
      return urlPicture;
  }

  public getAssignedUser(ticket: Ticket){
    if(ticket.atendido)
      return ticket.nombre_usuario_atencion.split(" ")[0] + " " + ticket.apellido_usuario_atencion.split(" ")[0];
    else
      return "NADIE"; 
  }

  public getCategoryName(category: string){
    if(category === null)
      return "Sin categoria";
    else
      return category; 
  }

  public getSubcategoryName(subcategory: string){
    if(subcategory === null)
      return "Sin subcategoria";
    else
      return subcategory; 
  }

  public getDescriptionName(description: string){
    if(description === null)
      return "";
    else
      return description; 
  }

  public getFormattedDate(){
    var ddStr:string = '';
    var mmStr:string = '';
    var hrStr:string = '';
    var mnStr:string = '';
    var scStr:string = '';
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    var hour = today.getHours();
    var mint = today.getMinutes();
    var secd = today.getSeconds();

    (dd<10) ? ddStr = "0" + dd : ddStr = "" + dd;
    (mm<10) ? mmStr = "0" + mm : mmStr = "" + mm;
    (hour<10) ? hrStr = "0" + hour : hrStr = "" + hour;
    (mint<10) ? mnStr = "0" + mint : mnStr = "" + mint;
    (secd<10) ? scStr = "0" + secd : scStr = "" + secd;

    return "" + yyyy + "-" + mmStr + "-" + ddStr + " " + hrStr + ":" + mnStr + ":" + scStr;
  }

  public getLastDate(ticket: Ticket){
    switch(ticket.ticket_estado){
      case 'Abierto':
        return ticket.fecha_creacion.split(" ")[0];
      case 'Tomado':
        return ticket.fecha_toma.split(" ")[0];
      case 'Resuelto':
        return ticket.fecha_finalizacion.split(" ")[0];
      case 'Rechazado':
        return ticket.fecha_finalizacion.split(" ")[0];
      default:
        return '';
    }
  }

  public loadProfiles(){
    this.soporteService.getUserProfiles().subscribe(data=>{
      if(data.codigo == '1'){
        let defaultItem = {id: null , nombre: "ninguno"};  
        this.profileLst = data.data;
        this.profileLst.unshift(defaultItem);
      }else{
        console.log(data.mensaje);
      }
    });
  }

  public loadTicketTypes(){
    this.soporteService.getTicketByTypes().subscribe(data=>{
      if(data.codigo == '1'){
        this.ticketTypeLst = data.data;
      }else{
        console.log(data.mensaje);
      }
    });
  }

  public loadStatus(){
    let formData = new FormData();
    formData.append('datos', JSON.stringify(""));
    this.soporteService.getTicketStatus(formData).subscribe(data=>{
      if (data instanceof HttpResponse) {
        if(data.body.codigo=='1'){
          let defaultItem = {id: null , nombre: "ninguno"};  
          this.statusLst = data.body.data;
          this.statusLst.unshift(defaultItem);
        } else{
          console.log(data.body.mensaje);
        }
    }});
  }

  public loadCatalogs(id: number){
    this.ticketCategory.id = id;
    let formData = new FormData();
    formData.append('datos', JSON.stringify(this.ticketCategory));
    this.soporteService.getTicketCatalogs(formData).subscribe(data=>{
      if (data instanceof HttpResponse) {
        if(data.body.codigo=='1'){
          let defaultItem = {id: null , nombre: "ninguno"};  
          this.categoryLst = data.body.data;
          this.categoryLst.unshift(defaultItem);          
        } else{
          console.log(data.body.mensaje);
        }
    }});
  }

  public loadSubcatalogs(id: number){
    this.ticketSubcategory.id = id;
    let formData = new FormData();
    formData.append('datos', JSON.stringify(this.ticketSubcategory));
    this.soporteService.getTicketSubcatalogs(formData).subscribe(data=>{
      if (data instanceof HttpResponse) {
        if(data.body.codigo=='1'){
          let defaultItem = {id: null , nombre: "ninguno"};  
          this.subcategoryLst = data.body.data;
          this.subcategoryLst.unshift(defaultItem);
        } else{
          console.log(data.body.mensaje);
        }
    }});
  }

  public onSelectionProfileChange(selectedProfile){
    try{
      this.ticketSearch.id_usuario_creacion = selectedProfile.id;
      this.getTicketListByParamHistorical(this.ticketSearch);
    } catch(error){
      console.log(error);
    }
  }

  public onSelectionTypeChange(selectedTicketType){
    try{
      this.selectedTicketType = selectedTicketType;
    } catch(error){
      console.log(error);
    }
  }

  public onSelectionStatusChange(selectedStatus){
    try{
      this.ticketSearch.id_tipo_atencion = selectedStatus.id;
      this.getTicketListByParamHistorical(this.ticketSearch);
    } catch(error){
      console.log(error);
    }
  }

  public onSelectionCategoryChange(selectedCategory){
    try{
      this.loadSubcatalogs(selectedCategory.id);
      this.ticketSearch.id_categoria = selectedCategory.id;
      this.getTicketListByParamHistorical(this.ticketSearch);
    } catch(error){
      console.log(error);
    }
  }

  public onSelectionSubcategoryChange(selectedSubcategory){
    try{
      this.ticketSearch.id_subcategoria = selectedSubcategory.id;
      this.getTicketListByParamHistorical(this.ticketSearch);
    } catch(error){
      console.log(error);
    }
  }

  entrepreneurBrowse(newValue){
      this.getTicketListByParamHistorical(this.ticketSearch);
  }


  public getTicketListByParamHistorical(ticket: Ticket): void{   
    try{
     let formData = new FormData();
     formData.append('datos', JSON.stringify(ticket));
     this.soporteService.getTicketListByParamHistorical(formData).subscribe(data => {
       if (data instanceof HttpResponse) {
         try{
           if(data.body.codigo=='0'){
             console.log(data.body.mensaje);
           }else{
             this.ticketLst = [];
             if(data.body.data.length > 0){
               data.body.data.forEach( (element: Ticket) => {
                 this.ticketLst.push(element);
               });
             }
           }
         } catch(error){
           console.log(error);
         }
       }
     }, (err:HttpErrorResponse) => {
       console.log(err);            
     });

    } catch(error){
      console.log(error);
    }
  }  

  public isEmpty(str:string) {
    return (!str || 0 === str.length);
  }

  jsonDateToString(time){
    let newDate = '' + time.month + '/' + time.day + '/' + time.year;
    return newDate;
  }

  strDateToLong(timeStr){
    let newDate = new Date(timeStr).valueOf();
    return newDate;
  }

  formatDateReport(date) {
    return this._datePipeService.transform(date, 'yyyy-MM-dd');
  }


  startDateBrowse(newStartDate){
    try{
      this.startDate = newStartDate
      this.startDateStr = this.jsonDateToString(this.startDate);
      this.startDateStr = this.formatDateReport(new Date(this.startDateStr));
      this.startDateLng = this.strDateToLong(this.startDateStr);
      this.ticketSearch.fecha_toma = this.startDateStr;

      if(this.isEmpty(this.endDate.day)){        
        this.ticketSearch.fecha_finalizacion = null;
        this.getTicketListByParamHistorical(this.ticketSearch);
      } else{
        this.endDateStr = this.jsonDateToString(this.endDate);
        this.endDateStr = this.formatDateReport(new Date(this.endDateStr));
        this.endDateLng = this.strDateToLong(this.endDateStr);
        if(this.startDateLng <= this.endDateLng)
          this.getTicketListByParamHistorical(this.ticketSearch);
        else
         this.mensajeService.alertError(null, 'Rango fechas invalidas.');
      }
    } catch(error){
      console.log(error);
    }      
  }

  endDateBrowse(newEndDate){
    try{
      this.endDate = newEndDate; 
      this.endDateStr = this.jsonDateToString(this.endDate);
      this.endDateStr = this.formatDateReport(new Date(this.endDateStr));
      this.endDateLng = this.strDateToLong(this.endDateStr);
      this.ticketSearch.fecha_finalizacion = this.endDateStr;

      if(this.isEmpty(this.startDate.day)){
        this.ticketSearch.fecha_toma = null;
        this.getTicketListByParamHistorical(this.ticketSearch);
      } else {
        this.startDateStr = this.jsonDateToString(this.startDate);
        this.startDateStr = this.formatDateReport(new Date(this.startDateStr));
        this.startDateLng = this.strDateToLong(this.startDateStr);
        if(this.startDateLng <= this.endDateLng)
          this.getTicketListByParamHistorical(this.ticketSearch);
        else
          this.mensajeService.alertError(null, 'Rango fechas invalidas.');
      }
    } catch(error){
      console.log(error);
    }
  }

}
