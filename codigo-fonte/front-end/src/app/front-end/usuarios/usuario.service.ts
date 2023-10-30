import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from './usuario';
import { useAnimation } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly apiURL: string = environment.apiURLBase + "/Usuarios";


  constructor(
    private http: HttpClient
  ) { }

  listar(): Observable<Usuario[]>{
    const url = `${this.apiURL}`
    return this.http.get<Usuario[]>(url);
  }

  editar(usuario: Usuario): Observable<Usuario> {
    const url = `${this.apiURL}/${usuario.id}`
    return this.http.put<Usuario>(url, usuario);
  }

  criar(usuario: Usuario): Observable<Usuario> {
    const url = `${this.apiURL}`
    return this.http.post<Usuario>(url, usuario);
  }

  desativar(id: number): Observable<Usuario> {
    const url = `${this.apiURL}/${id}`
    return this.http.delete<Usuario>(url);
  }

  buscarPorId(id: number): Observable<Usuario> {
    const url = `${this.apiURL}/${id}`
    return this.http.get<Usuario>(url);
  }
}
