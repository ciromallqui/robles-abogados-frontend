import { Component, OnInit } from '@angular/core';
import { MenuEventArgs, MenuItemModel } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'menu-administrador',
  templateUrl: './menu-administrador.component.html',
  styleUrls: ['./menu-administrador.component.css']
})
export class MenuAdministradorComponent implements OnInit {

  constructor() { }

  public AccountMenuItem: MenuItemModel[] = [];
  public menuItems: MenuItemModel[] = [
    {text: 'INICIO', id: 'I'},{text: 'Gestión de Personas', id: 'GP'},{text: 'Gestión de Usuarios/Perfiles', id: 'GR'}, {separator: true},
    {text: 'Expedientes', id: 'EXP'}
  ];

  view: string = "I";
  areaInput: string;

  ngOnInit(): void {
    this.AccountMenuItem = [{
      text: localStorage.getItem("NOMBRE_COMPLETO"),
      items: [{text: 'Cambiar clave', id: 'CC'}, {text: 'Cerrar sesión', id: 'CS'}]
    }];
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
        this.areaInput = "1";
        this.view = "EXP"; break;
    }
  }
}
