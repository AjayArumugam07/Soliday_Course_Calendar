import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { CalendarService } from '../calendar.service';

@Component({
    selector: 'week',
    templateUrl: './week.component.html',
    styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit {

    @Input() weekID: number;
    @Input() isSelected: boolean;
    @Input() weekArray;

    constructor(private elementRef: ElementRef, private calendarService: CalendarService) { }

    ngOnInit() {
        this.calendarService.selectedWeek.subscribe(resData => {
            this.isSelected = resData[this.weekID];
            
        })
    }

    onWeekClick(event) {
        this.calendarService.highlightWeek(event, this.weekArray);
    }

}
