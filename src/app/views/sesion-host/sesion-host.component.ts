import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { SesionService } from 'src/app/services/sesion.service';
import { MenuEventArgs, MenuItemModel } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'sesion-host',
  templateUrl: './sesion-host.component.html',
  styleUrls: ['./sesion-host.component.css']
})
export class SesionHostComponent implements OnInit {

  view: string;
  sesionData: any = {};
  usuario: any = {};

  constructor( private sesionService: SesionService) { }

  ngOnInit(): void {
    if(localStorage.getItem("USUARIO_LOGUEADO") == null){
      this.view = 'LOGIN';
      localStorage.clear();
    }else{
      this.view = 'MENU';
    }
  }

  onClickIniciarSesion(){
    this.sesionService.iniciarSesion(this.sesionData).then(res =>{
      if(res.status == 1){
        this.usuario = res.data.usuario;
        this.addDataLocal(res.data);
        this.view = 'MENU';
      }else{
        swal.fire({icon: 'error',text: res.text,confirmButtonColor: '#3085d6',});
      }
    });
  }

  onClickRestaurar(){
    this.sesionService.listarParametro({}).then(res =>{
      
    });
  }

  addDataLocal(data){
    localStorage.setItem("TOKEN", data.token);
    localStorage.setItem("USUARIO_SESSION", data.usuario.usuario);
    localStorage.setItem("NRO_DOCUMENTO", data.usuario.nroDocumento);
    localStorage.setItem("NOMBRE_COMPLETO", data.usuario.nombreCompleto);
    localStorage.setItem("USUARIO_LOGUEADO", 'SI');
  }
}
