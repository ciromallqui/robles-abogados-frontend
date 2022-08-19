import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpApiService } from '../common/http-api.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  host: any;
  constructor(public httpApiService: HttpApiService) { 
    this.host = environment.APPLICATION_APP_API_HOST;
  }

  agregar(parametro): any {
    return this.httpApiService.post(
      this.host, "/documento/agregar", 
      parametro
    );
  }
  
  listar(parametro): any {
    return this.httpApiService.post(
      this.host, "/documento/listar", 
      parametro
    );
  }
}
