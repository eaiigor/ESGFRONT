import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarefa } from '../models/tarefa';
import { EStatusTarefa } from '../components/enums/EStatusTarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  private apiUrl = 'https://esgendpoints-15d5022e26aa.herokuapp.com/api/Tarefas';

  constructor(private http: HttpClient) { }

  getTarefas(status?: EStatusTarefa): Observable<Tarefa[]> {
    let params = { 'status': status || '' }

    return this.http.get<Tarefa[]>(this.apiUrl, {
      params
    });
  }

  addTarefa(tarefa: Tarefa): Observable<Tarefa> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Tarefa>(this.apiUrl, tarefa, { headers });
  }

  updateTarefa(tarefa: Tarefa): Observable<Tarefa> {
    const url = `${this.apiUrl}/${tarefa.id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Tarefa>(url, tarefa, { headers });
  }

  deleteTarefa(id: number): Observable<Tarefa> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Tarefa>(url);
  }
}
