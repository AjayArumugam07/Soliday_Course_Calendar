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
    month = new BehaviorSubject<number>(null);
    year = new BehaviorSubject <number>(null);
    public date;
    public lastDate;
    public firstDay;
    public previousMonthLastDate;
    public dateArray: number[][] = [];
    public monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    constructor() {
        let currentDate = new Date;
        if (currentDate.getDay() == 0) {
            currentDate.setDate(currentDate.getDate() + 1);
        }
        if (currentDate.getDay() == 6) {
            currentDate.setDate(currentDate.getDate() + 2);
        }
        this.month.next(currentDate.getMonth());
        this.year.next(currentDate.getFullYear());
        this.updateDateArray();

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
        console.log(currentWeekID);
        this.highlightWeek(null, this.dateArray[currentWeekID]);
    }

    highlightWeek(event, weekArray) {
        let currentDate = new Date(this.year.value, this.month.value, weekArray[0]);
        var endDate = new Date(this.year.value, this.month.value, weekArray[0]);
        if (weekArray == this.dateArray[0] && weekArray[0] > 15) {
            currentDate = new Date(this.year.value, this.month.value - 1, weekArray[0]);
            endDate = new Date(this.year.value, this.month.value - 1, weekArray[0]);
        }
        endDate.setDate(currentDate.getDate() + 4);
        this.selectedWeekRange.next((currentDate.getMonth() + 1) + '/' + weekArray[0] + '  -  ' + (endDate.getMonth() + 1) + '/' + weekArray[4]);
        if (event) {
            let tempWeek = [false, false, false, false, false];
            tempWeek[event.currentTarget.id] = true;
            this.selectedWeek.next(tempWeek);
        }
    }

    public getMonth(): string {
        console.log(this.month.value);
        return this.monthArray[this.month.value];
    }

    nextMonth() {
        if (this.month.value < 11) {
            this.month.next(this.month.value + 1);
        } else {
            this.month.next(0);
            this.year.next(this.year.value + 1);
        }
        this.updateDateArray();
        return this.dateArray;
    }

    previousMonth() {
        if (this.month.value > 0) {
            this.month.next(this.month.value - 1);
        } else {
            this.month.next(11);
            this.year.next(this.year.value - 1);
        }
        return this.updateDateArray();
    }

    updateDateArray() {
        this.firstDay = new Date(this.year.value, this.month.value, 1).getDay();
        this.lastDate = new Date(this.year.value, this.month.value + 1, 0).getDate();
        this.previousMonthLastDate = new Date(this.year.value, this.month.value, 0).getDate();
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
