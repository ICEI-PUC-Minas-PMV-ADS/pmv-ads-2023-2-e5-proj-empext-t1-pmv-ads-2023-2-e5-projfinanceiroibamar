import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Receita } from './receitas';
import { Observable } from 'rxjs';
import { ReceitaDTO } from './receitasDTO';
import { RelatorioReceitaDTO } from '../relatorios/rel-receitas/relatorio-receita';

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

  editar(receitaDTO: ReceitaDTO): Observable<Receita> {
    const url = `${this.apiURL}/${receitaDTO.id}`
    return this.http.put<Receita>(url, receitaDTO);
  }

  criar(receita: ReceitaDTO): Observable<Receita> {
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

  downloadPdfReceitas(relatorioReceitaDTO: RelatorioReceitaDTO) {
    const url = `${this.apiURL}/gerarRelatorioReceitas`;

    let dataInicio: string = '';
    if (relatorioReceitaDTO.dataInicio) {
      dataInicio = relatorioReceitaDTO.dataInicio.toLocaleString().substring(0,10).toString();
    }

    let dataFim: string = '';
    if (relatorioReceitaDTO.dataFim) {
      dataFim = relatorioReceitaDTO.dataFim.toLocaleString().substring(0,10).toString();
    }
    

    let queryParams = new HttpParams();
    queryParams = queryParams.append('dataInicio', dataInicio);
    queryParams = queryParams.append('dataFim', dataFim);
    queryParams = queryParams.append('membroId', relatorioReceitaDTO.membroId ? relatorioReceitaDTO.membroId: 0);
    queryParams = queryParams.append('contaId', relatorioReceitaDTO.contaId ? relatorioReceitaDTO.contaId: 0);
    queryParams = queryParams.append('categoriaId', relatorioReceitaDTO.categoriaId ? relatorioReceitaDTO.categoriaId: 0);
    
    console.log(dataInicio)
    console.log(dataFim)
    console.log(queryParams)
    return this.http.get(url, {params: queryParams, responseType: 'arraybuffer'});
  }
}

