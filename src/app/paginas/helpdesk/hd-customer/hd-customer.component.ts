import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { SoporteService } from 'src/app/servicio/Soporte.service';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import { Soporte } from 'src/app/estructuras/Soporte';
import { Ticket } from 'src/app/estructuras/Ticket';
import { Usuario } from 'src/app/estructuras/usuario';

@Component({
  selector: 'app-hd-customer',
  templateUrl: './hd-customer.component.html',
  styleUrls: ['./hd-customer.component.scss']
})
export class HdCustomerComponent implements OnInit {
  public size = 'md-view';
  public showView = false;
  public basicContent: string;
  public radioAct: string = "";
  public statusImage:string;

  public radioAttLst:boolean[] = [];
  public customers: [string] = [""];
  public ticket: Ticket = new Ticket();
  public ticketSearch: Ticket = new Ticket();
  public ticketLst: Ticket[] = [];
  public attTicketLst: Ticket[] = [];
  public ntAttTicketLst: Ticket[] = [];
  public flagEType: boolean[];
  public ticketCategory: Soporte = new Soporte();
  public ticketSubcategory: Soporte = new Soporte();
  usuario: Usuario= Usuario.getUser();
  form = new FormGroup({entrepreneur: new FormControl('')});
  formSelect: FormGroup;

  ticketTypeLst:any[] = [{id: "", nombre: ""}];
  selectedTicketType:any = {id: "" , nombre: ""};
  statusLst:any[] = [{id: "", nombre: ""}];
  selectedStatus:any = {id: "" , nombre: ""};
  categoryLst:any[] = [{id: "", nombre: ""}];
  selectedCategory:any = {id: "" , nombre: ""};
  subcategoryLst:any[] = [{id: "", nombre: ""}];
  selectedSubcategory:any = {id: "" , nombre: ""};
  selectedDate;

  constructor(private soporteService: SoporteService,
              private mensajeService: MensajeService,
              private fb: FormBuilder) {
            this.statusImage = "";
  }

  ngOnInit() {
    let defaultStatus:any = {id: "1" , nombre: "Abierto"};
    this.selectedStatus = defaultStatus;
    this.basicContent = '<p>Hello...</p>';
    this.flagEType = [];
    this.loadFlagEType(0, true);
    this.loadTicketTypes();
    this.loadStatus();
    this.loadCatalogs(1);
    this.loadSubcatalogs(null);
    this.onSelectionStatusChange(this.selectedStatus);
  }
 
  loadFlagEType(position: number, value: boolean): void{
    var p:number = 0; 
    for(p=0; p<3; p++){
      if(p == position)
        this.flagEType[p] = value;
      else
        this.flagEType[p] = !value;  
    }
  }

  changeParamEType(e) {
    switch(e.target.value){
      case 'cedula':
        this.loadFlagEType(0, true);
        break;
      case 'nombre':
        this.loadFlagEType(1, true);
        break;
      case 'email':
        this.loadFlagEType(2, true);
        break;    
     }
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

  public isDeskUser(){
    if(this.usuario.mesa_servicio === 1){
        return true;
      } else{
        return false;
      }
  }

  public getAssignedUser(ticket: Ticket){
    if(ticket.nombre_usuario_atencion === null)
      return "NADIE";
    else  
      return ticket.nombre_usuario_atencion + " " + ticket.apellido_usuario_atencion;
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


  public updateTicketAttended(ticket:Ticket){
    this.ticket.id_ticket = ticket.id_ticket;
    this.ticket.id_usuario_atencion = this.usuario.id_usuario;
    this.ticket.fecha_toma = this.getFormattedDate();

    let formData = new FormData();
    formData.append('datos', JSON.stringify(this.ticket));
    this.soporteService.updateAttendedWithForm(formData).subscribe(data => {
      if (data instanceof HttpResponse) {
        if(data.body.codigo=='0'){
          this.mensajeService.alertError(null,data.body.mensaje);
        }else{
          this.getTicketListByParam(this.ticketSearch);
          this.mensajeService.alertOK(null,data.body.mensaje);
        }
      }
    });
  }

  public doneTicketAttended(ticket:Ticket){
    if(ticket.observacion === undefined){
      ticket.observacion = "";
    }
    ticket.id_usuario_atencion = this.usuario.id_usuario;
    ticket.fecha_finalizacion = this.getFormattedDate();

    let formData = new FormData();
    formData.append('datos', JSON.stringify(ticket));
    this.soporteService.doneAttendedWithForm(formData).subscribe(data => {
      if (data instanceof HttpResponse) {
        if(data.body.codigo=='0'){
          this.mensajeService.alertError(null,data.body.mensaje);
        }else{
          this.getTicketListByParam(this.ticketSearch);
          this.mensajeService.alertOK(null,data.body.mensaje);
        }
      }
    });
  }

  public refuseTicketAttended(ticket:Ticket){
    if(ticket.observacion === undefined){
      ticket.observacion = "";
    }

    if(ticket.observacion != ""){
      ticket.id_usuario_atencion = this.usuario.id_usuario;
      ticket.fecha_finalizacion = this.getFormattedDate();
  
      let formData = new FormData();
      formData.append('datos', JSON.stringify(ticket));
      this.soporteService.refuseAttendedWithForm(formData).subscribe(data => {
        if (data instanceof HttpResponse) {
          if(data.body.codigo=='0'){
            this.mensajeService.alertError(null,data.body.mensaje);
          }else{
            this.getTicketListByParam(this.ticketSearch);
            this.mensajeService.alertOK(null,data.body.mensaje);
          }
        }
      });
    } else{
      this.mensajeService.alertError(null, "Tiene que agregar el motivo.");
    }
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
      if(selectedStatus.id != 1)
        this.ticketSearch.id_usuario_atencion = this.usuario.id_usuario;
      if(this.isDeskUser())
        this.getTicketListByParam(this.ticketSearch);
      else  
        this.getCreatedTicketListByParam(this.ticketSearch);
    } catch(error){
      console.log(error);
    }
  }

  public onSelectionCategoryChange(selectedCategory){
    try{
      this.loadSubcatalogs(selectedCategory.id);
      this.ticketSearch.id_categoria = selectedCategory.id;
      if(this.isDeskUser())
        this.getTicketListByParam(this.ticketSearch);
      else  
        this.getCreatedTicketListByParam(this.ticketSearch);
    } catch(error){
      console.log(error);
    }
  }

  public onSelectionSubcategoryChange(selectedSubcategory){
    try{
      this.ticketSearch.id_subcategoria = selectedSubcategory.id;
      if(this.isDeskUser())
        this.getTicketListByParam(this.ticketSearch);
      else  
        this.getCreatedTicketListByParam(this.ticketSearch);
    } catch(error){
      console.log(error);
    }
  }

  entrepreneurBrowse(newValue){
    this.getTicketListByParam(this.ticketSearch);
  }

  public getTicketListByParam(ticket: Ticket): void{   
     try{
      let formData = new FormData();
      formData.append('datos', JSON.stringify(ticket));
      this.soporteService.getTicketListByParam(formData)
      .subscribe(data => {
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

  public getCreatedTicketListByParam(ticket: Ticket): void{   
    try{
     let formData = new FormData();
     formData.append('datos', JSON.stringify(ticket));
     this.soporteService.getCreatedTicketListByParam(formData)
     .subscribe(data => {
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

 public onClickDate(){
   console.log(this.selectedDate);
   try{
    this.ticketSearch.id_categoria = this.selectedDate;
    this.getTicketListByParam(this.ticketSearch);
  } catch(error){
    console.log(error);
  }
  console.log(this.ticketSearch);
 }

}
