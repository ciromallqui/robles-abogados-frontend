import { Component, OnInit } from '@angular/core';
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
  ngOnInit(): void {
    this.reporteService.inicializar({}).then(res =>{
      this.expedientePorArea = res.data.expedientePorArea;
      this.expedienteTotal = res.data.expedientes.cantidad;
      this.cantidadPersona = res.data.personas.cantidad;
      this.cantidadUsuario = res.data.usuarios.cantidad;
    });
  }

}
