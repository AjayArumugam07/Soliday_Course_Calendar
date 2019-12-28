import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { CalendarService } from '../calendar.service';

@Component({
    selector: 'week',
    templateUrl: './week.component.html',
    styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit {

    @Input() weekID: number;
    @Input() weekArray;

    constructor(private elementRef: ElementRef, private calendarService: CalendarService) { }

    ngOnInit() {
    }

    onWeekClick(event) {
        this.calendarService.highlightWeek(event);
    }

}
