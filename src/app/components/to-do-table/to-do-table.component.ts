import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Tarefa } from 'src/app/models/tarefa';
import { TarefaService } from 'src/app/services/tarefa.service';
import { EStatusTarefa } from '../enums/EStatusTarefa';

@Component({
  selector: 'app-to-do-table',
  templateUrl: './to-do-table.component.html',
  styleUrls: ['./to-do-table.component.scss']
})
export class ToDoTableComponent implements OnInit {
  @Input() tarefas: Tarefa[] = [];

  isAddingTask = false;

  editTask = false;

  editIndex: number | null = null;
  
  newTaskForm!: FormGroup;
  
  editTaskForm!: FormGroup;

  statusTarefaEnum = EStatusTarefa;

  constructor(private tarefaService: TarefaService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createForm();
    this.editForm();
  }

  createForm(): void {
    this.newTaskForm = new FormGroup({
      titulo: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      dataVencimento: new FormControl('', Validators.required),
      status: new FormControl(1, Validators.required)
    })
  }

  editForm(): void {
    this.editTaskForm = new FormGroup({
      titulo: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      dataVencimento: new FormControl('', Validators.required),
      status: new FormControl(1, Validators.required)
    })
  }

  getStatusText(status: number): string {
    switch (status) {
      case EStatusTarefa.Pendente:
        return 'Pendente';

      case EStatusTarefa.EmAndamento:
        return 'Em andamento';

      case EStatusTarefa.Concluido:
        return 'Concluído';

      default:
        return 'Desconhecido';
    }
  }

  getStatusClass(status: number): string {
    switch (status) {
      case EStatusTarefa.Pendente:
        return 'status-pendente';

      case EStatusTarefa.EmAndamento:
        return 'status-andamento';

      case EStatusTarefa.Concluido:
        return 'status-concluido';

      default:
        return '';
    }
  }

  onAddNewTask(): void {
    this.isAddingTask = true;
  }

  onCancelNewTask(): void {
    this.isAddingTask = false;
    this.resetNewTaskForm();
  }

  onSaveNewTask(): void {
    if (this.newTaskForm.invalid) {
      return;
    }

    const newTask: Tarefa = this.newTaskForm.value;

    this.tarefaService.addTarefa(newTask).subscribe((tarefa) => {

      this.tarefas.push(tarefa);

      this.isAddingTask = false;

      this.resetNewTaskForm();

      this.toastr.success('Tarefa criada com sucesso!');
    });
  }

  resetNewTaskForm(): void {
    this.newTaskForm.reset({
      titulo: '',
      descricao: '',
      dataVencimento: '',
      status: 1
    });
  }

  onEdit(index: number, tarefa: Tarefa): void {
    this.editIndex = index;

    this.editTask = true;

    this.editTaskForm.setValue({
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      dataVencimento: tarefa.dataVencimento,
      status: tarefa.status
    });
  }

  onUpdateTask(index: number): void {
    if (this.editTaskForm.invalid) {
      return;
    }

    const updatedTask: Tarefa = { ...this.editTaskForm.value, id: this.tarefas[index].id };

    this.tarefaService.updateTarefa(updatedTask).subscribe((tarefa) => {
      this.tarefas[index] = tarefa;

      this.editTask = false;
      
      this.editIndex = null;

      this.toastr.success('Tarefa atualizada com sucesso!');
    });
  }

  onCancelEdit(): void {
    this.editTask = false;
    this.editIndex = null;
  }

  onDelete(id: number): void {
    if (confirm('Tem certeza que deseja deletar esta tarefa?')) {
      this.tarefaService.deleteTarefa(id).subscribe(() => {
        this.tarefas = this.tarefas.filter(tarefa => tarefa.id !== id);
      });

      this.toastr.success('Tarefa deletada com sucesso!');
    }
  }

  getFormControl(controlName: string): FormControl {
    const control = this.editTaskForm.get(controlName);

    if (control instanceof FormControl) {
      return control;
    }

    throw new Error(`FormControl '${controlName}' not found or is not an instance of FormControl.`);
  }

  isFieldInvalid(form: FormGroup, field: string) {
    const formControl = form.get(field);
    return formControl?.invalid && formControl?.touched;
  }
}