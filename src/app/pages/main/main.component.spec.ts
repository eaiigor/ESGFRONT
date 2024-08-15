import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { AppComponent } from 'src/app/app.component';
import { ToDoCardsComponent } from 'src/app/components/to-do-cards/to-do-cards.component';
import { ToDoTableComponent } from 'src/app/components/to-do-table/to-do-table.component';
import { ToDoCardComponent } from 'src/app/components/to-do-card/to-do-card.component';
import { TodayDateComponent } from 'src/app/components/today-date/today-date.component';
import { ToDoContainerComponent } from 'src/app/components/to-do-container/to-do-container.component';
import { TarefaService } from 'src/app/services/tarefa.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent,
        ToDoTableComponent,
        ToDoCardsComponent,
        ToDoCardComponent,
        ToDoContainerComponent,
        TodayDateComponent,
        MainComponent,
      ],
      providers: [TarefaService, DatePipe],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
      ]
    });
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
