import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpApiService } from '../common/http-api.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  host: any;
  constructor(public httpApiService: HttpApiService) { 
    this.host = environment.APPLICATION_APP_API_HOST;
  }

  inicializar(parametro): any {
    return this.httpApiService.post(
      this.host, "/persona/inicializar", 
      parametro
    );
  }

  consultar(parametro): any {
    return this.httpApiService.post(
      this.host, "/persona/consultar", 
      parametro
    );
  }
  
  buscarPorDocumento(parametro): any {
    return this.httpApiService.post(
      this.host, "/persona/buscarPorDocumento", 
      parametro
    );
  }
  
  listar(parametro): any {
    return this.httpApiService.post(
      this.host, "/persona/listar", 
      parametro
    );
  }

  guardar(parametro): any {
    return this.httpApiService.post(
      this.host, "/persona/guardar", 
      parametro
    );
  }
  
  modificar(parametro): any {
    return this.httpApiService.post(
      this.host, "/persona/modificar", 
      parametro
    );
  }
  
  eliminar(parametro): any {
    return this.httpApiService.post(
      this.host, "/persona/eliminar", 
      parametro
    );
  }
}
