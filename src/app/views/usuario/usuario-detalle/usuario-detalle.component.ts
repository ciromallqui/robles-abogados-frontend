import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.css']
})
export class UsuarioDetalleComponent implements OnInit {

  @Input() dataInput: any;
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor() { }

  usuario: any = {};
  listaPerfil = [];
  public datosLista: Object = { text: 'descripcion', value: 'id' };

  ngOnInit(): void {
  }

  onClickBuscar(){
    
  }

  onClickAceptar(){

  }

  onClickCancelar(){
    this.close.emit(true);
  }
}
