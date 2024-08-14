import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoCardsComponent } from './to-do-cards.component';

describe('ToDoCardsComponent', () => {
  let component: ToDoCardsComponent;
  let fixture: ComponentFixture<ToDoCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToDoCardsComponent]
    });
    fixture = TestBed.createComponent(ToDoCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
