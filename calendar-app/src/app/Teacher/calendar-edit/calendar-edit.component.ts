import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Calendar } from '../../calendar.model';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CalendarService } from '../../Shared/calendar/calendar.service';


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

    constructor(private fb: FormBuilder, private authService: AuthService, private http: HttpClient, private route: ActivatedRoute, private elementRef: ElementRef, private calendarService: CalendarService) { }

  ngOnInit() {
    this.eventsForm = this.fb.group({
      'mondayEvents': this.fb.group({
        'classwork': this.fb.array([]),
        'homework': this.fb.array([])
      }),
      'tuesdayEvents': this.fb.group({
        'classwork': this.fb.array([]),
        'homework': this.fb.array([])
      }),
      'wednesdayEvents': this.fb.group({
        'classwork': this.fb.array([]),
        'homework': this.fb.array([])
      }),
      'thursdayEvents': this.fb.group({
        'classwork': this.fb.array([]),
        'homework': this.fb.array([])
      }),
      'fridayEvents': this.fb.group({
        'classwork': this.fb.array([]),
        'homework': this.fb.array([])
      })

    })
      this.month = this.calendarService.getMonth();
      this.year = this.calendarService.year;
      this.calendarService.selectedWeekRange.subscribe(resData => {
          this.selectedWeekRange = resData;
      });
  }

    onCreatePost(calendarData) {
        this.calendarTitle = this.route.snapshot.params['calendarTitle'];
        this.accessCode = this.route.snapshot.params['accessCode'];
        this.http.put<Calendar>('https://app-calendar-65dc1.firebaseio.com/calendarInformation/' + this.authService.user.value.id + '/calendars/' + this.accessCode + '/.json?auth=' + this.authService.user.value.token, calendarData
        ).subscribe();
    }

    ngAfterViewInit() {
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'aliceblue';
    }
}
