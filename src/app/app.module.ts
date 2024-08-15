import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeBr from '@angular/common/locales/pt';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToDoCardComponent } from './components/to-do-card/to-do-card.component';
import { ToDoCardsComponent } from './components/to-do-cards/to-do-cards.component';
import { ToDoContainerComponent } from './components/to-do-container/to-do-container.component';
import { ToDoTableComponent } from './components/to-do-table/to-do-table.component';
import { TodayDateComponent } from './components/today-date/today-date.component';
import { MainComponent } from './pages/main/main.component';

registerLocaleData(localeBr, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    ToDoTableComponent,
    ToDoCardsComponent,
    ToDoCardComponent,
    ToDoContainerComponent,
    TodayDateComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
