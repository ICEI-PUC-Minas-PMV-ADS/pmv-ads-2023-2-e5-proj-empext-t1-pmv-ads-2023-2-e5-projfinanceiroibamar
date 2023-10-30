import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from './categoria';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private readonly apiURL: string = environment.apiURLBase + "/Categorias";


  constructor(
    private http: HttpClient
  ) { }

  listar(): Observable<Categoria[]>{
    const url = `${this.apiURL}`
    return this.http.get<Categoria[]>(url);
  }

  editar(categoria: Categoria): Observable<Categoria> {
    const url = `${this.apiURL}/${categoria.id}`
    return this.http.put<Categoria>(url, categoria);
  }

  criar(categoria: Categoria): Observable<Categoria> {
    const url = `${this.apiURL}`
    return this.http.post<Categoria>(url, categoria);
  }

  deletar(id: number): Observable<Categoria> {
    const url = `${this.apiURL}/${id}`
    return this.http.delete<Categoria>(url);
  }


  buscarPorId(id: number): Observable<Categoria> {
    const url = `${this.apiURL}/${id}`
    return this.http.get<Categoria>(url);
  }
}
