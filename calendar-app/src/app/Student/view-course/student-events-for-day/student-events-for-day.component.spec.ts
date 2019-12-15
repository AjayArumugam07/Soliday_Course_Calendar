import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEventsForDayComponent } from './student-events-for-day.component';

describe('StudentEventsForDayComponent', () => {
  let component: StudentEventsForDayComponent;
  let fixture: ComponentFixture<StudentEventsForDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentEventsForDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentEventsForDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
