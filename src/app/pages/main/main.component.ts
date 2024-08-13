import { Component, OnInit } from '@angular/core';
import { Tarefa, TarefaService } from 'src/app/services/tarefa.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  tarefas: Tarefa[] = [];

  constructor(private tarefaService: TarefaService) {}

  ngOnInit() {
    this.getTarefas();
  }

  getTarefas() {
    this.tarefaService.getTarefas().subscribe((data: Tarefa[]) => {
      this.tarefas = data;
    });
  }

  /* addTarefa() {
    const novaTarefa: Tarefa = {
      titulo: 'Nova Tarefa',
      descricao: 'Descrição da nova tarefa',
      dataVencimento: '2024-08-20T00:00:00',
      status: 5
    };

    this.tarefaService.addTarefa(novaTarefa).subscribe(() => {
      this.getTarefas();
    });
  } */
}
