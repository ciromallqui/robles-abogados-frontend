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

  ngOnInit(): void {
    this.seleccionado = 'D';
    this.inicializarGrilla();
    this.expedienteService.inicializar({idExpediente: this.dataInput.idExpediente, idArea: this.dataInput.idArea}).then(res => {
      this.expediente = res.data.expediente;
      this.expediente.partesProcesales = res.data.partesProcesales;

      const lista = []
      res.data.listaArea.forEach(e => {
        lista.push({text: e.descripcion, id: e.id});
      });
      setTimeout(() => {
        this.AccountMenuItem = [{
          text: 'Derivar Expediente al Área de:',
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
    this.expedienteService.actualizarArea({idExpediente: this.dataInput.idExpediente, idArea: event.item.properties.id}).then(res =>{
      if(res.status==1){
        swal.fire({position: 'top-end',icon: 'success',title: 'El expediente se derivó con éxito.',showConfirmButton: false,toast: true,timer: 4000});
      }else{
        
      }
    });
  }
}
