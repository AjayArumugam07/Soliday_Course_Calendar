import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCardCalendarComponent } from './student-card-calendar.component';

describe('StudentCardCalendarComponent', () => {
  let component: StudentCardCalendarComponent;
  let fixture: ComponentFixture<StudentCardCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCardCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCardCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
