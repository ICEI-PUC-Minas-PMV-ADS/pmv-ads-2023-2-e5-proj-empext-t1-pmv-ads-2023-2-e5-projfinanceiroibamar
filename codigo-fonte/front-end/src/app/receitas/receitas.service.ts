import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Receita } from './receitas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {

  private readonly apiURL: string = environment.apiURLBase + "/Receitas";

  constructor(private http: HttpClient) { }

  listar(): Observable<Receita[]> {
    const url = `${this.apiURL}`
    return this.http.get<Receita[]>(url);
  }

  editar(receita: Receita): Observable<Receita> {
    const url = `${this.apiURL}/${receita.id}`
    return this.http.put<Receita>(url, receita);
  }

  criar(receita: Receita): Observable<Receita> {
    const url = `${this.apiURL}`
    return this.http.post<Receita>(url, receita);
  }

  deletar(id: number): Observable<Receita> {
    const url = `${this.apiURL}/${id}`
    return this.http.delete<Receita>(url);
  }

  buscarPorId(id: number): Observable<Receita> {
    const url = `${this.apiURL}/${id}`
    return this.http.get<Receita>(url);
  }
}

