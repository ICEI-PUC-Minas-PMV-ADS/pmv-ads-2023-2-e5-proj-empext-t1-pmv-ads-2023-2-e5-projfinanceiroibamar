import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Despesa } from 'src/app/despesas/despesa';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DespesaService {

  private readonly apiURL: string = environment.apiURLBase + "/Despesas";

  constructor(private http: HttpClient) { }

  listar(): Observable<Despesa[]> {
    const url = `${this.apiURL}`
    return this.http.get<Despesa[]>(url);
  }

  editar(despesa: Despesa): Observable<Despesa> {
    const url = `${this.apiURL}/${despesa.id}`
    return this.http.put<Despesa>(url, despesa);
  }

  criar(despesa: Despesa): Observable<Despesa> {
    const url = `${this.apiURL}`
    return this.http.post<Despesa>(url, despesa);
  }

  deletar(id: number): Observable<Despesa> {
    const url = `${this.apiURL}/${id}`
    return this.http.delete<Despesa>(url);
  }

  buscarPorId(id: number): Observable<Despesa> {
    const url = `${this.apiURL}/${id}`
    return this.http.get<Despesa>(url);
  }
}

