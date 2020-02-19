import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Calendar } from '../../calendar.model';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CalendarService } from '../../Shared/calendar/calendar.service';
import * as _ from 'lodash';
import { LocalStoargeService } from '../../Shared/local-stoarge.service';


@Component({
    selector: 'calendar-edit',
    templateUrl: './calendar-edit.component.html',
    styleUrls: ['./calendar-edit.component.css']
})
export class CalendarEditComponent implements OnInit {

    title = 'calendar-app';
    eventsForm: FormGroup;
    calendarTitle: string;
    accessCode: string;
    month: string;
    year;
    week;
    private selectedWeekRange;
    private randomKey: string;

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

    constructor(private fb: FormBuilder, private authService: AuthService, private http: HttpClient, private route: ActivatedRoute, private elementRef: ElementRef, private calendarService: CalendarService, private localStorage: LocalStoargeService) { }

    ngOnInit() {

        this.calendarTitle = this.route.snapshot.params['calendarTitle'];
        this.accessCode = this.route.snapshot.params['accessCode'];

        this.eventsForm = this.fb.group({
            'mondayEvents': this.fb.group({
                'classwork': this.fb.array([this.mondayCW]),
                'homework': this.fb.array([this.mondayHW])
            }),
            'tuesdayEvents': this.fb.group({
                'classwork': this.fb.array([this.tuesdayCW]),
                'homework': this.fb.array([this.tuesdayHW])
            }),
            'wednesdayEvents': this.fb.group({
                'classwork': this.fb.array([this.wednesdayCW]),
                'homework': this.fb.array([this.wednesdayHW])
            }),
            'thursdayEvents': this.fb.group({
                'classwork': this.fb.array([this.thursdayCW]),
                'homework': this.fb.array([this.thursdayHW])
            }),
            'fridayEvents': this.fb.group({
                'classwork': this.fb.array([this.fridayCW]),
                'homework': this.fb.array([this.fridayHW])
            })

        })

        this.calendarService.month.subscribe(() => {
            this.month = this.calendarService.getMonth();
        });
        this.calendarService.year.subscribe(resData => {
            this.year = resData;
        })
        this.calendarService.selectedWeekRange.subscribe(resData => {
            this.selectedWeekRange = resData;
        });

        this.localStorage.isLocalCopy(this.accessCode).subscribe(() => {
            if (!this.localStorage.mismatch) {
                console.log('saved data');
                this.fetchLocalData();
            } else {
                this.fetchDatabaseData();
                console.log('fetch from database');
            }
        })
    }
    fetchLocalData() {
        var calendarData = JSON.parse(this.localStorage.fetchLocalData(this.accessCode + 'holder'));
        console.log(calendarData);
        if (calendarData.mondayEvents) {
            console.log('here');
            calendarData.mondayEvents.homework !== undefined && (this.mondayHW = _.values(calendarData.mondayEvents.homework));
            calendarData.mondayEvents.classwork !== undefined && (this.mondayCW = _.values(calendarData.mondayEvents.classwork));
        }

        if (calendarData.tuesdayEvents) {
            calendarData.tuesdayEvents.homework !== undefined && (this.tuesdayHW = _.values(calendarData.tuesdayEvents.homework));
            calendarData.tuesdayEvents.classwork !== undefined && (this.tuesdayCW = _.values(calendarData.tuesdayEvents.classwork));
        }

        if (calendarData.wednesdayEvents) {
            calendarData.wednesdayEvents.homework !== undefined && (this.wednesdayHW = _.values(calendarData.wednesdayEvents.homework));
            calendarData.wednesdayEvents.classwork !== undefined && (this.wednesdayCW = _.values(calendarData.wednesdayEvents.classwork));
        }

        if (calendarData.thursdayEvents) {
            calendarData.thursdayEvents.homework !== undefined && (this.thursdayHW = _.values(calendarData.thursdayEvents.homework));
            calendarData.thursdayEvents.classwork !== undefined && (this.thursdayCW = _.values(calendarData.thursdayEvents.classwork));
        }

        if (calendarData.fridayEvents) {
            calendarData.fridayEvents.homework !== undefined && (this.fridayHW = _.values(calendarData.fridayEvents.homework));
            calendarData.fridayEvents.classwork !== undefined && (this.fridayCW = _.values(calendarData.fridayEvents.classwork));
        }

        this.updateForm();
    }


    onCreatePost(calendarData) {
        console.log("hello");
        this.randomKey = this.localStorage.generateKey();
        this.http.put<Calendar>('https://app-calendar-65dc1.firebaseio.com/calendarInformation/' + this.authService.user.value.id + '/calendars/' + this.accessCode + '/.json?auth=' + this.authService.user.value.token, calendarData
        ).subscribe(() => {
            this.http.patch('https://app-calendar-65dc1.firebaseio.com/calendarInformation/' + this.authService.user.value.id + '/accessCode/' + this.accessCode + '/.json?auth=' + this.authService.user.value.token, { "key": this.randomKey }
                ).subscribe(() => {
                    this.localStorage.saveData(calendarData, this.accessCode, this.randomKey);
                })
        });
    }

    ngAfterViewInit() {
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'aliceblue';
    }

    fetchDatabaseData() {
        this.http.get<courseData>('https://app-calendar-65dc1.firebaseio.com/calendarInformation/' + this.authService.user.value.id + '/calendars/' + this.accessCode + '/.json?auth=' + this.authService.user.value.token)
            .subscribe(resData => {
                if (!resData) {
                    console.log(this.accessCode);
                    return;
                }
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
                console.log('here');
                this.localStorage.saveData(resData, this.accessCode, this.localStorage.databaseSessionKey);
                this.updateForm();
            })
    }

    updateForm() {
        this.eventsForm.get('mondayEvents.classwork').setValue(this.mondayCW);
        this.eventsForm.get('mondayEvents.homework').setValue(this.mondayHW);
        this.eventsForm.get('tuesdayEvents.classwork').setValue(this.tuesdayCW);
        this.eventsForm.get('tuesdayEvents.homework').setValue(this.tuesdayHW);
        this.eventsForm.get('wednesdayEvents.classwork').setValue(this.wednesdayCW);
        this.eventsForm.get('wednesdayEvents.homework').setValue(this.wednesdayHW);
        this.eventsForm.get('thursdayEvents.classwork').setValue(this.thursdayCW);
        this.eventsForm.get('thursdayEvents.homework').setValue(this.thursdayHW);
        this.eventsForm.get('fridayEvents.classwork').setValue(this.fridayCW);
        this.eventsForm.get('fridayEvents.homework').setValue(this.fridayHW);
    }
}

    interface courseData {
    mondayEvents: { homework: Array<any>, classwork: Array<any> }
    tuesdayEvents: { homework: Array<any>, classwork: Array<any> }
    wednesdayEvents: { homework: Array<any>, classwork: Array<any> }
    thursdayEvents: { homework: Array<any>, classwork: Array<any> }
    fridayEvents: { homework: Array<any>, classwork: Array<any> }
    }

