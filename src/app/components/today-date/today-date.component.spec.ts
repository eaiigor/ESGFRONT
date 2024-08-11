import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayDateComponent } from './today-date.component';

describe('TodayDateComponent', () => {
  let component: TodayDateComponent;
  let fixture: ComponentFixture<TodayDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodayDateComponent]
    });
    fixture = TestBed.createComponent(TodayDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
