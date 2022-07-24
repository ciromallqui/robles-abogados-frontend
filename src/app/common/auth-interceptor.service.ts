import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptorService implements HttpInterceptor {

  constructor() {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('TOKEN');
    let request = req;
    if (token) {
      request = req.clone({ //Clonamos el token y lo mandamos en la cabecera de todas las peticiones HTTP
        setHeaders: {
          Authorization: `${ token }` //El tipo de autorizaciòn depende del back
        }
      });
    }
    return next.handle(request);
  }
}
