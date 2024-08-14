import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-today-date',
  templateUrl: './today-date.component.html',
  styleUrls: ['./today-date.component.scss']
})
export class TodayDateComponent implements OnInit {
  greeting: string | undefined;

  currentDate = new Date();

  constructor() { }

  ngOnInit(): void {
    this.setCurrentDateAndGreeting();
  }

  setCurrentDateAndGreeting(): void {
    const date = new Date();

    const hours = date.getHours();

    if (hours < 12) {
      this.greeting = 'Bom dia.';

      return;
    }
    
    if (hours < 18) {
      this.greeting = 'Boa tarde.';
      
      return;
    }

    this.greeting = 'Boa noite.';
  }
}