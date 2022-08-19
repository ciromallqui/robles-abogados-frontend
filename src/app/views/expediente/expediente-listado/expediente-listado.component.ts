import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { ExpedienteService } from 'src/app/services/expediente.service';

@Component({
  selector: 'expediente-listado',
  templateUrl: './expediente-listado.component.html',
  styleUrls: ['./expediente-listado.component.css']
})
export class ExpedienteListadoComponent implements OnInit {

  @Input() area: any;

  constructor(
    private expedienteService: ExpedienteService
  ) { }

  public pageSettings: PageSettingsModel;
  public customAttributes: Object;
  columnsToDisplay = [];
  dataSource = [];
  filtro: any = {};
  dataExpediente: any = {};
  showDetalle: boolean;

  @ViewChild('dialogDetalle') dialogDetalle: DialogComponent;

  ngOnInit(): void {
    this.filtro.nroExpediente = '';
    this.inicializarGrilla();
    this.listar();
  }

  inicializarGrilla() {
    this.columnsToDisplay = [
      { nombre: "acciones", titulo: "", textAlign: 'Center', visible: true, tipo: "string", width: 100 },
      { nombre: "nroExpediente", titulo: "N° EXPEDIENTE", visible: true, tipo: "string", width: 150 },
      { nombre: "nombreCompleto", titulo: "CLIENTE", visible: true, tipo: "string", width: '' },
      { nombre: "fechaInicio", titulo: "FECHA INICIO", visible: true, tipo: "string", width: 120 },
      { nombre: "delitoPrincipal", titulo: "MATERIA/DELITO", visible: true, tipo: "string", width: '' },
      { nombre: "dias", titulo: "DÍAS", visible: true, tipo: "string", width: 150 },
      { nombre: "area", titulo: "ÁREA", visible: true, tipo: "string", width: 150 }
    ];
  }

  listar(){
    this.filtro.idArea = this.area;
    this.expedienteService.listar(this.filtro).then(res =>{
      this.dataSource = res.data;
    });
  }

  onClickBuscar(){
    this.listar();
  }

  onClickAgregar(){
    this.dataExpediente.opcion = "AGREGAR";
    this.dataExpediente.idExpediente = 0;
    this.dataExpediente.idArea = this.area;
    this.showDetalle = true;
    this.dialogDetalle.show();
  }
  onClickModificar(data){
    this.dataExpediente = data;
    this.dataExpediente.opcion = "MODIFICAR";
    this.showDetalle = true;
    this.dialogDetalle.show();
  }

  onClickEliminar(data){

  }

  cerrarDetalle(event){
    this.showDetalle = false;
    this.dialogDetalle.hide();
    this.listar();
  }

  onClickMostrarExpediente(data){
    this.dataExpediente = data;
    this.dataExpediente.opcion = "VER";
    this.showDetalle = true;
    this.dialogDetalle.show();
  }
}
