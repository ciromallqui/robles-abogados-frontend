import { Component, OnInit } from '@angular/core';
import { MenuEventArgs, MenuItemModel } from '@syncfusion/ej2-angular-navigations';
import { ValidarPerfil } from 'src/app/helper/ValidarPerfil';

@Component({
  selector: 'menu-administrador',
  templateUrl: './menu-administrador.component.html',
  styleUrls: ['./menu-administrador.component.css']
})
export class MenuAdministradorComponent implements OnInit {

  view: string = "I";

  private perfil: ValidarPerfil;
  constructor() {
    this.perfil =  new ValidarPerfil;
   }

  public AccountMenuItem: MenuItemModel[] = [];
  public menuItems: MenuItemModel[] = [
    {text: 'INICIO', id: 'I'},{text: 'Gestión de Personas', id: 'GP'},{text: 'Gestión de Usuarios/Perfiles', id: 'GR'}, {separator: true},
    {text: 'Expedientes', id: 'EXP'}
  ];
  

  ngOnInit(): void {
    this.AccountMenuItem = [{
      text: localStorage.getItem("NOMBRE_COMPLETO") +" - "+ this.perfil.getText(),
      items: [{text: 'Cambiar clave', id: 'CC'}, {text: 'Cerrar sesión', id: 'CS'}]
    }];

    if (this.perfil.getId() == 0){
      this.view = 'EXP';
      this.menuItems = [{text: 'Expedientes', id: 'EXP'}]
    }
  }

  onSelectMenu(e: MenuEventArgs): void {
    switch (e.item.id) {
      case 'CS':
        this.onClickCerrarSesion();
        break;
      case 'CC':
        break;
    }
  }

  onClickCerrarSesion(): void {
    localStorage.clear();
    window.location.reload();
  }

  select(event){
    switch(event.item.properties.id){
      case "I":
        this.view = "I"; break;
      case "GP":
        this.view = "GP"; break;
      case "GR":
        this.view = "GR"; break;
      case "EXP":
        this.view = "EXP"; break;
    }
  }
}
