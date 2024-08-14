import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarefa } from '../models/tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  private apiUrl = 'https://localhost:5000/api/Tarefas';

  constructor(private http: HttpClient) { }

  getTarefas(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.apiUrl);
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
