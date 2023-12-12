import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  private readonly apiURL: string = environment.apiURLBase + "/RelatorioMensal";

  constructor(private http: HttpClient) { }

  
  downloadPdfRelatorio(mes: string, ano: string) {
    const url = `${this.apiURL}/gerarRelatorioMensal`;

    if (mes && ano) {
      let queryParams = new HttpParams();
      queryParams = queryParams.append('mes', mes);
      queryParams = queryParams.append('ano', ano);

      console.log(mes)
      console.log(ano)

      return this.http.get(url, {params: queryParams, responseType: 'arraybuffer'});
    }
    return this.http.get(url, {responseType: 'arraybuffer'});
  }
}
