import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css']
})
export class ViewCourseComponent implements OnInit {
    calendarTitle: string;
    accessCode: string;
    teacherID: string;

    constructor(private http: HttpClient, private route: ActivatedRoute, private authService: AuthService) { }

    ngOnInit() {
        this.fetchCalendarData();
    }

    fetchCalendarData() {
        this.calendarTitle = this.route.snapshot.params['calendarTitle'];
        this.accessCode = this.route.snapshot.params['accessCode'];
        this.teacherID = this.route.snapshot.params['teacherID'];
        this.http.get('https://app-calendar-65dc1.firebaseio.com/calendarInformation/' + this.teacherID + '/calendars/' + this.accessCode + '/.json?auth=' + this.authService.currentUser.token)
            .pipe(map(resData => {
                const calendarData = [];
                for (const key in resData) {
                    calendarData.push({ ...resData[key], key });
                }
                return calendarData;
            }))
            .subscribe(resData => {
                console.log(resData);
            })
    }

}
