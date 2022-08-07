import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import swal from 'sweetalert2';

@Component({
  selector: 'usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.css']
})
export class UsuarioDetalleComponent implements OnInit {

  @Input() dataInput: any;
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor( 
    private usuarioService: UsuarioService, 
    private personaService: PersonaService) { }

  usuario: any = {};
  listaPerfil = [];
  public datosLista: Object = { text: 'descripcion', value: 'id' };

  ngOnInit(): void {
    this.usuarioService.inicializar({idUsuario: this.dataInput.idUsuario, idPerfil: this.dataInput.idPerfil}).then(res => {
      this.listaPerfil = res.data.listaPerfil;
      if(this.dataInput.opcion=="MODIFICAR"){
        this.usuario = res.data.usuario[0];
        this.usuario.clave = '';
      }else{
        this.usuario.idUsuario = 0;
        this.usuario.clave = this.generatePassword(6);
      }
    });
  }

  onClickBuscar(){
    this.personaService.buscarPorDocumento({nroDocumento: this.usuario.nroDocumento}).then(res => {
      if(res.data.persona){
        var persona = res.data.persona;
        this.usuario.nombre = persona.nombre;
        this.usuario.apellido = persona.apellido;
        this.usuario.idPersona = persona.idPersona;
      }else{
        swal.fire({position: 'top-end',icon: 'error',title: 'No se encontró persona.',showConfirmButton: false,toast: true,timer: 5000});
      }
    });
  }

  onInsertDocumento(event){
    this.usuario.codUsuario = event.value;
  }

  onClickAceptar(){
    if(this.dataInput.opcion=="AGREGAR"){
      this.usuarioService.agregar(this.usuario).then(res => {
        swal.fire({position: 'top-end',icon: 'success',title: 'Usuario creado exitosamente.',showConfirmButton: false,toast: true,timer: 4000});
        this.close.emit(true);
      });
    }else{
      this.usuarioService.modificar(this.usuario).then(res => {
        swal.fire({position: 'top-end',icon: 'success',title: 'Se modificó el perfil del usuario.',showConfirmButton: false,toast: true,timer: 5000});
        this.close.emit(true);
      });
    }
  }

  onClickCancelar(){
    this.close.emit(true);
  }

  generatePassword(length): string {
    var upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var digit = "0123456789";
    var alphanum = upper + digit;
    var pass = '';
    for (var i = 0; i < length; i++) {
      pass += alphanum.charAt(Math.floor(Math.random() * alphanum.length));
    }
    return pass;
  }
}
