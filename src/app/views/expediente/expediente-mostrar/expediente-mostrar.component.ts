import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { ExpedienteService } from 'src/app/services/expediente.service';

@Component({
  selector: 'expediente-mostrar',
  templateUrl: './expediente-mostrar.component.html',
  styleUrls: ['./expediente-mostrar.component.css']
})
export class ExpedienteMostrarComponent implements OnInit {

  @Input() dataInput: any;
  @Output() close: EventEmitter<any> = new EventEmitter();
  
  constructor(private expedienteService: ExpedienteService) { }

  seleccionado: string;
  expediente: any = {};
  columnsToDisplay = [];
  
  public pageSettings: PageSettingsModel;
  public customAttributes: Object;

  ngOnInit(): void {
    this.seleccionado = 'D';
    this.inicializarGrilla();
    this.expedienteService.inicializar({idExpediente: this.dataInput.idExpediente, idArea: this.dataInput.idArea}).then(res => {
      this.expediente = res.data.expediente;
      this.expediente.partesProcesales = res.data.partesProcesales;
    });
  }

  inicializarGrilla() {
    this.columnsToDisplay = [
      // { nombre: "acciones", titulo: "", textAlign: 'Center', visible: true, tipo: "string", width: 100 },
      { nombre: "nroDocumento", titulo: "DNI/RUC", visible: true, tipo: "string", width: 150 },
      { nombre: "nombreCompleto", titulo: "PARTE PROCESAL", visible: true, tipo: "string", width: '' },
      { nombre: "tipoParte", titulo: "TIPO PARTE", visible: true, tipo: "string", width: 200 },
    ];
  }

  onClickCerrar(){
    this.close.emit(true);
  }

  mostrarTab(args: string){
    switch(args){
      case "D": this.seleccionado = 'D'; break;
      case "A": this.seleccionado = 'A'; break;
    }
  }
}
