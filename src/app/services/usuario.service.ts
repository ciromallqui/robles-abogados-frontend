import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpApiService } from '../common/http-api.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  host: any;
  constructor(public httpApiService: HttpApiService) { 
    this.host = environment.APPLICATION_APP_API_HOST;
  }

  inicializar(parametro): any {
    return this.httpApiService.post(
      this.host, "/usuario/inicializar", 
      parametro
    );
  }

  listar(parametro): any {
    return this.httpApiService.post(
      this.host, "/usuario/listar", 
      parametro
    );
  }

  agregar(parametro): any {
    return this.httpApiService.post(
      this.host, "/usuario/agregar", 
      parametro
    );
  }

  modificar(parametro): any {
    return this.httpApiService.post(
      this.host, "/usuario/modificar", 
      parametro
    );
  }
}
