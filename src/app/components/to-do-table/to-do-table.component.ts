import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Tarefa, TarefaService } from 'src/app/services/tarefa.service';

@Component({
  selector: 'app-to-do-table',
  templateUrl: './to-do-table.component.html',
  styleUrls: ['./to-do-table.component.scss']
})
export class ToDoTableComponent {
  @Input() tarefas: Tarefa[] = [];
  isAddingTask = false;
  editTask = false;
  editIndex: number | null = null;
  newTaskForm: FormGroup;
  editTaskForm: FormGroup;

  constructor(private tarefaService: TarefaService, private fb: FormBuilder, private toastr: ToastrService) {
    this.newTaskForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      dataVencimento: ['', Validators.required],
      status: [1, Validators.required]
    });

    this.editTaskForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      dataVencimento: ['', Validators.required],
      status: [1, Validators.required]
    });
  }

  getStatusText(status: number): string {
    switch (status) {
      case 1:
        return 'Pendente';
      case 2:
        return 'Em andamento';
      case 3:
        return 'Concluído';
      default:
        return 'Desconhecido';
    }
  }

  getStatusClass(status: number): string {
    switch (status) {
      case 1:
        return 'status-pendente';
      case 2:
        return 'status-andamento';
      case 3:
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
    this.newTaskForm.reset({
      titulo: '',
      descricao: '',
      dataVencimento: '',
      status: 1
    });
  }

  onSaveNewTask(): void {
    if (this.newTaskForm.valid) {
      const newTask: Tarefa = this.newTaskForm.value;
      this.tarefaService.addTarefa(newTask).subscribe((tarefa) => {
        this.tarefas.push(tarefa);
        this.toastr.success('Tarefa criada com sucesso!');
        this.isAddingTask = false;
        this.newTaskForm.reset({
          titulo: '',
          descricao: '',
          dataVencimento: '',
          status: 1
        });
      });
    }
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
    if (this.editTaskForm.valid) {
      const updatedTask: Tarefa = { ...this.editTaskForm.value, id: this.tarefas[index].id };
      this.tarefaService.updateTarefa(updatedTask).subscribe((tarefa) => {
        this.tarefas[index] = tarefa;
        this.editTask = false;
        this.editIndex = null;
      });

      this.toastr.success('Tarefa atualizada com sucesso!');
    }
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
    } else {
      throw new Error(`FormControl '${controlName}' not found or is not an instance of FormControl.`);
    }
  }

  isFieldInvalid(form: FormGroup, field: string) {
    const formControl = form.get(field);
    return formControl?.invalid && formControl?.touched;
  }
}