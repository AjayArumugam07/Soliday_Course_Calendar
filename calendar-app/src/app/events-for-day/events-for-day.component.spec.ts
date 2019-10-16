import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsForDayComponent } from './events-for-day.component';

describe('EventsForDayComponent', () => {
  let component: EventsForDayComponent;
  let fixture: ComponentFixture<EventsForDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsForDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsForDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
