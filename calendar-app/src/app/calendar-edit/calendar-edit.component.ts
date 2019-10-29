import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Calendar } from '../calendar.model';


@Component({
  selector: 'calendar-edit',
  templateUrl: './calendar-edit.component.html',
  styleUrls: ['./calendar-edit.component.css']
})
export class CalendarEditComponent implements OnInit {

  title = 'calendar-app';
  eventsForm: FormGroup;

  constructor(private fb: FormBuilder,
    private http: HttpClient) { }

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
    this.http.post<Calendar>('https://app-calendar-65dc1.firebaseio.com/posts.json', calendarData
    ).subscribe(responseData => { });
  }
}
