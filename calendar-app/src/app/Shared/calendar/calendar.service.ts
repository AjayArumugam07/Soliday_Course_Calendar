import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CalendarService {

    private currentTarget;
    selectedWeek = new BehaviorSubject([false, false, false, false, false]);
    selectedWeekRange = new BehaviorSubject(null);
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
        let currentDate = new Date;
        if (currentDate.getDay() == 0 || 6) {
            currentDate.setDate(currentDate.getDate() + 3);
        }
        let currentWeekID;
        if (currentDate.getDate() < 15) {
            for (var i: number = 0; i < 4; i++) {
                for (var x: number = 0; x < 7; x++) {
                    if (this.dateArray[i][x] == currentDate.getDate()) {
                        currentWeekID = i;
                    }
                }
            }
        } else {
            for (var i: number = 3; i < 5; i++) {
                for (var x: number = 0; x < 7; x++) {
                    if (this.dateArray[i][x] == currentDate.getDate()) {
                        currentWeekID = i;
                    }
                }
            }
        }
        let tempWeek = [false, false, false, false, false];
        tempWeek[currentWeekID] = true;
        this.selectedWeek.next(tempWeek);

        this.highlightWeek(null, this.dateArray[currentWeekID]);
    }

    highlightWeek(event, weekArray) {
        console.log(weekArray);
        let currentDate = new Date(this.year, this.month, weekArray[0]);
        var endDate = new Date(this.year, this.month, weekArray[0]);
        if (weekArray == this.dateArray[0] && weekArray[0] > 15) {
            currentDate = new Date(this.year, this.month - 1, weekArray[0]);
            endDate = new Date(this.year, this.month - 1, weekArray[0]);
        }
        console.log(endDate);
        endDate.setDate(currentDate.getDate() + 4);

        this.selectedWeekRange.next((currentDate.getMonth() + 1) + '/' + weekArray[0] + '  -  ' + (endDate.getMonth() + 1) + '/' + weekArray[4]);

        if (event) {
            let tempWeek = [false, false, false, false, false];
            tempWeek[event.currentTarget.id] = true;
            this.selectedWeek.next(tempWeek);
        }
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

    getWeek() {

    }
}
