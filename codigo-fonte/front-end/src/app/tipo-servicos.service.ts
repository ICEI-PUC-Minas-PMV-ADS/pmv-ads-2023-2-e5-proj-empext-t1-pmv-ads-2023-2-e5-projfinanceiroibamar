import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TipoServico } from './tipo-servicos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoServicosService {

  private readonly apiURL: string = environment.apiURLBase + "/TipoServicos";

  constructor(
    private http: HttpClient
    ) { }

    listar(): Observable<TipoServico[]>{
      return this.http.get<TipoServico[]>(`${this.apiURL}`);
    }
}





