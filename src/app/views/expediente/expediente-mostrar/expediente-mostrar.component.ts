import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { MenuItemModel } from '@syncfusion/ej2-angular-navigations';
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
  
  constructor(private expedienteService: ExpedienteService) { }

  seleccionado: string;
  expediente: any = {};
  columnsToDisplay = [];
  
  public pageSettings: PageSettingsModel;
  public customAttributes: Object;
  public AccountMenuItem: MenuItemModel[] = [];

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
        }else{
          
        }
      });
    }
  }
}
