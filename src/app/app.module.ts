import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { DialogAllModule, TooltipModule } from '@syncfusion/ej2-angular-popups';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SesionHostComponent } from './views/sesion-host/sesion-host.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptorService } from './common/auth-interceptor.service';
import { MenuAdministradorComponent } from './views/menu-administrador/menu-administrador.component';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { PersonaListadoComponent } from './views/persona/persona-listado/persona-listado.component';
import { PersonaDetalleComponent } from './views/persona/persona-detalle/persona-detalle.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { UsuarioListadoComponent } from './views/usuario/usuario-listado/usuario-listado.component';
import { UsuarioDetalleComponent } from './views/usuario/usuario-detalle/usuario-detalle.component';
import { ExpedienteListadoComponent } from './views/expediente/expediente-listado/expediente-listado.component';
import { ExpedienteDetalleComponent } from './views/expediente/expediente-detalle/expediente-detalle.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ExpedienteDocumentoComponent } from './views/expediente/expediente-documento/expediente-documento.component';
import { ExpedienteMostrarComponent } from './views/expediente/expediente-mostrar/expediente-mostrar.component';
import { ExpedienteDocumentoDetalleComponent } from './views/expediente/expediente-documento-detalle/expediente-documento-detalle.component';
import { ReporteExpedienteComponent } from './views/reporte/reporte-expediente/reporte-expediente.component';

@NgModule({
  declarations: [
    AppComponent,
    SesionHostComponent,
    MenuAdministradorComponent,
    PersonaListadoComponent,
    PersonaDetalleComponent,
    DashboardComponent,
    UsuarioListadoComponent,
    UsuarioDetalleComponent,
    ExpedienteListadoComponent,
    ExpedienteDetalleComponent,
    ExpedienteDocumentoComponent,
    ExpedienteMostrarComponent,
    ExpedienteDocumentoDetalleComponent,
    ReporteExpedienteComponent
  ],
  imports: [
    BrowserModule,
    KanbanModule,
    ButtonModule,
    TextBoxModule,
    DialogAllModule,
    GridAllModule,
    DropDownListModule,
    HttpClientModule,
    MenuModule,
    FormsModule,
    TooltipModule,
    DatePickerModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
