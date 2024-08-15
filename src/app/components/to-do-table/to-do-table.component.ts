import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Tarefa } from 'src/app/models/tarefa';
import { EStatusTarefa } from '../enums/EStatusTarefa';

@Component({
  selector: 'app-to-do-table',
  templateUrl: './to-do-table.component.html',
  styleUrls: ['./to-do-table.component.scss'],
})
export class ToDoTableComponent {
  @Input() tarefas: Tarefa[] = [];

  @Input() isAddingTask = false;

  @Input() editingTask = false;

  @Input() editIndex: number | null = null;

  @Input() formGroup!: FormGroup;

  @Input() statusText = new Map<EStatusTarefa, string>();

  @Input() statusClass = new Map<EStatusTarefa, string>();

  @Output() cancelNewTask = new EventEmitter<void>();

  @Output() saveNewTask = new EventEmitter<void>();

  @Output() editTask = new EventEmitter<{ index: number; tarefa: Tarefa }>();

  @Output() cancelEdit = new EventEmitter<void>();

  @Output() deleteTask = new EventEmitter<number>();

  @Output() updateTask = new EventEmitter<number>();

  statusTarefaEnum = EStatusTarefa;

  constructor() {}

  onCancelNewTask(): void {
    this.cancelNewTask.emit();
  }

  onSaveNewTask(): void {
    this.saveNewTask.emit();
  }

  onEdit(index: number, tarefa: Tarefa): void {
    this.editTask.emit({ index, tarefa });
  }

  onCancelEdit(): void {
    this.cancelEdit.emit();
  }

  onDelete(id: number): void {
    this.deleteTask.emit(id);
  }

  onUpdateTask(index: number): void {
    console;
    this.updateTask.emit(index);
  }

  getStatusText = (status: EStatusTarefa): string => this.statusText.get(status) || 'desconhecido';

  getStatusClass = (status: EStatusTarefa): string => this.statusClass.get(status) || '';

  getFormControl(controlName: string): FormControl {
    const control = this.formGroup.get(controlName);

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
