import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Tarefa } from 'src/app/models/tarefa';
import { TarefaService } from 'src/app/services/tarefa.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  tarefas: Tarefa[] = [];

  isMobile$!: Observable<boolean>;

  constructor(private tarefaService: TarefaService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.getTarefas();

    this.verifyView();
  }

  verifyView(): void {
    this.isMobile$ = this.breakpointObserver.observe([Breakpoints.Handset])
      .pipe(
        map(result => result.matches)
      );
  }

  getTarefas(): void {
    this.tarefaService.getTarefas().subscribe((data: Tarefa[]) => {
      this.tarefas = data;
    });
  }
}
