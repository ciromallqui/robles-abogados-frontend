import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExpedienteService } from 'src/app/services/expediente.service';
import { PersonaService } from 'src/app/services/persona.service';
import swal from 'sweetalert2';

@Component({
  selector: 'expediente-detalle',
  templateUrl: './expediente-detalle.component.html',
  styleUrls: ['./expediente-detalle.component.css']
})
export class ExpedienteDetalleComponent implements OnInit {

  @Input() dataInput: any;
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(
    private personaService: PersonaService,
    private expedienteService: ExpedienteService
  ) { }

  expediente: any = {};
  public listaArea: [];
  public datosLista: Object = { text: 'descripcion', value: 'id' };

  ngOnInit(): void {
    this.expedienteService.inicializar({idExpediente: this.dataInput.idExpediente, idArea: this.dataInput.idArea}).then(res => {
      this.listaArea = res.data.listaArea;
      if(this.dataInput.opcion=="MODIFICAR"){
        this.expediente = res.data.expediente;
      }else{
        this.expediente.idExpediente = 0;
        this.expediente.idArea = this.dataInput.idArea;
        this.expediente.nroExpediente = "EXP-01";
      }
    });
  }

  onClickBuscar(){
    this.personaService.buscarPorDocumento({nroDocumento: this.expediente.nroDocumento}).then(res => {
      if(res.data.persona){
        var persona = res.data.persona;
        this.expediente.nombre = persona.nombre;
        this.expediente.apellido = persona.apellido;
        this.expediente.idPersona = persona.idPersona;
        this.expediente.idUsuario = persona.idUsuario;
      }else{
        swal.fire({position: 'top-end',icon: 'error',title: 'No se encontró persona.',showConfirmButton: false,toast: true,timer: 5000});
      }
    });
  }

  onClickAceptar(){
    if(this.dataInput.opcion=="AGREGAR"){
      this.expedienteService.agregar(this.expediente).then(res => {
        swal.fire({position: 'top-end',icon: 'success',title: 'Expediente creado exitosamente.',showConfirmButton: false,toast: true,timer: 4000});
        this.close.emit(true);
      });
    }else{
      // this.expedienteService.modificar(this.expediente).then(res => {
      //   swal.fire({position: 'top-end',icon: 'success',title: 'Se modificó el perfil del usuario.',showConfirmButton: false,toast: true,timer: 5000});
      //   this.close.emit(true);
      // });
    }
  }

  onClickCancelar(){
    this.close.emit(true);
  }
}
