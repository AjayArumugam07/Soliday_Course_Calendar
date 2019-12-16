import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'student-events-for-day',
  templateUrl: './student-events-for-day.component.html',
  styleUrls: ['./student-events-for-day.component.css']
})
export class StudentEventsForDayComponent implements OnInit {

    @Input() events;
    @Input() typeOfEvent;

  constructor() { }

    ngOnInit() {
        console.log(this.events);
  }

}
