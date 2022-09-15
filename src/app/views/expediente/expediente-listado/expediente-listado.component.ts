import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { ValidarPerfil } from 'src/app/helper/ValidarPerfil';
import { AuditoriaService } from 'src/app/services/auditoria.service';
import { ExpedienteService } from 'src/app/services/expediente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'expediente-listado',
  templateUrl: './expediente-listado.component.html',
  styleUrls: ['./expediente-listado.component.css']
})
export class ExpedienteListadoComponent implements OnInit {

  @Input() area: any;

  constructor(
    private expedienteService: ExpedienteService,
    private auditoriaService: AuditoriaService
  ) { }

  @ViewChild('dialogDetalle') dialogDetalle: DialogComponent;

  public pageSettings: PageSettingsModel;
  public customAttributes: Object;
  columnsToDisplay = [];
  dataSource = [];
  filtro: any = {};
  dataExpediente: any = {};
  showDetalle: boolean;
  showReporte: boolean;

  public datosLista: Object = { text: 'descripcion', value: 'id' };
  public listaEstado = [{descripcion: 'Pendiente', id: '1'},{descripcion: 'Derivado', id: '2'},{descripcion: 'En Revisión', id: '3'},{descripcion: 'Archivado', id: '4'},{descripcion: '-- Mostrar Todo --', id: null}];

  ngOnInit(): void {
    this.filtro.nroExpediente = '';
    this.filtro.codEstado = '';
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
      { nombre: "area", titulo: "ÁREA", visible: true, tipo: "string", width: 150 },
      { nombre: "codEstado", titulo: "ESTADO", visible: true, tipo: "string", width: 150 },
      { nombre: "derivacion", titulo: "", visible: true, tipo: "string", width: 50 }
    ];
  }

  listar(){
    var perfil =  new ValidarPerfil;
    this.filtro.idArea = perfil.get();
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

  onClickConfirmar(data){
    swal.fire({
      text: 'Antes de confirmar la entrega, asegúrese de la conformidad de los datos.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'CANCELAR',
      confirmButtonText: 'ACEPTAR'
    }).then((result) => {
      if (result.isConfirmed) {
        this.auditoriaService.modificar({idExpediente: data.idExpediente, usuario: localStorage.getItem("USUARIO_SESSION")}).then(res =>{
          swal.fire({position: 'top-end',icon: 'success',title: 'El expediente se confirmó con éxito.',showConfirmButton: false,toast: true,timer: 5000});
          this.listar();
        });
      }
    });
  }

  onClickEliminar(data){
    swal.fire({
      text: '¿Está seguro que desea eliminar el expediente?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'CANCELAR',
      confirmButtonText: 'ACEPTAR'
    }).then((result) => {
      if (result.isConfirmed) {
        let fechaEliminacion = new Date().getDate() +"/"+ new Date().getMonth() +"/"+ new Date().getFullYear();
        this.expedienteService.eliminar({idExpediente: data.idExpediente, usuario: localStorage.getItem("USUARIO_SESSION"), fechaEliminacion: fechaEliminacion}).then(res => {
          if(res.status == 1){
            swal.fire({position: 'top-end',icon: 'success',title: 'El expediente fue eliminada correctamente.',showConfirmButton: false,toast: true,timer: 4000});
            this.listar();
          }else{
            swal.fire({position: 'top-end',icon: 'error',title: 'No se pudo eliminar el expediente.',showConfirmButton: false,toast: true,timer: 4000});
          }
        });
      }
    });
  }

  cerrarDetalle(event){
    this.showDetalle = false;
    this.dialogDetalle.hide();
    this.listar();
  }

  onClickMostrarExpediente(data){
    this.dataExpediente = data;
    this.dataExpediente.idArea = this.area;
    this.dataExpediente.opcion = "VER";
    this.showDetalle = true;
    this.dialogDetalle.show();
  }

  onClickReporte(data){
    this.dataExpediente = data;
    this.showReporte = true;
  }

  onClickCerrarReporte(event){
    this.showReporte = !event;
  }
}
