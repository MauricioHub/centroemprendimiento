import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { General } from 'src/app/estructuras/General';
import { MensajeService } from 'src/app/servicio/Mensaje.service';

@Component({
  selector: 'app-archivo',
  templateUrl: './archivo.component.html',
  styleUrls: ['./archivo.component.scss']
})
export class ArchivoComponent implements OnInit, AfterViewInit {

  @Output() file = new EventEmitter<any>();

  @Input() accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  @Input() maxSize: number = 5242880;
  id = "archivo";
  @Input() class = "";
  @Input() vistaPrevia = false;
  @Input() title = "Adjuntar archivo";
  @Input() url: string;
  @Input() name: string;
  isFile=false;
  public static archivo: File;

  constructor(private menajesService: MensajeService) {
    this.id = General.generateId();
  }

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    var clase = "thumb";
    if (this.vistaPrevia) {
      if (this.url) {
        if (this.accept.match('image.*')) {
          this.isFile = false;
          document.getElementById('outputfile' + this.id).innerHTML = ['<img class="', clase, '" src="', this.url, '" style="max-width:100%; max-height:200px" ', '"/>'].join('');
        }else{
          this.isFile = true;
          document.getElementById('outputfile' + this.id).innerHTML = ["<p class='m-t-10'><a href='", this.url,"' target='_blank'> ", "Ver archivo","</a></p>"].join('');
        }
      }
    }
  }

  validarArchivo(evt) {
    if (this.maxSize <= 0)
      this.maxSize = 5242880;
    var files = evt.target.files;
    for (var i = 0, f; f = files[i]; i++) {
      ArchivoComponent.archivo = f;
      /*if (!f.type.match(evt.currentTarget.accept)) {
        continue;
      }*/
      if (f.size > this.maxSize) {
        //if (f.size > 163840) {
        let peso = (this.maxSize / 1024) / 1024;
        this.menajesService.alertError(null, "El archivo no debe superar los " + peso + " MB");
        evt.target.value = "";
        continue;
      }
      this.file.emit(f);
      if (evt.target.dataset.outputName) {
        document.getElementById(evt.target.dataset.outputName).innerHTML = f.name;
      }
      if (this.vistaPrevia) {
        var reader = new FileReader();
        const archivo = f;
        const self = this;
        reader.onload = (function (theFile) {
          return function (e) {
            var clase = "thumb";
            if (evt.target.dataset.outputClass) {
              clase = evt.target.dataset.outputClass;
            }
            if (archivo.type.match('image.*')) {
              this.isFile = false;
              document.getElementById('outputfile' + self.id).innerHTML = ['<img class="', clase, '" src="', e.target.result, '" style="max-width:100%; max-height:200px" title="', escape(theFile.name), '"/>'].join('');
            }else{
              this.isFile = true;
              document.getElementById('outputfile' + this.id).innerHTML = ["<a href='", this.url,"' target='_blank'> ","</a>"].join('');
            }
          };
        })(f);
        reader.readAsDataURL(f);
      }
    }
  }

}
