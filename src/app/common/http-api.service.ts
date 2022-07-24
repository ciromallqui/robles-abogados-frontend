import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Promise from "bluebird";

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  constructor(private http: HttpClient) { }

  post(host, path, parametros: any): any {
    console.log("POST: REQUEST ----> ", host + path, parametros);
    return new Promise((resolve) => {
      this.http.post(host + path, parametros)
        .subscribe(data => {
          console.log("POST: RESPONSE <----", data);
          resolve(data);
        });
    });
  }

  get(host, path): any {
    console.log("POST: REQUEST ----> ", host + path);
    return new Promise((resolve) => {
      this.http.get(host + path)
        .subscribe(data => {
          console.log("POST: RESPONSE <----", data);
          resolve(data);
        });
    });
  }

  postBlob(host, path, parametros: any): any {
    console.log("POST: REQUEST ----> ", host + path, parametros);
    return new Promise((resolve) => {
      this.http.post(host + path, parametros, {responseType: 'blob'})
        .subscribe(data => {
          console.log("POST: RESPONSE <----", data);
          resolve(data);
        });
    });
  }
}
