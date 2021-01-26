import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SoporteService } from '../../../servicio/Soporte.service';
import { HttpResponse } from '@angular/common/http';
import { Respuesta } from 'src/app/estructuras/respuesta';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import { Soporte } from 'src/app/estructuras/Soporte';
import { Ticket } from 'src/app/estructuras/Ticket';
import { Usuario } from 'src/app/estructuras/usuario';

@Component({
  selector: 'app-hd-ticket',
  templateUrl: './hd-ticket.component.html',
  styleUrls: ['./hd-ticket.component.scss']
})
export class HdTicketComponent implements OnInit {
  public basicContent: string;
  public respuesta: Respuesta;
  public ticket: Ticket = new Ticket();
  public ticketCategory: Soporte = new Soporte();
  public ticketSubcategory: Soporte = new Soporte();

  public ticketTypeLst:any[] = [{id: "", nombre: ""}];
  public selectedTicketType:any = {id: "" , nombre: ""};
  public categoryLst:any[] = [{id: "", nombre: ""}];
  public selectedCategory:any = {id: "" , nombre: ""};
  public subcategoryLst:any[] = [{id: "", nombre: ""}];
  public selectedSubcategory:any = {id: "" , nombre: ""};
  public usuario: Usuario;
  
  constructor(private router: Router,
    private soporteService: SoporteService,
    private mensajeService: MensajeService
  ) {
    this.usuario = Usuario.getUser();
    this.ticket.descripcion = "";  
  }

  ngOnInit() {
    this.basicContent = '<p>Hello...</p>';
    this.loadTicketTypes();
    this.loadCatalogs(1);
    this.loadSubcatalogs(1);
  }

  public loadTicketTypes(){
    this.soporteService.getTicketByTypes().subscribe(data=>{
      if(data.codigo == '1'){
        this.ticketTypeLst = data.data;
      }else{
        this.mensajeService.alertError(null,data.mensaje);
      }
    });
  }

  public loadCatalogs(id: number){
    this.ticketCategory.id = id;
    let formData = new FormData();
    formData.append('datos', JSON.stringify(this.ticketCategory));
    this.soporteService.getTicketCatalogs(formData).subscribe(data=>{
      if (data instanceof HttpResponse) {
        if(data.body.codigo=='1'){
          this.categoryLst = data.body.data;
        } else{
          this.mensajeService.alertError(null,data.body.mensaje);
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
          this.subcategoryLst = data.body.data;
        } else{
          this.mensajeService.alertError(null,data.body.mensaje);
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

  public onSelectionCategoryChange(selectedCategory){
    try{
      this.selectedCategory = selectedCategory;
      this.loadSubcatalogs(selectedCategory.id);
    } catch(error){
      console.log(error);
    }
  }

  public onSelectionSubcategoryChange(selectedSubcategory){
    try{
      this.selectedSubcategory = selectedSubcategory;
    } catch(error){
      console.log(error);
    }
  }

  public grabarTicket(){
    try{
      this.ticket.id_tipo = 1;
      this.ticket.id_usuario_creacion = this.usuario.id_usuario;
      this.ticket.id_categoria = (this.selectedCategory.id != "")? this.selectedCategory.id: "1";
      this.ticket.id_subcategoria = (this.selectedSubcategory.id != "")? this.selectedSubcategory.id: "1";
      this.ticket.fecha_creacion = this.getFormattedDate();
      this.ticket.id_ticket = 0;
      this.ticket.id_persona = 0;
      
      let formData = new FormData();
      formData.append('datos', JSON.stringify(this.ticket));

      this.soporteService.insertWithForm(formData).subscribe(data => {
        if (data instanceof HttpResponse) {
          if(data.body.codigo=='0'){
            this.mensajeService.alertError(null,data.body.mensaje);
          }else{
            this.mensajeService.alertOK(null,data.body.mensaje);
            this.ticket.descripcion = "";
            this.loadTicketTypes();
            this.loadCatalogs(1);
            this.loadSubcatalogs(1);
          }
        }
      });

    } catch(error){
      console.log(error);
    }
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

}
