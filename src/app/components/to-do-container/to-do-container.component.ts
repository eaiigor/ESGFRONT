import { Component, Input, OnInit } from '@angular/core';
import { Tarefa } from 'src/app/models/tarefa';
import { EStatusTarefa } from '../enums/EStatusTarefa';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TarefaService } from 'src/app/services/tarefa.service';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-to-do-container',
  templateUrl: './to-do-container.component.html',
  styleUrls: ['./to-do-container.component.scss'],
})
export class ToDoContainerComponent implements OnInit {
  @Input() tarefas: Tarefa[] = [];

  isAddingTask = false;

  editingTask = false;

  editIndex: number | null = null;

  formGroup!: FormGroup;

  isMobile$!: Observable<boolean>;

  constructor(
    private tarefaService: TarefaService,
    private toastr: ToastrService,
    private breakpointObserver: BreakpointObserver,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.verifyView();
  }

  createForm(): void {
    this.formGroup = new FormGroup({
      titulo: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      dataVencimento: new FormControl('', Validators.required),
      status: new FormControl(1, Validators.required),
    });
  }

  statusTextMap = new Map<EStatusTarefa, string>([
    [EStatusTarefa.Pendente, 'Pendente'],
    [EStatusTarefa.EmAndamento, 'Em andamento'],
    [EStatusTarefa.Concluido, 'Concluído'],
  ]);

  statusClassMap = new Map<EStatusTarefa, string>([
    [EStatusTarefa.Pendente, 'status-pendente'],
    [EStatusTarefa.EmAndamento, 'status-andamento'],
    [EStatusTarefa.Concluido, 'status-concluido'],
  ]);

  statusClassTitleMap = new Map<EStatusTarefa, string>([
    [EStatusTarefa.Pendente, 'card-title-pendente'],
    [EStatusTarefa.EmAndamento, 'card-title-andamento'],
    [EStatusTarefa.Concluido, 'card-title-concluido'],
  ]);

  statusClassContentMap = new Map<EStatusTarefa, string>([
    [EStatusTarefa.Pendente, 'card-content-pendente'],
    [EStatusTarefa.EmAndamento, 'card-content-andamento'],
    [EStatusTarefa.Concluido, 'card-content-concluido'],
  ]);

  addNewTask(): void {
    if (this.editingTask) {
      this.toastr.warning('Você está editando uma tarefa, finalize a edição antes de adicionar uma nova!');
      return;
    }

    this.isAddingTask = true;
    this.resetForm();
  }

  cancelNewTask(): void {
    this.isAddingTask = false;
    this.resetForm();
  }

  saveNewTask(): void {
    this.formGroup.markAllAsTouched();
    this.formGroup.updateValueAndValidity();
    if (this.formGroup.invalid) {
      return;
    }

    const newTask: Tarefa = this.formGroup.value;

    this.tarefaService.addTarefa(newTask).subscribe((tarefa) => {
      this.tarefas.push(tarefa);

      this.isAddingTask = false;

      this.resetForm();

      this.toastr.success('Tarefa criada com sucesso!');
    });
  }

  resetForm(): void {
    this.formGroup.reset({
      titulo: '',
      descricao: '',
      dataVencimento: '',
      status: 1,
    });
  }

  editTask({ index, tarefa }: { index: number; tarefa: Tarefa }): void {
    if (this.isAddingTask) {
      this.toastr.warning('Você está adicionando uma nova tarefa, finalize a adição antes de editar uma existente!');
      return;
    }

    this.editIndex = index;
    this.editingTask = true;

    this.formGroup.setValue({
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      dataVencimento: this.datePipe.transform(tarefa.dataVencimento, 'yyyy-MM-dd') || '',
      status: tarefa.status,
    });
  }

  updateTask(index: number): void {
    if (this.formGroup.invalid) {
      return;
    }

    const updatedTask: Tarefa = { ...this.formGroup.value, id: this.tarefas[index].id };

    this.tarefaService.updateTarefa(updatedTask).subscribe((tarefa) => {
      this.tarefas[index] = tarefa;

      this.editingTask = false;

      this.editIndex = null;

      this.toastr.success('Tarefa atualizada com sucesso!');
    });
  }

  cancelEdit(): void {
    this.editingTask = false;
    this.editIndex = null;
  }

  deleteTask(id: number): void {
    if (confirm('Tem certeza que deseja deletar esta tarefa?')) {
      this.tarefaService.deleteTarefa(id).subscribe(() => {
        this.tarefas = this.tarefas.filter((tarefa) => tarefa.id !== id);
      });

      this.toastr.success('Tarefa deletada com sucesso!');
    }
  }

  verifyView(): void {
    this.isMobile$ = this.breakpointObserver.observe([Breakpoints.Handset]).pipe(map((result) => result.matches));
  }
}
