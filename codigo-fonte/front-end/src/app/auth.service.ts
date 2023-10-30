import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioLogin } from './login/usuarioLogin';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly apiURL: string = environment.apiURLBase + "/Usuarios/cadastrar";
  private readonly tokenURL: string = environment.apiURLBase + "/Usuarios/login";
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient
  ) { }

  obterToken(){
    const tokenString = localStorage.getItem('access_token');
    if (tokenString) {
      const token = JSON.parse(tokenString).token;
      return token;
    }
    return null;
  }

  encerrarSessao(){
    localStorage.removeItem('access_token');
  }

  getUsuarioAutenticado(){
    const token = this.obterToken();
    if (token) {
      const usuario = this.jwtHelper.decodeToken(token).email;
      return usuario;
    }
    return null;
  }

  getUsuarioId(): number{
    const token = this.obterToken();
    if (token) {
      const usuarioId: number = this.jwtHelper.decodeToken(token).nameid;
      return usuarioId;
    }
    return 0;
  }

  getRole(): string{
    const token = this.obterToken();
    if (token) {
      const role: string = this.jwtHelper.decodeToken(token).role;
      return role;
    }
    return '';
  }

  isAutheticated(): boolean{
    const token = this.obterToken();
    if (token) {
      const expired = this.jwtHelper.isTokenExpired(token);
      return !expired;
    }
    return false;
  }

   tentarLogar( username: string, password: string): Observable<any>{
    /*const params = new HttpParams()
                                        .set('username', username)
                                        .set('password', password)
                                        .set('grant_type', 'password');
    const headers = {
      //'Authorization' : 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
      'Content-Type' : 'application/x-www-form-urlencoded'
    }
    */
    const usuario: UsuarioLogin= new UsuarioLogin();
    usuario.login = username;
    usuario.senha = password;
    return this.http.post<any>(this.tokenURL, usuario);
  }
}
