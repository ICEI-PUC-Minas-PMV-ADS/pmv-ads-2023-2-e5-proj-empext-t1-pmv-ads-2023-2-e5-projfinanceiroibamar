import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CepServiceService {

  constructor(private http: HttpClient) { }

  buscar(cep: string){
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
  }

}
