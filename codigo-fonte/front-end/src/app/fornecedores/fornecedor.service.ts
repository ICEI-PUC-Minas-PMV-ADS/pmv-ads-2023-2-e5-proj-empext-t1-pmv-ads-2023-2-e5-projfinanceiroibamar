import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Fornecedor } from './fornecedor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  private readonly apiURL: string = environment.apiURLBase + "/Fornecedores";


  constructor(
    private http: HttpClient
  ) { }

  listar(): Observable<Fornecedor[]>{
    const url = `${this.apiURL}`
    return this.http.get<Fornecedor[]>(url);
  }

  editar(fornecedor: Fornecedor): Observable<Fornecedor> {
    const url = `${this.apiURL}/${fornecedor.id}`
    return this.http.put<Fornecedor>(url, fornecedor);
  }

  criar(fornecedor: Fornecedor): Observable<Fornecedor> {
    const url = `${this.apiURL}`
    console.log(fornecedor)
    return this.http.post<Fornecedor>(url, fornecedor);
  }

  deletar(id: number): Observable<Fornecedor> {
    const url = `${this.apiURL}/${id}`
    return this.http.delete<Fornecedor>(url);
  }


  buscarPorId(id: number): Observable<Fornecedor> {
    const url = `${this.apiURL}/${id}`
    return this.http.get<Fornecedor>(url);
  }
}
