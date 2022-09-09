import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReporteService } from 'src/app/services/reporte.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private reporteService: ReporteService) { }

  expedientePorArea: [];
  expedienteTotal: number;
  cantidadPersona: number;
  cantidadUsuario: number;
  documentoBuscado: number;
  documentoEncontrado: number;
  fechaBusquedaDoc: string;

  expedienteDerivado: number;
  expedienteAtendido: number;
  fechaBusquedaExp: string;

  public month: number = new Date().getMonth();
  public fullYear: number = new Date().getFullYear();
  public date: number = new Date().getDate();
  indicador: any = {};
  fechaIndicador: any;
  pipe = new DatePipe('en-US');

  @ViewChild('fecha') public fecha: any;

  ngOnInit(): void {
    this.indicador.fecha = this.fullYear +'-'+ (this.month+1) +'-'+ this.date;
    this.fechaIndicador = new Date(this.fullYear, this.month, this.date, 7, 0, 0);
    this.inicializar();
  }

  inicializar(){
    this.reporteService.inicializar(this.indicador).then(res =>{
      this.expedientePorArea = res.data.expedientePorArea;
      this.expedienteTotal = res.data.expedientes.cantidad;
      this.cantidadPersona = res.data.personas.cantidad;
      this.cantidadUsuario = res.data.usuarios.cantidad;

      this.documentoBuscado = res.data.documentoBuscado.cantidad;
      this.documentoEncontrado = res.data.documentoEncontrado.cantidad;
      this.fechaBusquedaDoc = res.data.documentoEncontrado.fechaBusqueda;
      
      this.expedienteDerivado = res.data.expedienteDerivado.cantidad;
      this.expedienteAtendido = res.data.expedienteAtendido.cantidad;
      this.fechaBusquedaExp = res.data.expedienteDerivado.fechaBusqueda;
    });
  }

  onSelectFecha(event){
    this.indicador.fecha = this.pipe.transform(event.value, 'yyyy-MM-dd');
    this.inicializar();
  }
}
