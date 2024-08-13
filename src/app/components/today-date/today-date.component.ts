import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-today-date',
  templateUrl: './today-date.component.html',
  styleUrls: ['./today-date.component.scss']
})
export class TodayDateComponent implements OnInit {
  currentMonth: string | undefined;
  currentDayMonth: string | undefined;
  greeting: string | undefined;

  ngOnInit() {
    this.setCurrentDateAndGreeting();
  }

  setCurrentDateAndGreeting() {
    const date = new Date();
    const hours = date.getHours();

    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    this.currentMonth = monthNames[date.getMonth()];
    this.currentDayMonth = `${date.getDate()}/${date.getMonth() + 1}`;
    
    if (hours < 12) {
      this.greeting = 'Bom dia.';
    } else if (hours < 18) {
      this.greeting = 'Boa tarde.';
    } else {
      this.greeting = 'Boa noite.';
    }
  }
}