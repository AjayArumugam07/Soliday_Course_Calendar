import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { map, catchError } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { throwError } from 'rxjs';
import { CreateCalendarComponent } from './create-calendar/create-calendar.component';

@Component({
  selector: 'dashboard-body',
  templateUrl: './dashboard-body.component.html',
  styleUrls: ['./dashboard-body.component.css']
})
export class DashboardBodyComponent implements OnInit {

    calendars = [];

    ngOnInit() {
        this.getCalendar();
    }
    constructor(private elementRef: ElementRef, private http: HttpClient, private authService: AuthService, private dialog: MatDialog) {

  }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#E8F1F2';
    }

    pushCalendar(title: string, lastName: string) {
        this.http.put('https://app-calendar-65dc1.firebaseio.com/userInformation/' + this.authService.currentUser.id + '/calendars/' + title + '/.json?auth=' + this.authService.currentUser.token,
            {
                title: title,
                owner: lastName
            }
        ).subscribe(responseData => {
            this.getCalendar();
        });
    }

    onAddNewCourse() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        const dialogRef = this.dialog.open(CreateCalendarComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(resData => {
            this.pushCalendar(resData.title, resData.lastName);
        })
    }

    getCalendar() {
        console.log('Hello');
        console.log(this.authService.currentUser.id);
        return this.http.get<calendarFormat[]>('https://app-calendar-65dc1.firebaseio.com/userInformation/' + this.authService.currentUser.id + '/calendars/.json?auth=' + this.authService.currentUser.token)
            .pipe(map(resData => {
                const calendarArray = [];
                for (const key in resData) {
                    calendarArray.push({ ...resData[key] });
                }
                console.log(calendarArray);
                return calendarArray;
            }))
            .subscribe(calendarArray => {
                this.calendars = calendarArray;
            })
       

        
    };
}

interface calendarFormat {
    title: string,
    lastName: string
}
