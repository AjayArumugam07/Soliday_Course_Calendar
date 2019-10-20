import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'events-for-day',
  templateUrl: './events-for-day.component.html',
  styleUrls: ['./events-for-day.component.css']
})
export class EventsForDayComponent implements OnInit {

  day: string;
  @Input() eventsInDay: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    
  }

  addTextArea() {
    (<FormArray>this.eventsInDay.get('mondayEvents.classwork')).push(new FormControl(null));
  }

}
