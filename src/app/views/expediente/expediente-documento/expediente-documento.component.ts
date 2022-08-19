import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { DocumentoService } from 'src/app/services/documento.service';

@Component({
  selector: 'expediente-documento',
  templateUrl: './expediente-documento.component.html',
  styleUrls: ['./expediente-documento.component.css']
})
export class ExpedienteDocumentoComponent implements OnInit {

  @Input() dataInput: any;
  
  constructor(private documentoService: DocumentoService) { }

  @ViewChild('dialogDocumentoDetalle') dialogDocumentoDetalle: DialogComponent;

  expediente: any = {};
  dataExpediente: any = {};
  showDetalle: boolean;

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.documentoService.listar(this.dataInput).then(res =>{

    });
  }

  onClickAgragarDocumento(){
    this.dataExpediente = this.dataInput;
    this.showDetalle = true;
    this.dialogDocumentoDetalle.show();
  }

  cerrarDetalle(event){
    this.showDetalle = false;
    this.dialogDocumentoDetalle.hide();
    this.listar();
  }
}
