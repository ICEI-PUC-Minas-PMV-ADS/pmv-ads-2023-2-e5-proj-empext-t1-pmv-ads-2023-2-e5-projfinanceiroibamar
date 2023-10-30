import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Membro } from './membro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembroService {

  private readonly apiURL: string = environment.apiURLBase + "/Membros";


  constructor(
    private http: HttpClient
  ) { }

  listar(): Observable<Membro[]>{
    const url = `${this.apiURL}`
    return this.http.get<Membro[]>(url);
  }

  editar(membro: Membro): Observable<Membro> {
    const url = `${this.apiURL}/${membro.id}`
    return this.http.put<Membro>(url, membro);
  }

  criar(membro: Membro): Observable<Membro> {
    const url = `${this.apiURL}`
    console.log(membro)
    return this.http.post<Membro>(url, membro);
  }

  deletar(id: number): Observable<Membro> {
    const url = `${this.apiURL}/${id}`
    return this.http.delete<Membro>(url);
  }


  buscarPorId(id: number): Observable<Membro> {
    const url = `${this.apiURL}/${id}`
    return this.http.get<Membro>(url);
  }
}
