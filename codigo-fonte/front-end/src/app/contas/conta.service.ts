import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Conta } from './conta';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  private readonly apiURL: string = environment.apiURLBase + "/Contas";


  constructor(
    private http: HttpClient
  ) { }

  listar(usuarioId: number): Observable<Conta[]>{
    const url = `${this.apiURL}`
    return this.http.get<Conta[]>(url);
  }

  editar(conta: Conta): Observable<Conta> {
    const url = `${this.apiURL}/${conta.id}`
    return this.http.put<Conta>(url, conta);
  }

  criar(conta: Conta): Observable<Conta> {
    const url = `${this.apiURL}`
    return this.http.post<Conta>(url, conta);
  }


  buscarPorId(id: number): Observable<Conta> {
    const url = `${this.apiURL}/${id}`
    return this.http.get<Conta>(url);
  }

  enviar(id: number): Observable<Conta> {
    const url = `${this.apiURL}/${id}/enviar`
    return this.http.post<Conta>(url, null);
  }
}
