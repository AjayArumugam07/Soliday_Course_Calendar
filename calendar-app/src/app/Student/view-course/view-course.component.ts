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
    isLoading = false;
    events = [];

    mondayHW = ['No Events for this Day'];
    mondayCW = ['No Events for this Day'];
    tuesdayHW = ['No Events for this Day'];
    tuesdayCW = ['No Events for this Day'];
    wednesdayHW = ['No Events for this Day'];
    wednesdayCW = ['No Events for this Day'];
    thursdayHW = ['No Events for this Day'];
    thursdayCW = ['No Events for this Day'];
    fridayHW = ['No Events for this Day'];
    fridayCW = ['No Events for this Day'];

    constructor(private http: HttpClient, private route: ActivatedRoute, private authService: AuthService) { }

    ngOnInit() {
        this.isLoading = true;
        this.fetchCalendarData();
    }

    fetchCalendarData() {
        this.calendarTitle = this.route.snapshot.params['calendarTitle'];
        console.log(this.route.snapshot);
        this.accessCode = this.route.snapshot.params['accessCode'];
        this.teacherID = this.route.snapshot.params['teacherID'];
        this.http.get<courseData>('https://app-calendar-65dc1.firebaseio.com/calendarInformation/' + this.teacherID + '/calendars/' + this.accessCode + '/.json?auth=' + this.authService.currentUser.token)
            .subscribe(resData => {
                if (resData.mondayEvents) {
                    resData.mondayEvents.homework !== undefined && (this.mondayHW = _.values(resData.mondayEvents.homework));
                    resData.mondayEvents.classwork !== undefined && (this.mondayCW = _.values(resData.mondayEvents.classwork));
                }

                if (resData.tuesdayEvents) {
                    resData.tuesdayEvents.homework !== undefined && (this.tuesdayHW = _.values(resData.tuesdayEvents.homework));
                    resData.tuesdayEvents.classwork !== undefined && (this.tuesdayCW = _.values(resData.tuesdayEvents.classwork));
                }

                if (resData.wednesdayEvents) {
                    resData.wednesdayEvents.homework !== undefined && (this.wednesdayHW = _.values(resData.wednesdayEvents.homework));
                    resData.wednesdayEvents.classwork !== undefined && (this.wednesdayCW = _.values(resData.wednesdayEvents.classwork));
                }

                if (resData.thursdayEvents) {
                    resData.thursdayEvents.homework !== undefined && (this.thursdayHW = _.values(resData.thursdayEvents.homework));
                    resData.thursdayEvents.classwork !== undefined && (this.thursdayCW = _.values(resData.thursdayEvents.classwork));
                }

                if (resData.fridayEvents) {
                    resData.fridayEvents.homework !== undefined && (this.fridayHW = _.values(resData.fridayEvents.homework));
                    resData.fridayEvents.classwork !== undefined && (this.fridayCW = _.values(resData.fridayEvents.classwork));
                }

                this.isLoading = false;
            })
    }
}

interface courseData {
    mondayEvents: { homework: Array<any>, classwork: Array<any> }
    tuesdayEvents: { homework: Array<any>, classwork: Array<any> }
    wednesdayEvents: { homework: Array<any>, classwork: Array<any> }
    thursdayEvents: { homework: Array<any>, classwork: Array<any> }
    fridayEvents: { homework: Array<any>, classwork: Array<any> }
}

