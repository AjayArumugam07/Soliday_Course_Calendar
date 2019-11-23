import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCalendarComponent } from './create-calendar.component';

describe('CreateCalendarComponent', () => {
  let component: CreateCalendarComponent;
  let fixture: ComponentFixture<CreateCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
