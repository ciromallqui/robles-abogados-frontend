import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import swal from 'sweetalert2';

@Component({
  selector: 'persona-detalle',
  templateUrl: './persona-detalle.component.html',
  styleUrls: ['./persona-detalle.component.css']
})
export class PersonaDetalleComponent implements OnInit {

  @Input() dataInput: any;
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor( private personaService: PersonaService ) { }

  persona: any = {};
  listaTipoDocumento = [];
  public datosLista: Object = { text: 'descripcion', value: 'id' };

  ngOnInit(): void {
    this.inicializar();
  }

  inicializar(){
    this.personaService.inicializar({idPersona: this.dataInput.idPersona}).then(res => {
      this.listaTipoDocumento = res.data.listaTipoDocumento;
      if(this.dataInput.titulo=="MODIFICAR") { this.persona = res.data.persona; }
      else { this.persona.idPersona = 0; }
    });
  }

  onClickAceptar(){
    this.personaService.guardar(this.persona).then(res =>{
      if(res.status == 1){
        swal.fire({position: 'top-end',icon: 'success',title: 'Datos guardado correctamente.',showConfirmButton: false,toast: true,timer: 4000});
        this.close.emit(true);
      }else{
        swal.fire({icon: 'error',text: res.text,confirmButtonColor: '#3085d6',});
      }
    });
  }

  onClickCancelar(){
    this.close.emit(true);
  }
}
