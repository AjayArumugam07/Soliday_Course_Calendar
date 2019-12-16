import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css']
})
export class ViewCourseComponent implements OnInit {
    calendarTitle: string;
    accessCode: string;
    teacherID: string;
    events = [];

    mondayHW = [];
    mondayCW = [];
    tuesdayHW = [];
    tuesdayCW = [];
    wednesdayHW = [];
    wednesdayCW = [];
    thursdayHW = [];
    thursdayCW = [];
    fridayHW = [];
    fridayCW = [];

    constructor(private http: HttpClient, private route: ActivatedRoute, private authService: AuthService) { }

    ngOnInit() {
        this.fetchCalendarData();
    }

    fetchCalendarData() {
        this.calendarTitle = this.route.snapshot.params['calendarTitle'];
        this.accessCode = this.route.snapshot.params['accessCode'];
        this.teacherID = this.route.snapshot.params['teacherID'];
        this.http.get<courseData>('https://app-calendar-65dc1.firebaseio.com/calendarInformation/' + this.teacherID + '/calendars/' + this.accessCode + '/.json?auth=' + this.authService.currentUser.token)
            .subscribe(resData => {
                if (resData.mondayEvents) {
                    this.mondayHW = _.values(resData.mondayEvents.homework)
                    this.mondayCW = _.values(resData.mondayEvents.classwork)
                } 

                if (resData.tuesdayEvents) {
                    this.tuesdayHW = _.values(resData.tuesdayEvents.homework)
                    this.tuesdayCW = _.values(resData.tuesdayEvents.classwork)
                } 

                if (resData.wednesdayEvents) {
                    this.wednesdayHW = _.values(resData.wednesdayEvents.homework)
                    this.wednesdayCW = _.values(resData.wednesdayEvents.classwork)
                } 

                if (resData.thursdayEvents) {
                    this.thursdayHW = _.values(resData.thursdayEvents.homework)
                    this.thursdayCW = _.values(resData.thursdayEvents.classwork)
                } 

                if (resData.fridayEvents) {
                    this.fridayHW = _.values(resData.fridayEvents.homework)
                    this.fridayCW = _.values(resData.fridayEvents.classwork)
                } 
          
            })
    }
    sortData(resData) {
        
    }

}

interface courseData {
    mondayEvents: { homework: Array<any>, classwork: Array<any> }
    tuesdayEvents: { homework: Array<any>, classwork: Array<any> }
    wednesdayEvents: { homework: Array<any>, classwork: Array<any> }
    thursdayEvents: { homework: Array<any>, classwork: Array<any> }
    fridayEvents: { homework: Array<any>, classwork: Array<any> }
}

