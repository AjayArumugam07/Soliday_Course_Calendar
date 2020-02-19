import { Component, OnInit } from '@angular/core';
import { CalendarService } from './calendar.service';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

    private year;
    private month;
    private week;
    private calendarArray;

    constructor(private calendarService: CalendarService) { }

    ngOnInit() {
        this.year = this.calendarService.year.value;
        this.month = this.calendarService.getMonth();
        this.calendarArray = this.calendarService.dateArray;
    }

    onNextMonth() {
        this.calendarService.nextMonth();
        this.month = this.calendarService.getMonth();
        this.year = this.calendarService.year.value;
    }

    onPreviousMonth() {
        this.calendarService.previousMonth();
        this.month = this.calendarService.getMonth();
        this.year = this.calendarService.year.value;
    }
}
