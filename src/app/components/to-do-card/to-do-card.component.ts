import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EStatusTarefa } from '../enums/EStatusTarefa';
import { Tarefa } from 'src/app/models/tarefa';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-to-do-card',
  templateUrl: './to-do-card.component.html',
  styleUrls: ['./to-do-card.component.scss'],
})
export class ToDoCardComponent {
  statusTarefaEnum = EStatusTarefa;

  @Input() formGroup!: FormGroup;

  @Input() statusText = new Map<EStatusTarefa, string>();

  @Input() statusClass = new Map<EStatusTarefa, string>();

  @Input() statusClassTitle = new Map<EStatusTarefa, string>();

  @Input() statusClassContent = new Map<EStatusTarefa, string>();

  @Input() isAddingTask = false;

  @Input() editingTask = false;

  @Input() editIndex: number | null = null;

  @Input() tarefa = {} as Tarefa;

  @Input() cardIndex = 0;

  @Output() editTask = new EventEmitter<void>();

  @Output() cancelEdit = new EventEmitter<void>();

  @Output() deleteTask = new EventEmitter<number>();

  @Output() submitTask = new EventEmitter<number>();

  get isEdittingOrAdding(): boolean {
    return this.isAddingTask || (this.editingTask && this.editIndex === this.cardIndex);
  }

  constructor() {}

  getStatusText = (status: EStatusTarefa): string => this.statusText.get(status) || '';

  getStatusClass = (status: EStatusTarefa): string => this.statusClass.get(status) || '';

  getStatusClassTitle = (status: EStatusTarefa): string => this.statusClassTitle.get(status) || 'card-title-default';

  getStatusClassContent = (status: EStatusTarefa): string =>
    this.statusClassContent.get(status) || 'card-content-default';

  isFieldInvalid(form: FormGroup, field: string) {
    const formControl = form.get(field);
    return formControl?.invalid && formControl?.touched;
  }
}
