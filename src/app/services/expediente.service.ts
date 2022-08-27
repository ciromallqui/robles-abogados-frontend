import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpApiService } from '../common/http-api.service';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteService {

  host: any;
  constructor(public httpApiService: HttpApiService) { 
    this.host = environment.APPLICATION_APP_API_HOST;
  }

  inicializar(parametro): any {
    return this.httpApiService.post(
      this.host, "/expediente/inicializar", 
      parametro
    );
  }

  listar(parametro): any {
    return this.httpApiService.post(
      this.host, "/expediente/listar", 
      parametro
    );
  }

  agregar(parametro): any {
    return this.httpApiService.post(
      this.host, "/expediente/agregar", 
      parametro
    );
  }
  
  modificar(parametro): any {
    return this.httpApiService.post(
      this.host, "/expediente/modificar", 
      parametro
    );
  }
  
  actualizarArea(parametro): any {
    return this.httpApiService.post(
      this.host, "/expediente/actualizarArea", 
      parametro
    );
  }
  
  eliminar(parametro): any {
    return this.httpApiService.post(
      this.host, "/expediente/eliminar", 
      parametro
    );
  }
}
