import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpApiService } from '../common/http-api.service';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  host: any;
  constructor(public httpApiService: HttpApiService) { 
    this.host = environment.APPLICATION_APP_API_HOST;
  }

  iniciarSesion(parametro): any {
    return this.httpApiService.post(
      this.host, "/sesion/iniciar", 
      parametro
    );
  }

  listarParametro(parametro): any {
    return this.httpApiService.post(
      this.host, "/parametro/listar", 
      parametro
    );
  }
}
