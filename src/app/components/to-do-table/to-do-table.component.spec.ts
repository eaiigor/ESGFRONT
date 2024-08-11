import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoTableComponent } from './to-do-table.component';

describe('ToDoTableComponent', () => {
  let component: ToDoTableComponent;
  let fixture: ComponentFixture<ToDoTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToDoTableComponent]
    });
    fixture = TestBed.createComponent(ToDoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
