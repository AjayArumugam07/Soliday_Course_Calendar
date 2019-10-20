import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventInputComponent } from './event-input.component';

describe('EventInputComponent', () => {
  let component: EventInputComponent;
  let fixture: ComponentFixture<EventInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
