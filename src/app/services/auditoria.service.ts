import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpApiService } from '../common/http-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaService {

  host: any;
  constructor(public httpApiService: HttpApiService) { 
    this.host = environment.APPLICATION_APP_API_HOST;
  }

  agregar(parametro): any {
    return this.httpApiService.post(
      this.host, "/auditoria/agregar", 
      parametro
    );
  }
  
  modificar(parametro): any {
    return this.httpApiService.post(
      this.host, "/auditoria/modificar", 
      parametro
    );
  }
}
