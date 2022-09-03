import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpApiService } from '../common/http-api.service';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  host: any;
  constructor(public httpApiService: HttpApiService) { 
    this.host = environment.APPLICATION_APP_API_HOST;
  }

  inicializar(parametro): any {
    return this.httpApiService.post(
      this.host, "/reporte/inicializar", 
      parametro
    );
  }
  
  expediente(parametro): any {
    return this.httpApiService.post(
      this.host, "/reporte/expediente", 
      parametro
    );
  }
}
