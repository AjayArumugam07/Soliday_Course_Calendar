import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Calendar } from '../calendar.model';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'calendar-edit',
  templateUrl: './calendar-edit.component.html',
  styleUrls: ['./calendar-edit.component.css']
})
export class CalendarEditComponent implements OnInit {

  title = 'calendar-app';
    eventsForm: FormGroup;
    calendarTitle: string;

    constructor(private fb: FormBuilder, private authService: AuthService, private http: HttpClient, private route: ActivatedRoute) { }

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

    //  this.eventsForm.valueChanges.subscribe(newVal => console.log(newVal))
  }

  onSubmit() {

  }


    onCreatePost(calendarData) {

        this.calendarTitle = this.route.snapshot.params['calendarTitle'];
        console.log(this.calendarTitle);
        console.log(calendarData);
        this.http.put<Calendar>('https://app-calendar-65dc1.firebaseio.com/userInformation/' + this.authService.currentUser.id + '/calendarInformation/' + this.calendarTitle + '/.json?auth=' + this.authService.currentUser.token, calendarData
        ).subscribe(responseData => { console.log(responseData); });
  }
}
