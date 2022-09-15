import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { AuditoriaService } from 'src/app/services/auditoria.service';
import { DocumentoService } from 'src/app/services/documento.service';

@Component({
  selector: 'expediente-documento',
  templateUrl: './expediente-documento.component.html',
  styleUrls: ['./expediente-documento.component.css']
})
export class ExpedienteDocumentoComponent implements OnInit {

  @Input() dataInput: any;
  
  constructor(
    private documentoService: DocumentoService,
    private auditoriaService: AuditoriaService
  ) { }

  @ViewChild('dialogDocumentoDetalle') dialogDocumentoDetalle: DialogComponent;

  expediente: any = {};
  filtro: any = {};
  dataExpediente: any = {};
  showDetalle: boolean;
  dataSource = [];

  ngOnInit(): void {
    this.dataInput.busqueda = "";
    this.listar();
  }

  listar(){
    this.documentoService.listar(this.dataInput).then(res =>{
      this.dataSource = res.data;
    });
  }

  onClickBuscar(){
    this.dataInput.busqueda = this.filtro.busqueda;
    this.listar();
    setTimeout(() => {
      if(this.dataSource == null){
        this.auditoria(0);
      }else{
        this.auditoria(this.dataSource[0].idDocumento);
      }
    }, 500);
  }

  onClickAgragar(){
    this.dataExpediente = this.dataInput;
    this.showDetalle = true;
    this.dialogDocumentoDetalle.show();
  }

  cerrarDetalle(event){
    this.showDetalle = false;
    this.dialogDocumentoDetalle.hide();
    this.dataInput.busqueda = '';
    this.listar();
  }

  descargarArchivo(data){
    const downloadLink = document.createElement('a');
    downloadLink.href = 'data:application/octet-stream;base64,'+ data.archivo;
    downloadLink.download = data.nombre;
    downloadLink.click();
  }

  auditoria(idDoc: number){
    const param = {
      descripcion: 'Busqueda del un documento',
      accion: 'BUSCAR_DOCUMENTO',
      peticion: this.filtro.busqueda,
      areaOrigen: this.dataInput.idArea,
      areaDestino: 0,
      idExpediente: this.dataInput.idExpediente,
      idDocumento: idDoc,
      usuario: localStorage.getItem("USUARIO_SESSION")
    };
    this.auditoriaService.agregar(param).then(res =>{});
  }
}
