import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Despesa } from 'src/app/despesas/despesa';
import { Observable } from 'rxjs';
import { DespesaDTO } from './despesaDTO';
import { RelatorioDespesaDTO } from '../relatorios/rel-despesas/relatorio-despesa';

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

  editar(despesa: DespesaDTO): Observable<Despesa> {
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
  
  downloadPdfDespesas(relatorioDespesaDTO: RelatorioDespesaDTO) {
    const url = `${this.apiURL}/gerarRelatorioDespesas`;

    let dataInicio: string = '';
    if (relatorioDespesaDTO.dataInicio) {
      dataInicio = relatorioDespesaDTO.dataInicio.toLocaleString().substring(0,10).toString();
    }

    let dataFim: string = '';
    if (relatorioDespesaDTO.dataFim) {
      dataFim = relatorioDespesaDTO.dataFim.toLocaleString().substring(0,10).toString();
    }
    

    let queryParams = new HttpParams();
    queryParams = queryParams.append('dataInicio', dataInicio);
    queryParams = queryParams.append('dataFim', dataFim);
    queryParams = queryParams.append('fornecedorId', relatorioDespesaDTO.fornecedorId ? relatorioDespesaDTO.fornecedorId: 0);
    queryParams = queryParams.append('contaId', relatorioDespesaDTO.contaId ? relatorioDespesaDTO.contaId: 0);
    queryParams = queryParams.append('categoriaId', relatorioDespesaDTO.categoriaId ? relatorioDespesaDTO.categoriaId: 0);
    
    console.log(dataInicio)
    console.log(dataFim)
    console.log(queryParams)
    return this.http.get(url, {params: queryParams, responseType: 'arraybuffer'});
  }
}

