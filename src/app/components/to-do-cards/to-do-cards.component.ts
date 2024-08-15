import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Tarefa } from 'src/app/models/tarefa';
import { EStatusTarefa } from '../enums/EStatusTarefa';

@Component({
  selector: 'app-to-do-cards',
  templateUrl: './to-do-cards.component.html',
  styleUrls: ['./to-do-cards.component.scss'],
})
export class ToDoCardsComponent {
  @Input() tarefas: Tarefa[] = [];

  @Input() isAddingTask = false;

  @Input() editingTask = false;

  @Input() editIndex: number | null = null;

  @Input() formGroup!: FormGroup;

  @Input() statusText = new Map<EStatusTarefa, string>();

  @Input() statusClass = new Map<EStatusTarefa, string>();

  @Input() statusClassTitle = new Map<EStatusTarefa, string>();

  @Input() statusClassContent = new Map<EStatusTarefa, string>();

  @Output() cancelNewTask = new EventEmitter<void>();

  @Output() saveNewTask = new EventEmitter<void>();

  @Output() editTask = new EventEmitter<{ index: number; tarefa: Tarefa }>();

  @Output() cancelEdit = new EventEmitter<void>();

  @Output() deleteTask = new EventEmitter<number>();

  @Output() updateTask = new EventEmitter<number>();

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
    this.updateTask.emit(index);
  }

  getFormControl(controlName: string): FormControl {
    const control = this.formGroup.get(controlName);

    if (control instanceof FormControl) {
      return control;
    }

    throw new Error(`FormControl '${controlName}' not found or is not an instance of FormControl.`);
  }
}
