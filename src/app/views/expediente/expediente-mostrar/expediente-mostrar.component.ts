import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { MenuItemModel } from '@syncfusion/ej2-angular-navigations';
import { ValidarPerfil } from 'src/app/helper/ValidarPerfil';
import { AuditoriaService } from 'src/app/services/auditoria.service';
import { ExpedienteService } from 'src/app/services/expediente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'expediente-mostrar',
  templateUrl: './expediente-mostrar.component.html',
  styleUrls: ['./expediente-mostrar.component.css']
})
export class ExpedienteMostrarComponent implements OnInit {

  @Input() dataInput: any;
  @Output() close: EventEmitter<any> = new EventEmitter();
  idArea: number = 0;
  
  constructor(
    private expedienteService: ExpedienteService,
    private auditoriaService: AuditoriaService
  ) { 
    let perfil = new ValidarPerfil;
    this.idArea = perfil.getId();
  }

  seleccionado: string;
  expediente: any = {};
  columnsToDisplay = [];
  
  public pageSettings: PageSettingsModel;
  public customAttributes: Object;
  public AccountMenuItem: MenuItemModel[] = [];
  public datosLista: Object = { text: 'descripcion', value: 'id' };
  public listaEstado = [{descripcion: 'Pendiente', id: '1'},{descripcion: 'Derivado', id: '2'},{descripcion: 'En Revisión', id: '3'},{descripcion: 'Archivado', id: '4'}];

  listaMotivo = [{id: '1', descripcion: 'Motivo 1'},{id: '2', descripcion: 'Motivo 2'},{id: '3', descripcion: 'Motivo 3'}];
  listaProcedencia = [{id: '1', descripcion: 'Procedencia 1'},{id: '2', descripcion: 'Procedencia 2'},{id: '3', descripcion: 'Procedencia 3'}];
  listaTipoParte = [{id: '1', descripcion: 'Parte 1'},{id: '2', descripcion: 'Parte 2'},{id: '3', descripcion: 'Parte 3'}];

  ngOnInit(): void {
    this.seleccionado = 'D';
    this.inicializarGrilla();
    this.dataInput.origen = 'MOSTRAR';
    this.expedienteService.inicializar(this.dataInput).then(res => {
      this.expediente = res.data.expediente;
      const pp = res.data.partesProcesales;
      this.expediente.partesProcesales = [];
      pp.forEach(element => {
        let tp = this.listaTipoParte.find(f => f.id === element.codTipoParte).descripcion;
        this.expediente.partesProcesales.push({nombreCompleto: element.nombreCompleto, nroDocumento: element.nroDocumento, tipoParte: tp});
      });

      if(res.data.ubigeo != null){
        const ubigeo = res.data.ubigeo;
        this.expediente.departamento = ubigeo.departamento;
        this.expediente.provincia = ubigeo.provincia;
        this.expediente.distrito = ubigeo.distrito;
      }

      this.expediente.procedencia = this.listaProcedencia.find(f => f.id === this.expediente.codProcedencia).descripcion;
      this.expediente.motivo = this.listaMotivo.find(f => f.id === this.expediente.codMotivo).descripcion;

      const lista = []
      res.data.listaArea.forEach(e => {
        lista.push({text: e.descripcion, id: e.id});
      });
      setTimeout(() => {
        this.AccountMenuItem = [{
          text: 'Derivar Expediente al Área de:', id: '0',
          items: lista
        }];
      }, 500);
    });
  }

  itemsMenu(area): MenuItemModel[]{
    const lista = [];
    area.forEach(e => {
      lista.push({text: e.descripcion, id: e.id});
    });
    return lista;
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

  onSelectMenu(event){
    if(event.item.properties.id != '0'){
      this.expedienteService.actualizarArea({idExpediente: this.dataInput.idExpediente, idArea: event.item.properties.id}).then(res =>{
        if(res.status==1){
          swal.fire({position: 'top-end',icon: 'success',title: 'El expediente se derivó con éxito.',showConfirmButton: false,toast: true,timer: 4000});
          const param = {
            descripcion: 'Derivación del expediente',
            accion: 'DERIVAR_EXPEDIENTE',
            peticion: 'Derivado',
            areaOrigen: this.dataInput.idArea,
            areaDestino: event.item.properties.id,
            idExpediente: this.dataInput.idExpediente,
            idDocumento: 0,
            usuario: localStorage.getItem("USUARIO_SESSION")
          };
          this.auditoriaService.agregar(param).then(res =>{});
        }else{
          
        }
      });
    }
  }

  onSelectEstado(event){
    if(event?.itemData?.id=='2'){
      swal.fire({position: 'top-end',icon: 'info',title: 'No se puede derivar a la misma área.',showConfirmButton: false,toast: false,timer: 4000});
      setTimeout(() => {
        this.expediente.codEstado = this.dataInput.codEstado;
      }, 500);
      return;
    }
    this.expedienteService.actualizarEstado({idExpediente: this.dataInput.idExpediente, codEstado: event?.itemData?.id}).then(res =>{
      swal.fire({position: 'top-end',icon: 'success',title: 'Estado actualizado correctamente.',showConfirmButton: false,toast: true,timer: 4000});
    });
  }
}
