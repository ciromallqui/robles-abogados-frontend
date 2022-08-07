import { Component, OnInit, ViewChild } from '@angular/core';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'usuario-listado',
  templateUrl: './usuario-listado.component.html',
  styleUrls: ['./usuario-listado.component.css']
})
export class UsuarioListadoComponent implements OnInit {

  constructor( private usuarioService: UsuarioService ) { }

  public pageSettings: PageSettingsModel;
  public customAttributes: Object;
  columnsToDisplay = [];
  dataSource = [];
  filtro: any = {};
  dataUsuario: any = {};
  showDetalle: boolean;

  @ViewChild('dialogDetalle') dialogDetalle: DialogComponent;

  ngOnInit(): void {
    this.inicializarGrilla();
    this.listar();
  }

  inicializarGrilla() {
    this.columnsToDisplay = [
      { nombre: "acciones", titulo: "", textAlign: 'Center', visible: true, tipo: "string", width: 100 },
      { nombre: "nroDocumento", titulo: "N° Documento", visible: true, tipo: "string", width: 150 },
      { nombre: "nombre", titulo: "NOMBRES", visible: true, tipo: "string", width: '' },
      { nombre: "apellido", titulo: "APELLIDOS", visible: true, tipo: "string", width: '' },
      { nombre: "perfil", titulo: "PERFIL", visible: true, tipo: "string", width: 200 },
      { nombre: "codUsuario", titulo: "USUARIO", visible: true, tipo: "string", width: 200 },
      { nombre: "nroCelular", titulo: "N° CELULAR", visible: true, tipo: "string", width: 150 },
      { nombre: "correo", titulo: "CORREO", visible: true, tipo: "string", width: 250 },
    ];
  }

  listar(){
    this.usuarioService.listar({}).then(res => {
      this.dataSource = res.data;
    });
  }

  onClickBuscar(){

  }

  onClickAgregar(){
    this.dataUsuario.opcion = "AGREGAR";
    this.dataUsuario.idUsuario = 0;
    this.showDetalle = true;
    this.dialogDetalle.show();
  }

  onClickModificar(data){
    this.dataUsuario = data;
    this.dataUsuario.opcion = "MODIFICAR";
    this.showDetalle = true;
    this.dialogDetalle.show();
  }

  onClickEliminar(data){

  }

  cerrarDetalle(event){
    this.showDetalle = false;
    this.dialogDetalle.hide();
  }
}
