import { Component, OnInit, ViewChild } from '@angular/core';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { PersonaService } from 'src/app/services/persona.service';
import swal from 'sweetalert2';

@Component({
  selector: 'persona-listado',
  templateUrl: './persona-listado.component.html',
  styleUrls: ['./persona-listado.component.css']
})
export class PersonaListadoComponent implements OnInit {

  constructor( private personaService: PersonaService ) { }

  public pageSettings: PageSettingsModel;
  public customAttributes: Object;
  
  dataPersona: any = {};
  filtro: any = {nroDocumento: '', nombre: ''};
  columnsToDisplay = [];
  dataSource = [];
  showDetalle: boolean = false;

  @ViewChild('dialogDetalle') dialogDetalle: DialogComponent;

  ngOnInit(): void {
    this.inicializarGrilla();
    this.listar();
  }

  inicializarGrilla() {
    this.columnsToDisplay = [
      { nombre: "acciones", titulo: "", textAlign: 'Center', visible: true, tipo: "string", width: 100 },
      { nombre: "tipoDocumento", titulo: "TIPO DOC.", visible: true, tipo: "string", width: 120 },
      { nombre: "nroDocumento", titulo: "N° Documento", visible: true, tipo: "string", width: 150 },
      { nombre: "nombre", titulo: "NOMBRES", visible: true, tipo: "string", width: '' },
      { nombre: "apellido", titulo: "APELLIDOS", visible: true, tipo: "string", width: '' },
      { nombre: "nroCelular", titulo: "N° CELULAR", visible: true, tipo: "string", width: 150 },
      { nombre: "correo", titulo: "CORREO", visible: true, tipo: "string", width: 250 },
    ];
  }

  listar(){
    this.personaService.listar(this.filtro).then(res => {
      this.dataSource = res.data;
    });
  }

  onClickBuscar(){
    this.listar();
  }

  onClickAgregar(){
    this.dataPersona.titulo = "AGREGAR";
    this.dataPersona.idPersona = 0;
    this.dialogDetalle.show();
    this.showDetalle = true;
  }

  onClickModificar(data){
    this.dataPersona = data;
    this.dataPersona.titulo = "MODIFICAR";
    this.dialogDetalle.show();
    this.showDetalle = true;
  }

  onClickEliminar(data){
    swal.fire({
      text: '¿Está seguro que desea eliminar a la persona?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'CANCELAR',
      confirmButtonText: 'ACEPTAR'
    }).then((result) => {
      if (result.isConfirmed) {
        this.personaService.eliminar({idPersona: data.idPersona}).then(res => {
          if(res.status == 1){
            swal.fire({position: 'top-end',icon: 'success',title: 'La persona fue eliminada correctamente.',showConfirmButton: false,toast: true,timer: 4000});
            this.listar();
          }else{
            swal.fire({position: 'top-end',icon: 'error',title: 'No se pudo eliminar la persona.',showConfirmButton: false,toast: true,timer: 4000});
          }
        });
      }
    })

  }

  cerrarDetalle(event){
    this.dialogDetalle.hide();
    this.showDetalle = false;
    this.listar();
  }
}
