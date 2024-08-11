import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ToDoTableComponent } from './components/to-do-table/to-do-table.component';
import { PostItWallComponent } from './components/post-it-wall/post-it-wall.component';
import { TodayDateComponent } from './components/today-date/today-date.component';
import { MainComponent } from './pages/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    ToDoTableComponent,
    PostItWallComponent,
    TodayDateComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
