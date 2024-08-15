import { Component, OnInit } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { EStatusTarefa } from 'src/app/components/enums/EStatusTarefa';
import { Tarefa } from 'src/app/models/tarefa';
import { TarefaService } from 'src/app/services/tarefa.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  tarefas$: Observable<Tarefa[]> = of([]);

  constructor(private tarefaService: TarefaService) { }

  ngOnInit(): void {
    this.getTarefas();
  }

  getTarefas(status?: EStatusTarefa): void {
    this.tarefas$ = this.tarefaService
      .getTarefas(Number(status) > 0 ? status : undefined)
      .pipe(map(tarefas => tarefas
        .sort((a: Tarefa, b: Tarefa) => a.dataVencimento.localeCompare(b.dataVencimento)) // ordena por dada
      ));
  }
}
