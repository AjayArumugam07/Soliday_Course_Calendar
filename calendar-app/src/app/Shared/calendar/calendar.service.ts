import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CalendarService {

    private currentTarget;
    private dayCount: number;
    public month;
    public year;
    public date;
    public lastDate;
    public firstDay;
    public previousMonthLastDate;
    public dateArray: number[][] = [];
    public monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    constructor() {
        this.month = (new Date).getMonth();
        this.year = (new Date).getFullYear();
        this.updateDateArray();
    }

    highlightWeek(event) {
        if (this.currentTarget) {
            this.currentTarget.style.backgroundColor = 'white';
        }
        this.currentTarget = event.currentTarget
        this.currentTarget.style.backgroundColor = 'floralwhite';
    }

    public getMonth(): string {
        return this.monthArray[this.month];
    }

    nextMonth() {
        if (this.month < 11) {
            this.month++;
        } else {
            this.month = 0;
            this.year++;
        }
        this.updateDateArray();
        return this.dateArray;
    }

    previousMonth() {
        if (this.month > 0) {
            this.month--;
        } else {
            this.month = 11;
            this.year--;
        }
        return this.updateDateArray();
    }

    updateDateArray() {
        this.firstDay = new Date(this.year, this.month, 1).getDay();
        this.lastDate = new Date(this.year, this.month + 1, 0).getDate();
        this.previousMonthLastDate = new Date(this.year, this.month, 0).getDate();
        this.dayCount = -1 * this.firstDay + 1;
        for (var i: number = 0; i < 5; i++) {
            this.dateArray[i] = [];
            for (var x: number = 0; x < 7; x++) {
                if (this.dayCount == this.lastDate) {
                    this.dateArray[i][x] = this.dayCount;
                    this.dayCount = 1;
                } else if (this.dayCount < 1) {
                    this.dateArray[i][x] = this.previousMonthLastDate - this.firstDay + 1 + x;
                    this.dayCount++;
                }
                else {
                    this.dateArray[i][x] = this.dayCount;
                    this.dayCount++;
                }
            }
            this.dateArray[i].shift();
            this.dateArray[i].pop();
        }
        return this.dateArray;
    }
}
