import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'dashboard-body',
  templateUrl: './dashboard-body.component.html',
  styleUrls: ['./dashboard-body.component.css']
})
export class DashboardBodyComponent implements OnInit {



    calendars: any = [];

    ngOnInit() {
        this.getCalendar();
    }
    constructor(private elementRef: ElementRef, private http: HttpClient, private authService: AuthService) {

  }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#E8F1F2';
    }

    onAddNewCourse(title: string = 'AP Chemistry', lastName: string = 'Schulte') {
        this.http.put('https://app-calendar-65dc1.firebaseio.com/userInformation/' + this.authService.currentUser.id + '/calendars/' + title + '/.json?auth=' + this.authService.currentUser.token,
            {
                name: title,
                owner: lastName
            }
        ).subscribe(responseData => {
            this.calendars = this.getCalendar();
        });
    }

    getCalendar() {
        return this.http.get<calendarFormat[]>('https://app-calendar-65dc1.firebaseio.com/userInformation/' + this.authService.currentUser.id + '/calendars/.json?auth=' + this.authService.currentUser.token).pipe(map((data: any) => data.result),
            catchError(error => { return throwError('Its a Trap!') })
        );
    };
}

interface calendarFormat {
    title: string,
    lastName: string
}
