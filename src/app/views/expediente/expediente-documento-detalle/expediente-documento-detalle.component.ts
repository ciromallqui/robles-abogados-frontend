import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DocumentoService } from 'src/app/services/documento.service';
import swal from 'sweetalert2';

@Component({
  selector: 'expediente-documento-detalle',
  templateUrl: './expediente-documento-detalle.component.html',
  styleUrls: ['./expediente-documento-detalle.component.css']
})
export class ExpedienteDocumentoDetalleComponent implements OnInit {

  @Input() dataInput: any;
  @Output() close: EventEmitter<any> = new EventEmitter();
  
  constructor(private documentoService: DocumentoService) { }

  public documento: any = {};
  public listaTipoDocumento: [];
  public datosLista: Object = { text: 'descripcion', value: 'id' };

  public month: number = new Date().getMonth();
  public fullYear: number = new Date().getFullYear();
  public date: number = new Date().getDate();

  ngOnInit(): void {
    this.documento = this.inicializarDocumento;
  }

  onFileChanged(e){
    var files = e.target.files;
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
      this.documento.nombre = file.name;
    }
  }
  handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.documento.archivo = btoa(binaryString);
   }

  onClickAceptar(){
    this.documento.usuario = localStorage.getItem("USUARIO_SESSION");
    this.documento.fechaCreacion = new Date(this.fullYear, this.month, this.date, 7, 0, 0);
    this.documento.idExpediente = this.dataInput.idExpediente;
    this.documentoService.agregar(this.documento).then(res =>{
      if(res == null) {
        swal.fire({position: 'top-end',icon: 'error',title: 'No se pudo agregar el documento.',showConfirmButton: false,toast: true,timer: 4000});
        return;
      }
      if(res.status==1){
        swal.fire({position: 'top-end',icon: 'success',title: 'El documento se agregó correctamente.',showConfirmButton: false,toast: true,timer: 4000});
        this.close.emit(true);
      }else{
        swal.fire({position: 'top-end',icon: 'error',title: 'El documento no se agregó.',showConfirmButton: false,toast: true,timer: 4000});
      }
    });
  }
  
  onClickCancelar(){
    this.close.emit(true);
  }

  inicializarDocumento: any = {
    asunto: "",
    codTipo: "",
    descripcion: "",
    nombre: ""
  };
}
