import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCalendarComponent } from './card-calendar.component';

describe('CardCalendarComponent', () => {
  let component: CardCalendarComponent;
  let fixture: ComponentFixture<CardCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
